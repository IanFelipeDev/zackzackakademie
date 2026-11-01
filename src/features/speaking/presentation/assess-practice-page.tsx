import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm, useWatch, type UseFormRegister } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router';
import { z } from 'zod';
import { useContainer } from '@/app/context/container-context';
import { useSignedInUser } from '@/features/auth';
import { Alert, Badge, Button, Card, formatClock, formatDateTime, Icon, Spinner } from '@/shared/ui';
import type { PracticeAssessment, PracticeForAssessment } from '../application/read-models';
import type { SpeakingExam } from '../domain/exam';
import {
  MAX_ASSESSMENT_COMMENT_LENGTH,
  MAX_SPEAKING_SCORE,
  MIN_SPEAKING_SCORE,
  RUBRIC_BANDS,
  RUBRIC_CRITERIA,
  RUBRIC_MAX_PER_TEIL,
  rubricSubtotal,
  TELC_EXAM_MAX_SCORE,
  TELC_EXAM_PASS_SCORE,
  type AssessmentContent,
  type RubricCriterion,
  type TelcRubric,
} from '../domain/speaking-assessment';
import { RecordingPlayer } from './components/recording-player';
import { TaskCard } from './components/task-card';
import { partLabel } from './speaking-labels';
import { speakingErrorMessage } from './speaking-error-message';
import { speakingQueryKeys } from './speaking-query-keys';
import { formatAssessmentScore, rubricBandOptions, RUBRIC_CRITERION_LABELS } from './speaking-rubric';

export function AssessPracticePage() {
  const { speaking } = useContainer();
  const { practiceId = '' } = useParams();
  const practice = useQuery({
    queryKey: speakingQueryKeys.practice(practiceId),
    queryFn: () => speaking.getPracticeForAssessment.execute(practiceId),
  });
  const isAssessed = Boolean(practice.data?.assessment);

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to={isAssessed ? '/avaliacoes-orais?aba=avaliadas' : '/avaliacoes-orais'}
        className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
      >
        <Icon name="arrow_back" className="text-[18px]" />
        Voltar para as avaliações orais
      </Link>
      {practice.isPending ? <Spinner /> : null}
      {practice.isError ? <Alert tone="error">{speakingErrorMessage(practice.error)}</Alert> : null}
      {practice.data ? <AssessmentWorkspace practice={practice.data} /> : null}
    </div>
  );
}

function AssessmentWorkspace({ practice }: { practice: PracticeForAssessment }) {
  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
      <div className="flex flex-col gap-5 lg:col-span-7">
        <header>
          <Badge tone="primary" className="mb-2">
            {partLabel(practice.exam, practice.taskType)}
          </Badge>
          <h1 lang="de" className="text-3xl text-primary sm:text-4xl">
            {practice.topicTitle}
          </h1>
          <p className="mt-1 flex flex-wrap gap-x-4 text-sm text-ink-soft">
            <span>{practice.studentName}</span>
            <span>Praticado em {formatDateTime(practice.createdAt)}</span>
            <span>Tempo de fala: {formatClock(practice.durationSeconds)}</span>
          </p>
        </header>
        <Card className="flex flex-col gap-2">
          <h2 className="flex items-center gap-1.5 text-xl text-primary">
            <Icon name="graphic_eq" />
            Gravação do aluno
          </h2>
          {practice.recordingPath ? (
            <RecordingPlayer recordingPath={practice.recordingPath} loadImmediately />
          ) : (
            <p className="text-sm text-ink-soft">O aluno não gravou esta prática.</p>
          )}
        </Card>
        <TaskCard
          exam={practice.exam}
          taskType={practice.taskType}
          sourceText={practice.sourceText}
          prompt={practice.prompt}
          guidingPoints={practice.guidingPoints}
        />
      </div>
      <div className="lg:sticky lg:top-24 lg:col-span-5">
        {practice.assessment ? (
          <AssessedPanel exam={practice.exam} practiceId={practice.id} assessment={practice.assessment} />
        ) : (
          <AssessmentForm exam={practice.exam} practiceId={practice.id} />
        )}
      </div>
    </div>
  );
}

function AssessedPanel({
  exam,
  practiceId,
  assessment,
}: {
  exam: SpeakingExam;
  practiceId: string;
  assessment: PracticeAssessment;
}) {
  const [isEditing, setIsEditing] = useState(false);
  if (isEditing) {
    return (
      <AssessmentForm
        exam={exam}
        practiceId={practiceId}
        existing={assessment}
        onDone={() => setIsEditing(false)}
      />
    );
  }
  return (
    <Card className="flex flex-col gap-3">
      <h2 className="text-2xl text-primary">Avaliação enviada</h2>
      <p className="font-mono text-3xl font-bold text-primary">{formatAssessmentScore(assessment)}</p>
      {assessment.rubric ? <RubricBreakdown rubric={assessment.rubric} /> : null}
      {assessment.comment ? <p className="text-sm whitespace-pre-wrap">{assessment.comment}</p> : null}
      <p className="text-xs text-ink-soft">
        Por {assessment.teacherName} em {formatDateTime(assessment.createdAt)}
        {assessment.updatedAt ? ` · editada em ${formatDateTime(assessment.updatedAt)}` : ''}
      </p>
      <Button variant="secondary" icon="edit" onClick={() => setIsEditing(true)}>
        Editar avaliação
      </Button>
    </Card>
  );
}

/** The four-criteria breakdown and the per-Teil subtotal, plus how the exam total is reached. */
function RubricBreakdown({ rubric }: { rubric: TelcRubric }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-hairline bg-surface-low p-3">
      <ul className="flex flex-col gap-1 text-sm">
        {RUBRIC_CRITERIA.map((criterion) => (
          <li key={criterion} className="flex items-baseline justify-between gap-3">
            <span className="text-ink-soft">{RUBRIC_CRITERION_LABELS[criterion].pt}</span>
            <span className="font-mono font-semibold">
              {rubric[criterion]}/{RUBRIC_BANDS[criterion][0]}
            </span>
          </li>
        ))}
      </ul>
      <p className="border-t border-hairline pt-2 text-sm">
        <span className="font-semibold">Subtotal desta Teil: </span>
        <span className="font-mono">
          {rubricSubtotal(rubric)}/{RUBRIC_MAX_PER_TEIL}
        </span>
      </p>
      <p className="text-xs text-ink-soft">
        A nota do exame (0–{TELC_EXAM_MAX_SCORE}, aprovado ≥ {TELC_EXAM_PASS_SCORE}) soma as três Teile.
      </p>
    </div>
  );
}

interface AssessmentFormProps {
  readonly exam: SpeakingExam;
  readonly practiceId: string;
  /** When given, the form revises this assessment instead of creating one. */
  readonly existing?: PracticeAssessment;
  readonly onDone?: () => void;
}

/** Saves a new or revised assessment, then refreshes the Sprechen queries. */
function useSaveAssessment(
  practiceId: string,
  existing: PracticeAssessment | undefined,
  onDone?: () => void,
) {
  const { speaking } = useContainer();
  const teacher = useSignedInUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (content: AssessmentContent) => {
      if (existing) await speaking.updateAssessment.execute({ practiceId, ...content });
      else await speaking.assessPractice.execute({ practiceId, teacherId: teacher.id, ...content });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: speakingQueryKeys.all });
      if (existing) onDone?.();
      else void navigate('/avaliacoes-orais');
    },
  });
}

function AssessmentForm(props: AssessmentFormProps) {
  return props.exam === 'telc' ? <TelcRubricForm {...props} /> : <ScoreForm {...props} />;
}

const commentField = z
  .string()
  .trim()
  .max(MAX_ASSESSMENT_COMMENT_LENGTH, {
    error: `Use no máximo ${MAX_ASSESSMENT_COMMENT_LENGTH} caracteres.`,
  });

const scoreSchema = z.object({
  score: z
    .string()
    .trim()
    .regex(/^\d+$/, { error: 'Informe a nota como número inteiro.' })
    .transform(Number)
    .refine((value) => value >= MIN_SPEAKING_SCORE && value <= MAX_SPEAKING_SCORE, {
      error: `A nota vai de ${MIN_SPEAKING_SCORE} a ${MAX_SPEAKING_SCORE}.`,
    }),
  comment: commentField,
});

type ScoreFormInput = z.input<typeof scoreSchema>;
type ScoreFormValues = z.output<typeof scoreSchema>;

/** Goethe: a single free score from 0 to 100. */
function ScoreForm({ practiceId, existing, onDone }: AssessmentFormProps) {
  const form = useForm<ScoreFormInput, unknown, ScoreFormValues>({
    resolver: zodResolver(scoreSchema),
    defaultValues: { score: existing ? String(existing.score) : '', comment: existing?.comment ?? '' },
  });
  const save = useSaveAssessment(practiceId, existing, onDone);
  const { errors } = form.formState;

  return (
    <Card>
      <form
        noValidate
        onSubmit={form.handleSubmit((values) => save.mutate({ ...values, rubric: null }))}
        className="flex flex-col gap-4"
      >
        <h2 className="text-2xl text-primary">{existing ? 'Editar avaliação' : 'Sua avaliação'}</h2>
        {save.isError ? <Alert tone="error">{speakingErrorMessage(save.error)}</Alert> : null}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="assessment-score" className="text-sm font-semibold">
            Nota (0–100)
          </label>
          <input
            id="assessment-score"
            inputMode="numeric"
            aria-invalid={errors.score ? true : undefined}
            aria-describedby={errors.score ? 'assessment-score-error' : undefined}
            className="w-28 rounded-lg border border-hairline bg-surface-lowest px-3 py-2 font-mono text-lg outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/10"
            {...form.register('score')}
          />
          {errors.score ? (
            <p id="assessment-score-error" className="text-sm text-error">
              {errors.score.message}
            </p>
          ) : null}
        </div>
        <CommentField register={form.register} error={errors.comment?.message} />
        <FormActions existing={Boolean(existing)} isSaving={save.isPending} onDone={onDone} />
      </form>
    </Card>
  );
}

const band = (allowed: readonly number[]) =>
  z
    .enum(allowed.map(String) as [string, ...string[]], { error: 'Selecione A, B, C ou D.' })
    .transform(Number);

const rubricSchema = z.object({
  ausdruck: band(RUBRIC_BANDS.ausdruck),
  aufgabe: band(RUBRIC_BANDS.aufgabe),
  grammatik: band(RUBRIC_BANDS.grammatik),
  aussprache: band(RUBRIC_BANDS.aussprache),
  comment: commentField,
});

type RubricFormInput = z.input<typeof rubricSchema>;
type RubricFormValues = z.output<typeof rubricSchema>;

function rubricDefault(
  existing: PracticeAssessment | undefined,
  criterion: RubricCriterion,
): string | undefined {
  return existing?.rubric ? String(existing.rubric[criterion]) : undefined;
}

/** telc: the official four-criteria Bewertungsbogen for one Teil, which adds up to 0–25. */
function TelcRubricForm({ practiceId, existing, onDone }: AssessmentFormProps) {
  const form = useForm<RubricFormInput, unknown, RubricFormValues>({
    resolver: zodResolver(rubricSchema),
    defaultValues: {
      ausdruck: rubricDefault(existing, 'ausdruck'),
      aufgabe: rubricDefault(existing, 'aufgabe'),
      grammatik: rubricDefault(existing, 'grammatik'),
      aussprache: rubricDefault(existing, 'aussprache'),
      comment: existing?.comment ?? '',
    },
  });
  const save = useSaveAssessment(practiceId, existing, onDone);
  const { errors } = form.formState;

  const watched = useWatch({ control: form.control });
  const subtotal = RUBRIC_CRITERIA.reduce((sum, criterion) => sum + (Number(watched[criterion]) || 0), 0);

  return (
    <Card>
      <form
        noValidate
        onSubmit={form.handleSubmit(({ comment, ...rubric }) => save.mutate({ score: 0, comment, rubric }))}
        className="flex flex-col gap-4"
      >
        <div>
          <h2 className="text-2xl text-primary">{existing ? 'Editar avaliação' : 'Nota da banca'}</h2>
          <p className="text-sm text-ink-soft">Pontue os quatro critérios oficiais desta Teil (A/B/C/D).</p>
        </div>
        {save.isError ? <Alert tone="error">{speakingErrorMessage(save.error)}</Alert> : null}
        {RUBRIC_CRITERIA.map((criterion) => (
          <RubricField
            key={criterion}
            criterion={criterion}
            register={form.register}
            error={errors[criterion]?.message}
          />
        ))}
        <p className="flex items-baseline justify-between rounded-lg bg-surface-low px-3 py-2">
          <span className="text-sm font-semibold">Subtotal desta Teil</span>
          <span className="font-mono text-xl font-bold text-primary">
            {subtotal}/{RUBRIC_MAX_PER_TEIL}
          </span>
        </p>
        <CommentField register={form.register} error={errors.comment?.message} />
        <FormActions existing={Boolean(existing)} isSaving={save.isPending} onDone={onDone} />
      </form>
    </Card>
  );
}

function RubricField({
  criterion,
  register,
  error,
}: {
  criterion: RubricCriterion;
  register: UseFormRegister<RubricFormInput>;
  error?: string;
}) {
  const label = RUBRIC_CRITERION_LABELS[criterion];
  return (
    <fieldset className="flex flex-col gap-1.5">
      <legend className="text-sm font-semibold">{label.pt}</legend>
      <span lang="de" className="text-xs text-ink-soft">
        {label.de}
      </span>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={label.pt}>
        {rubricBandOptions(criterion).map((option) => (
          <label
            key={option.band}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-hairline bg-surface-lowest px-3 py-2 text-sm has-[:checked]:border-primary-container has-[:checked]:bg-primary-container/10 has-[:checked]:font-semibold has-[:checked]:text-primary"
          >
            <input
              type="radio"
              value={String(option.points)}
              aria-invalid={error ? true : undefined}
              {...register(criterion)}
            />
            <span>
              {option.band}{' '}
              <span className="font-mono text-ink-soft">
                ({option.points} {option.points === 1 ? 'pt' : 'pts'})
              </span>
            </span>
          </label>
        ))}
      </div>
      {error ? <p className="text-sm text-error">{error}</p> : null}
    </fieldset>
  );
}

function CommentField({
  register,
  error,
}: {
  register: UseFormRegister<ScoreFormInput> | UseFormRegister<RubricFormInput>;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="assessment-comment" className="text-sm font-semibold">
        Comentário para o aluno (opcional)
      </label>
      <textarea
        id="assessment-comment"
        rows={6}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? 'assessment-comment-error' : undefined}
        placeholder="Aufgabenerfüllung, Flüssigkeit, Aussprache, Wortschatz, Grammatik…"
        className="rounded-lg border border-hairline bg-surface-lowest p-3 text-base leading-relaxed outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/10"
        {...(register as UseFormRegister<ScoreFormInput>)('comment')}
      />
      {error ? (
        <p id="assessment-comment-error" className="text-sm text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function FormActions({
  existing,
  isSaving,
  onDone,
}: {
  existing: boolean;
  isSaving: boolean;
  onDone?: () => void;
}) {
  return (
    <>
      <Button type="submit" size="lg" icon={existing ? 'save' : 'send'} isLoading={isSaving}>
        {existing ? 'Salvar alterações' : 'Enviar avaliação'}
      </Button>
      {existing ? (
        <Button variant="ghost" onClick={onDone} disabled={isSaving}>
          Cancelar
        </Button>
      ) : null}
    </>
  );
}
