import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useContainer } from '@/app/context/container-context';
import { useSignedInUser } from '@/features/auth';
import { Alert, Button, EmptyState, Icon, PageHeader, Spinner } from '@/shared/ui';
import {
  CARD_STATUSES,
  countStatuses,
  type CardStatus,
  type MarkStatus,
  type StatusCounts,
} from '../domain/card-status';
import type { DeckCard, DeckFilter } from '../domain/deck';
import { WORD_TYPES, type WordType } from '../domain/flashcard';
import { FlashcardSession } from './components/flashcard-session';
import type { StudyDirection } from './components/flashcard-view';
import { categoryLabel, STATUS_LABELS, WORD_TYPE_LABELS } from './flashcard-labels';
import { flashcardQueryKeys } from './flashcard-query-keys';

const LOAD_ERROR = 'Não foi possível carregar os cartões. Tente novamente em instantes.';
const SAVE_ERROR = 'Não foi possível salvar a marcação deste cartão. Tente de novo.';

const INITIAL_FILTER: DeckFilter = { category: 'all', wordType: 'all', status: 'all' };

export function FlashcardsPage() {
  const { flashcards } = useContainer();
  const user = useSignedInUser();
  const queryClient = useQueryClient();
  const deckKey = flashcardQueryKeys.deck(user.id);
  const deck = useQuery({
    queryKey: deckKey,
    queryFn: () => flashcards.listMyCards.execute(user.id),
  });
  const [filter, setFilter] = useState<DeckFilter>(INITIAL_FILTER);
  const [direction, setDirection] = useState<StudyDirection>('de-pt');

  // Optimistic: the card shows its new status at once and rolls back if saving fails.
  const mark = useMutation({
    mutationFn: (input: { flashcardId: string; status: MarkStatus }) =>
      flashcards.markCard.execute({ studentId: user.id, ...input }),
    onMutate: async ({ flashcardId, status }) => {
      await queryClient.cancelQueries({ queryKey: deckKey });
      const previous = queryClient.getQueryData<DeckCard[]>(deckKey);
      queryClient.setQueryData<DeckCard[]>(deckKey, (cards) =>
        cards?.map((entry) => (entry.card.id === flashcardId ? { ...entry, status } : entry)),
      );
      return { previous };
    },
    onError: (_error, _input, context) => {
      if (context?.previous) queryClient.setQueryData(deckKey, context.previous);
    },
  });

  const cards = deck.data ?? [];
  // A1–A2 decks carry a part of speech; B2 decks do not, so the word-type filter only shows up for A1–A2.
  const hasWordTypes = cards.some((entry) => entry.card.wordType !== null);
  const scope = cards.filter(
    (entry) =>
      (filter.category === 'all' || entry.card.category === filter.category) &&
      (filter.wordType === 'all' || entry.card.wordType === filter.wordType),
  );
  const known = cards.filter((entry) => entry.status === 'known').length;

  return (
    <div>
      <PageHeader
        eyebrow={eyebrow(user.level)}
        title="Flashcards"
        description="Vire o cartão para ver a tradução e marque se você já sabe a palavra ou se quer revisá-la depois. Suas marcações ficam salvas."
      />
      {deck.isPending ? <Spinner label="Carregando cartões…" /> : null}
      {deck.isError ? <Alert tone="error">{LOAD_ERROR}</Alert> : null}
      {deck.isSuccess && cards.length === 0 ? (
        <EmptyState icon="style" title="Nenhum cartão disponível">
          Os cartões de vocabulário ainda não foram publicados para o seu nível.
        </EmptyState>
      ) : null}
      {cards.length > 0 ? (
        <div className="flex flex-col gap-6">
          <OverallProgress known={known} total={cards.length} />

          {hasWordTypes ? (
            <FilterChips
              label="Classe de palavra"
              value={filter.wordType}
              options={wordTypeOptions(cards)}
              // Changing the word type resets the theme, like the original trainer.
              onChange={(wordType) => setFilter((current) => ({ ...current, wordType, category: 'all' }))}
              scrollOnPhones
            />
          ) : null}

          {hasWordTypes ? (
            <ThemeSelect
              value={filter.category}
              options={themeOptions(scope)}
              onChange={(category) => setFilter((current) => ({ ...current, category }))}
            />
          ) : (
            <FilterChips
              label="Categoria"
              value={filter.category}
              options={categoryOptions(cards)}
              onChange={(category) => setFilter((current) => ({ ...current, category }))}
              scrollOnPhones
            />
          )}

          <FilterChips
            label="Situação"
            value={filter.status}
            options={statusOptions(countStatuses(scope.map((entry) => entry.status)))}
            onChange={(status) => setFilter((current) => ({ ...current, status }))}
          />

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant={filter.status === 'new' ? 'primary' : 'soft'}
              size="sm"
              icon="radio_button_unchecked"
              onClick={() =>
                setFilter((current) => ({ ...current, status: current.status === 'new' ? 'all' : 'new' }))
              }
            >
              Só pendentes
            </Button>
            <Button
              variant="soft"
              size="sm"
              icon="swap_horiz"
              onClick={() => setDirection((d) => (d === 'de-pt' ? 'pt-de' : 'de-pt'))}
            >
              {direction === 'de-pt' ? 'Alemão → Português' : 'Português → Alemão'}
            </Button>
          </div>

          {mark.isError ? <Alert tone="error">{SAVE_ERROR}</Alert> : null}
          {/* Keyed by the filter and direction: changing either starts a new pass through the matching cards. */}
          <FlashcardSession
            key={`${filter.category}:${filter.wordType}:${filter.status}:${direction}`}
            cards={cards}
            filter={filter}
            direction={direction}
            onMark={(flashcardId, status) => mark.mutate({ flashcardId, status })}
          />
        </div>
      ) : null}
    </div>
  );
}

function eyebrow(level: string | null): string {
  if (level === 'B2') return 'Goethe-Zertifikat B2 · Vocabulário';
  return level ? `Alemão ${level} · Vocabulário` : 'Vocabulário';
}

function OverallProgress({ known, total }: { known: number; total: number }) {
  const percent = total === 0 ? 0 : Math.round((known / total) * 100);
  const label = `${known} de ${total} palavras realizadas`;
  return (
    <div className="flex flex-col gap-1.5">
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={known}
        className="h-2.5 overflow-hidden rounded-full bg-surface-highest"
      >
        <div
          className="h-full rounded-full bg-primary-container transition-[width] duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-sm text-ink-soft">
        {label} ({percent}%)
      </p>
    </div>
  );
}

interface ChipOption<T extends string> {
  readonly value: T;
  readonly name: string;
  readonly icon: string;
  readonly count: number;
}

interface FilterChipsProps<T extends string> {
  readonly label: string;
  readonly value: T;
  readonly options: readonly ChipOption<T>[];
  readonly onChange: (value: T) => void;
  /** Scroll sideways on phones instead of wrapping into several rows. */
  readonly scrollOnPhones?: boolean;
}

function FilterChips<T extends string>({
  label,
  value,
  options,
  onChange,
  scrollOnPhones,
}: FilterChipsProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={`flex gap-2 ${
        scrollOnPhones
          ? '-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0'
          : 'flex-wrap'
      }`}
    >
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={`${option.name}: ${option.count}`}
            onClick={() => onChange(option.value)}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm whitespace-nowrap transition-colors ${
              isActive
                ? 'border-primary-container bg-primary-container font-semibold text-white'
                : 'border-hairline bg-surface-lowest text-ink-soft hover:border-primary-container hover:text-primary'
            }`}
          >
            <Icon name={option.icon} className="text-[18px]" />
            {option.name}
            <span className="font-mono text-xs opacity-80">{option.count}</span>
          </button>
        );
      })}
    </div>
  );
}

/** The A1–A2 decks have too many themes for chips, so they pick a theme from a dropdown instead. */
function ThemeSelect({
  value,
  options,
  onChange,
}: {
  readonly value: string;
  readonly options: readonly { value: string; name: string; count: number }[];
  readonly onChange: (value: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="rubric text-ink-soft">Tema</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-hairline bg-surface-lowest px-3 py-2 text-base text-ink"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name} ({option.count})
          </option>
        ))}
      </select>
    </label>
  );
}

function wordTypeOptions(cards: readonly DeckCard[]): ChipOption<WordType | 'all'>[] {
  const options = WORD_TYPES.map((wordType) => ({
    value: wordType,
    ...WORD_TYPE_LABELS[wordType],
    count: cards.filter((entry) => entry.card.wordType === wordType).length,
  })).filter((option) => option.count > 0);
  return [{ value: 'all', name: 'Todas', icon: 'select_all', count: cards.length }, ...options];
}

function themeOptions(scope: readonly DeckCard[]): { value: string; name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const entry of scope) counts.set(entry.card.category, (counts.get(entry.card.category) ?? 0) + 1);
  const themes = [...counts.keys()].map((slug) => ({
    value: slug,
    name: categoryLabel(slug).name,
    count: counts.get(slug) ?? 0,
  }));
  return [{ value: 'all', name: 'Todos os temas', count: scope.length }, ...themes];
}

function categoryOptions(cards: readonly DeckCard[]): ChipOption<string>[] {
  const counts = new Map<string, number>();
  for (const entry of cards) counts.set(entry.card.category, (counts.get(entry.card.category) ?? 0) + 1);
  const options = [...counts.keys()].map((slug) => ({
    value: slug,
    ...categoryLabel(slug),
    count: counts.get(slug) ?? 0,
  }));
  return [{ value: 'all', name: 'Todas', icon: 'select_all', count: cards.length }, ...options];
}

function statusOptions(counts: StatusCounts): ChipOption<CardStatus | 'all'>[] {
  return [
    { value: 'all', name: 'Todos', icon: 'stacks', count: counts.total },
    ...CARD_STATUSES.map((status) => ({
      value: status,
      name: STATUS_LABELS[status].many,
      icon: STATUS_LABELS[status].icon,
      count: counts[status],
    })),
  ];
}
