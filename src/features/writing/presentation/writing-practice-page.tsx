import { useQuery } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import { useContainer } from '@/app/context/container-context';
import { useSignedInUser } from '@/features/auth';
import type { PracticeMode } from '@/shared/domain';
import { Alert, EmptyState, Icon, Spinner } from '@/shared/ui';
import { WRITING_TASK_TYPES, type WritingTaskType } from '../domain/task-type';
import type { PhraseGroup } from '../domain/useful-phrase';
import { pickRandomExercise, type WritingExercise } from '../domain/writing-exercise';
import { TaskTypeTabs } from './components/task-type-tabs';
import { WritingSession } from './components/writing-session';
import { TASK_TYPE_LABELS, taskTypeFromSlug } from './task-type-labels';
import { writingErrorMessage } from './writing-error-message';
import { writingQueryKeys } from './writing-query-keys';

const TOPIC_PARAM = 'tema';
const PART_PARAM = 'teil';
const MODE_PARAM = 'modo';

const MODES = [
  { mode: 'exam', slug: 'simulado', label: 'Simulado', icon: 'school' },
  { mode: 'free', slug: 'livre', label: 'Treino Livre', icon: 'spa' },
] as const satisfies readonly { mode: PracticeMode; slug: string; label: string; icon: string }[];

function modeFromSlug(slug: string | null): PracticeMode {
  return slug === 'livre' ? 'free' : 'exam';
}

export function WritingPracticePage() {
  const { writing } = useContainer();
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = modeFromSlug(searchParams.get(MODE_PARAM));
  const modeSlug = MODES.find((m) => m.mode === mode)!.slug;

  const exercises = useQuery({
    queryKey: writingQueryKeys.exercises(mode),
    queryFn: () => writing.listExercises.execute(mode),
    staleTime: Infinity,
  });

  const list = exercises.data ?? [];
  const availableTaskTypes = WRITING_TASK_TYPES.filter((type) => list.some((e) => e.taskType === type));
  const taskType = taskTypeFromSlug(searchParams.get(PART_PARAM), availableTaskTypes);

  // Simulado groups by exam part; Treino Livre is a single open list.
  const shown = mode === 'exam' ? list.filter((e) => e.taskType === taskType) : list;
  const selected = shown.find((e) => e.id === searchParams.get(TOPIC_PARAM)) ?? shown[0];

  // Redemittel are tied to the exam formats; the Treino Livre has none.
  const phrases = useQuery({
    queryKey: writingQueryKeys.phrases(taskType),
    queryFn: () => writing.listUsefulPhrases.execute(taskType),
    staleTime: Infinity,
    enabled: mode === 'exam',
  });
  const phraseGroups: readonly PhraseGroup[] = mode === 'exam' ? (phrases.data ?? []) : [];

  function selectMode(next: PracticeMode) {
    setSearchParams({ [MODE_PARAM]: MODES.find((m) => m.mode === next)!.slug });
  }

  function selectTaskType(next: WritingTaskType) {
    setSearchParams({ [MODE_PARAM]: modeSlug, [PART_PARAM]: TASK_TYPE_LABELS[next].slug });
  }

  function selectExercise(exerciseId: string) {
    const params: Record<string, string> = { [MODE_PARAM]: modeSlug, [TOPIC_PARAM]: exerciseId };
    if (mode === 'exam') params[PART_PARAM] = TASK_TYPE_LABELS[taskType].slug;
    setSearchParams(params);
  }

  function selectRandomExercise() {
    const others = shown.filter((e) => e.id !== selected?.id);
    const next = pickRandomExercise(others.length > 0 ? others : shown);
    if (next) selectExercise(next.id);
  }

  const phrasesLoading = mode === 'exam' && phrases.isPending;

  return (
    <div>
      <PracticeHero mode={mode}>
        <ModeTabs value={mode} onChange={selectMode} />
        {mode === 'exam' ? (
          <TaskTypeTabs options={availableTaskTypes} value={taskType} onChange={selectTaskType} />
        ) : null}
      </PracticeHero>

      {exercises.isError || phrases.isError ? (
        <Alert tone="error">{writingErrorMessage(exercises.error ?? phrases.error)}</Alert>
      ) : null}
      {exercises.isPending || phrasesLoading ? <Spinner label="Carregando temas…" /> : null}
      {exercises.isSuccess && !selected ? (
        <EmptyState icon="menu_book" title="Nenhum tema disponível">
          {mode === 'free'
            ? 'Os temas de treino livre do seu nível ainda não foram publicados.'
            : 'Os temas desta parte ainda não foram publicados.'}
        </EmptyState>
      ) : null}
      {selected && !phrasesLoading ? (
        <DraftLoader
          key={selected.id}
          exercise={selected}
          exercises={shown}
          phraseGroups={phraseGroups}
          onSelectExercise={selectExercise}
          onRandomExercise={selectRandomExercise}
        />
      ) : null}
    </div>
  );
}

function ModeTabs({ value, onChange }: { value: PracticeMode; onChange: (mode: PracticeMode) => void }) {
  return (
    <div
      role="radiogroup"
      aria-label="Modo de treino"
      className="inline-flex rounded-full bg-surface-highest p-1.5 shadow-inner"
    >
      {MODES.map(({ mode, label, icon }) => {
        const isActive = mode === value;
        return (
          <button
            key={mode}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(mode)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-6 ${
              isActive ? 'bg-primary-container text-white shadow-md' : 'text-ink-soft hover:text-primary'
            }`}
          >
            <Icon name={icon} className="text-[18px]" />
            <span className="tracking-wide uppercase">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

function PracticeHero({ mode, children }: { mode: PracticeMode; children: ReactNode }) {
  const isFree = mode === 'free';
  return (
    <div className="mx-auto mb-8 flex max-w-3xl flex-col items-center text-center">
      <p className="rubric mb-3 inline-flex items-center gap-2 rounded-full bg-surface-high px-3 py-1 text-primary shadow-sm">
        <Icon name={isFree ? 'spa' : 'school'} className="text-[16px]" />
        {isFree ? 'Treino Livre · Modul Schreiben' : 'Simulado · Modul Schreiben'}
      </p>
      <h1 className="mb-2 text-4xl tracking-tight text-primary sm:text-[44px]">
        Treino Schreiben{' '}
        <span className="text-2xl font-normal text-secondary italic sm:text-3xl">
          – Aulas com a Melissa :D
        </span>
      </h1>
      <p className="max-w-2xl text-ink-soft">
        {isFree ? (
          <>
            Escreva sem pressão sobre temas do dia a dia: <strong className="text-ink">sem relógio</strong> e
            sem contagem de palavras. Mande o texto e a Melissa corrige pessoalmente.
          </>
        ) : (
          <>
            Treine a redação no formato oficial da prova e envie seu texto para a correção da Melissa, baseada
            nos critérios de avaliação.
          </>
        )}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">{children}</div>
    </div>
  );
}

interface DraftLoaderProps {
  readonly exercise: WritingExercise;
  readonly exercises: readonly WritingExercise[];
  readonly phraseGroups: readonly PhraseGroup[];
  readonly onSelectExercise: (exerciseId: string) => void;
  readonly onRandomExercise: () => void;
}

/** Waits for the saved draft so the session starts from it instead of an empty text. */
function DraftLoader({ exercise, ...rest }: DraftLoaderProps) {
  const { writing } = useContainer();
  const user = useSignedInUser();
  const draft = useQuery({
    queryKey: writingQueryKeys.draft(exercise.id, user.id),
    queryFn: () => writing.getDraft.execute(exercise.id, user.id),
    gcTime: 0,
  });

  if (draft.isPending) return <Spinner label="Carregando seu rascunho…" />;
  if (draft.isError) return <Alert tone="error">{writingErrorMessage(draft.error)}</Alert>;
  return (
    <WritingSession
      studentId={user.id}
      exercise={exercise}
      initialContent={draft.data?.content ?? ''}
      {...rest}
    />
  );
}
