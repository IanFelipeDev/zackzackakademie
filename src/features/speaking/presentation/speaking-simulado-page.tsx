import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router';
import { useContainer } from '@/app/context/container-context';
import { useSignedInUser } from '@/features/auth';
import {
  Alert,
  Badge,
  Button,
  Card,
  EmptyState,
  Icon,
  PageHeader,
  Spinner,
  type RecordedAudio,
} from '@/shared/ui';
import { EXAM_TASK_TYPES, isSpeakingExam, type SpeakingExam } from '../domain/exam';
import {
  planDuration,
  stagePlanFor,
  TELC_MINIMUM_REPORT_SECONDS,
  TELC_PREPARATION_PLAN,
} from '../domain/speaking-timer';
import type { SpeakingTopic } from '../domain/speaking-topic';
import type { SpeakingTaskType } from '../domain/task-type';
import { SpeakingChecklist, SpeakingShareTracker } from './components/speaking-practice-tools';
import { SpeakingTimerDialog, type TimerState } from './components/speaking-timer-dialog';
import {
  durationLabel,
  EXAM_LABELS,
  partLabel,
  speakingCatalogPath,
  SPEAKING_TASK_LABELS,
} from './speaking-labels';
import { speakingErrorMessage } from './speaking-error-message';
import { speakingQueryKeys } from './speaking-query-keys';

/** telc Teil 1: the structure the student ticks off while reporting. */
const REPORT_STRUCTURE = ['Einleitung', 'Hauptinhalt', 'Persönliches Beispiel', 'Fazit & Fragen'];

interface SimuladoTeil {
  readonly taskType: SpeakingTaskType;
  readonly topic: SpeakingTopic;
}

function examFromParams(params: URLSearchParams): SpeakingExam {
  const value = params.get('prova') ?? '';
  return isSpeakingExam(value) ? value : 'goethe';
}

/** Draws one random item; kept at module scope so the random call stays out of the component body. */
function pickRandom<T>(items: readonly T[]): T | undefined {
  return items[Math.floor(Math.random() * items.length)];
}

export function SpeakingSimuladoPage() {
  const { speaking } = useContainer();
  const user = useSignedInUser();
  const [searchParams] = useSearchParams();
  const exam = examFromParams(searchParams);
  // Bumped to draw a fresh set of random topics ("novo simulado").
  const [seed, setSeed] = useState(0);

  const simulado = useQuery({
    queryKey: ['speaking', 'simulado', exam, user.id, seed],
    queryFn: async (): Promise<SimuladoTeil[]> => {
      const teile: SimuladoTeil[] = [];
      for (const taskType of EXAM_TASK_TYPES[exam]) {
        const topics = await speaking.listTopics.execute(exam, taskType, user.id);
        const chosen = pickRandom(topics);
        if (!chosen) return [];
        teile.push({ taskType, topic: chosen.topic });
      }
      return teile;
    },
  });

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to={speakingCatalogPath({ exam, taskType: EXAM_TASK_TYPES[exam][0] ?? 'presentation' })}
        className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
      >
        <Icon name="arrow_back" className="text-[18px]" />
        Voltar para os temas
      </Link>
      <PageHeader
        eyebrow={`${EXAM_LABELS[exam].name} · Simulado`}
        title="Simulado de Expressão Oral"
        description="Uma prova completa, com temas sorteados, cronômetro por etapa e sem pausa — como no dia da prova."
      />
      {simulado.isPending ? <Spinner label="Sorteando os temas…" /> : null}
      {simulado.isError ? <Alert tone="error">{speakingErrorMessage(simulado.error)}</Alert> : null}
      {simulado.isSuccess && simulado.data.length === 0 ? (
        <EmptyState icon="record_voice_over" title="Simulado indisponível">
          Ainda não há temas publicados para todas as partes desta prova no seu nível.
        </EmptyState>
      ) : null}
      {simulado.isSuccess && simulado.data.length > 0 ? (
        <SimuladoRun exam={exam} teile={simulado.data} onNewDraw={() => setSeed((s) => s + 1)} />
      ) : null}
    </div>
  );
}

/** 'intro' before the start, 'prep' for the telc preparation, a Teil index while running, 'done' at the end. */
type Step = 'intro' | 'prep' | number | 'done';

function SimuladoRun({
  exam,
  teile,
  onNewDraw,
}: {
  exam: SpeakingExam;
  teile: readonly SimuladoTeil[];
  onNewDraw: () => void;
}) {
  const { speaking } = useContainer();
  const user = useSignedInUser();
  const queryClient = useQueryClient();
  const [step, setStep] = useState<Step>('intro');
  const isTelc = exam === 'telc';

  const record = useMutation({
    mutationFn: ({
      topicId,
      durationSeconds,
      audio,
    }: {
      topicId: string;
      durationSeconds: number;
      audio: RecordedAudio | null;
    }) =>
      speaking.recordPractice.execute({
        topicId,
        studentId: user.id,
        durationSeconds,
        recording: audio ? { data: audio.blob, mimeType: audio.mimeType } : null,
      }),
    onSuccess: async (_result, variables) => {
      await queryClient.invalidateQueries({ queryKey: speakingQueryKeys.all });
      const finishedIndex = teile.findIndex((teil) => teil.topic.id === variables.topicId);
      setStep(finishedIndex + 1 < teile.length ? finishedIndex + 1 : 'done');
    },
  });

  const start = () => setStep(isTelc ? 'prep' : 0);

  if (step === 'intro') {
    return <SimuladoIntro exam={exam} teile={teile} onStart={start} />;
  }
  if (step === 'done') {
    return <SimuladoDone exam={exam} teile={teile} onNewDraw={onNewDraw} />;
  }

  if (step === 'prep') {
    return (
      <>
        <SimuladoProgress teile={teile} current={-1} />
        <SpeakingTimerDialog
          eyebrow={`${EXAM_LABELS[exam].name} · Preparação`}
          topicTitle="Preparação para a prova"
          plan={TELC_PREPARATION_PLAN}
          finishLabel="Começar o Teil 1"
          canSkip
          onFinish={() => setStep(0)}
          onClose={() => setStep('intro')}
        />
      </>
    );
  }

  const teil = teile[step];
  if (!teil) return null;
  const plan = stagePlanFor(exam, teil.taskType);
  const isLast = step + 1 === teile.length;

  return (
    <>
      <SimuladoProgress teile={teile} current={step} />
      <SpeakingTimerDialog
        key={teil.topic.id}
        eyebrow={partLabel(exam, teil.taskType)}
        topicTitle={teil.topic.title}
        plan={plan}
        minimumSeconds={isTelc && teil.taskType === 'experience' ? TELC_MINIMUM_REPORT_SECONDS : undefined}
        tools={simuladoTools(teil)}
        disablePause
        allowRecording
        finishLabel={isLast ? 'Concluir o simulado' : 'Próxima Teil'}
        isSaving={record.isPending}
        errorMessage={record.isError ? speakingErrorMessage(record.error) : null}
        onFinish={(durationSeconds, audio) =>
          record.mutate({ topicId: teil.topic.id, durationSeconds, audio })
        }
        onClose={() => setStep('intro')}
      />
    </>
  );
}

/** The practice aids shown in the timer for a telc Teil (mirrors the single-topic page). */
function simuladoTools(teil: SimuladoTeil): ((state: TimerState) => ReactNode) | undefined {
  switch (teil.taskType) {
    case 'experience':
      return () => <SpeakingChecklist title="Estrutura do relato" items={REPORT_STRUCTURE} lang="de" />;
    case 'discussion':
      return (state) => <SpeakingShareTracker {...state} />;
    case 'planning':
      return () => <SpeakingChecklist title="Decidam juntos" items={teil.topic.guidingPoints} lang="de" />;
    default:
      return undefined;
  }
}

function SimuladoIntro({
  exam,
  teile,
  onStart,
}: {
  exam: SpeakingExam;
  teile: readonly SimuladoTeil[];
  onStart: () => void;
}) {
  const total = teile.reduce((sum, teil) => sum + planDuration(stagePlanFor(exam, teil.taskType)), 0);
  return (
    <Card className="flex flex-col gap-4">
      <h2 className="text-xl text-primary">Como funciona</h2>
      <p className="text-sm text-ink-soft">
        {exam === 'telc'
          ? 'Você terá 20 minutos de preparação e depois as três partes em sequência, cada uma com tema sorteado e cronômetro próprio. Não é possível pausar.'
          : 'As duas partes acontecem em sequência, cada uma com tema sorteado e cronômetro próprio. Não é possível pausar.'}{' '}
        No fim, cada Teil entra na fila da Melissa para avaliação.
      </p>
      <ol className="flex flex-col gap-2">
        {teile.map((teil, index) => (
          <li
            key={teil.topic.id}
            className="flex items-center gap-3 rounded-lg border border-hairline bg-surface-low p-3"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-container/15 font-mono font-bold text-primary">
              {index + 1}
            </span>
            <span className="min-w-0">
              <span className="block text-xs text-ink-soft">
                {SPEAKING_TASK_LABELS[teil.taskType].part} ·{' '}
                {durationLabel(planDuration(stagePlanFor(exam, teil.taskType)))}
              </span>
              <span lang="de" className="block truncate font-serif text-primary">
                {teil.topic.title}
              </span>
            </span>
          </li>
        ))}
      </ol>
      <p className="text-sm text-ink-soft">
        Tempo de fala previsto: <span className="font-semibold">{durationLabel(total)}</span>.
      </p>
      <Button size="lg" icon="play_arrow" onClick={onStart}>
        Começar simulado
      </Button>
    </Card>
  );
}

function SimuladoProgress({ teile, current }: { teile: readonly SimuladoTeil[]; current: number }) {
  return (
    <ol className="mb-4 flex flex-wrap gap-2" aria-label="Progresso do simulado">
      {teile.map((teil, index) => (
        <li key={teil.topic.id}>
          <Badge tone={index < current ? 'success' : index === current ? 'primary' : 'neutral'}>
            {SPEAKING_TASK_LABELS[teil.taskType].part}
          </Badge>
        </li>
      ))}
    </ol>
  );
}

function SimuladoDone({
  exam,
  teile,
  onNewDraw,
}: {
  exam: SpeakingExam;
  teile: readonly SimuladoTeil[];
  onNewDraw: () => void;
}) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-success">
        <Icon name="check_circle" />
        <h2 className="text-xl text-primary">Simulado concluído!</h2>
      </div>
      <p className="text-sm text-ink-soft">
        As {teile.length} partes entraram na fila de avaliação. A Melissa dá a nota de cada Teil; a nota do
        exame (0–75, aprovado ≥ 45) é a soma das três.
      </p>
      <ul className="flex flex-col gap-2">
        {teile.map((teil) => (
          <li key={teil.topic.id} className="flex items-center gap-2 text-sm">
            <Icon name="record_voice_over" className="text-[18px] text-ink-soft" />
            <span className="text-ink-soft">{partLabel(exam, teil.taskType)}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        <Button icon="replay" onClick={onNewDraw}>
          Novo simulado
        </Button>
        <Link
          to="/painel"
          className="press inline-flex items-center gap-1 rounded-full bg-surface-high px-5 py-2.5 text-sm font-semibold text-primary hover:bg-surface-highest"
        >
          Ir para o painel
        </Link>
      </div>
    </Card>
  );
}
