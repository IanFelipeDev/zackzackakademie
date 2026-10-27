import { Icon } from '@/shared/ui';
import { splitArticle, type Flashcard } from '../../domain/flashcard';
import { categoryLabel, EXTRA_KIND_LABELS } from '../flashcard-labels';

/** Which way the student is studying: German prompt → Portuguese answer, or the reverse. */
export type StudyDirection = 'de-pt' | 'pt-de';

interface FlashcardViewProps {
  readonly card: Flashcard;
  readonly direction: StudyDirection;
  readonly isFlipped: boolean;
  readonly onFlip: () => void;
}

const FACE_CLASS =
  'absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-y-auto rounded-2xl border border-hairline p-6 text-center shadow-lift backface-hidden';

/** The German term with its definite article highlighted, so the gender stands out. */
function GermanTerm({ term, className }: { term: string; className?: string }) {
  const { article, rest } = splitArticle(term);
  return (
    <span lang="de" className={className}>
      {article ? (
        <span className="mr-2 rounded-lg bg-surface-high px-2 align-middle text-[0.6em] text-secondary">
          {article}
        </span>
      ) : null}
      {rest}
    </span>
  );
}

/** The grammatical extra (plural / Perfekt / case) and German synonyms, shown on the answer side. */
function CardDetails({ card }: { card: Flashcard }) {
  return (
    <>
      {card.extra && card.extraKind ? (
        <span className="mt-1 inline-flex items-center gap-1.5 text-sm text-ink-soft">
          <span className="rubric text-secondary">{EXTRA_KIND_LABELS[card.extraKind]}</span>
          <span lang="de" className="font-medium text-ink">
            {card.extra}
          </span>
        </span>
      ) : null}
      {card.synonyms.length > 0 ? (
        <span className="mt-1 flex flex-col items-center gap-1">
          <span className="rubric text-ink-soft">Sinônimos e paráfrases</span>
          <span lang="de" className="text-ink">
            {card.synonyms.join(' · ')}
          </span>
        </span>
      ) : null}
    </>
  );
}

/** The card itself: a prompt on the front and the answer on the back. Direction decides which language is which. */
export function FlashcardView({ card, direction, isFlipped, onFlip }: FlashcardViewProps) {
  const category = categoryLabel(card.category);
  const germanIsPrompt = direction === 'de-pt';
  const bigGerman = (
    <GermanTerm term={card.term} className="font-serif text-4xl leading-tight text-primary sm:text-5xl" />
  );
  const bigTranslation = (
    <span className="text-3xl font-semibold text-primary sm:text-4xl">{card.translation}</span>
  );

  return (
    <button type="button" onClick={onFlip} className="block h-72 w-full perspective-[1600px] sm:h-80">
      {/* Rotating the inner box, not the button, keeps the focus ring flat. */}
      <span
        className={`relative block h-full w-full transition-transform duration-500 ease-(--ease-strong-in-out) transform-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front: the prompt. */}
        <span className={`${FACE_CLASS} bg-surface-lowest`} aria-hidden={isFlipped}>
          <CategoryTag name={category.name} icon={category.icon} />
          {germanIsPrompt ? bigGerman : bigTranslation}
          <span className="mt-2 inline-flex items-center gap-1 text-xs text-ink-soft">
            <Icon name="touch_app" className="text-[16px]" />
            Toque ou clique para virar
          </span>
        </span>

        {/* Back: a small echo of the prompt, the answer, and the grammatical details. */}
        <span className={`${FACE_CLASS} rotate-y-180 bg-surface-low`} aria-hidden={!isFlipped}>
          <CategoryTag name={category.name} icon={category.icon} />
          {germanIsPrompt ? (
            <GermanTerm term={card.term} className="font-serif text-lg text-ink-soft" />
          ) : (
            <span className="text-lg text-ink-soft">{card.translation}</span>
          )}
          {germanIsPrompt ? bigTranslation : bigGerman}
          <CardDetails card={card} />
        </span>
      </span>
    </button>
  );
}

function CategoryTag({ name, icon }: { name: string; icon: string }) {
  return (
    <span className="rubric absolute top-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-surface-high px-2.5 py-0.5 whitespace-nowrap text-primary">
      <Icon name={icon} className="text-[14px]" />
      {name}
    </span>
  );
}
