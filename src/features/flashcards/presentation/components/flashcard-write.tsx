import { useState } from 'react';
import { isCorrect } from '@/shared/domain';
import { Button, Icon } from '@/shared/ui';
import { splitArticle, type Flashcard } from '../../domain/flashcard';
import { categoryLabel, EXTRA_KIND_LABELS } from '../flashcard-labels';

/** The German spellings accepted for a card: the term, its article-less form and the synonyms, both ways. */
function acceptedAnswers(card: Flashcard): readonly string[] {
  const forms = [card.term, ...card.synonyms];
  return forms.flatMap((form) => [form, splitArticle(form).rest]);
}

/**
 * "Write the word" practice: the Portuguese translation is the prompt and the student types the German term.
 * The answer is checked tolerantly (case, punctuation, umlauts and ß, with or without the article), reusing the
 * shared answer checker. The card is keyed by id upstream, so each card starts fresh.
 */
export function FlashcardWrite({
  card,
  onResult,
}: {
  card: Flashcard;
  onResult?: (correct: boolean) => void;
}) {
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState<boolean | null>(null);
  const category = categoryLabel(card.category);

  function check() {
    if (checked !== null) return;
    const ok = acceptedAnswers(card).some((answer) => isCorrect(answer, value));
    setChecked(ok);
    onResult?.(ok);
  }

  return (
    <section
      aria-label="Escreva a palavra em alemão"
      className="flex flex-col gap-4 rounded-2xl border border-hairline bg-surface-lowest p-6 shadow-lift"
    >
      <span className="rubric inline-flex items-center gap-1 self-center rounded-full bg-surface-high px-2.5 py-0.5 text-primary">
        <Icon name={category.icon} className="text-[14px]" />
        {category.name}
      </span>
      <p className="text-center text-xs text-ink-soft">Escreva em alemão:</p>
      <p className="text-center text-2xl font-semibold text-primary sm:text-3xl">{card.translation}</p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          check();
        }}
        className="flex flex-col gap-2"
      >
        <input
          autoFocus
          lang="de"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          readOnly={checked !== null}
          placeholder="Digite a palavra alemã…"
          aria-label="Sua resposta em alemão"
          className={`w-full rounded-xl border bg-surface-lowest px-4 py-3 text-center text-lg outline-none focus:ring-4 focus:ring-primary-container/10 ${
            checked === null
              ? 'border-hairline focus:border-primary-container'
              : checked
                ? 'border-success text-success'
                : 'border-error text-error'
          }`}
        />
        {checked === null ? (
          <Button type="submit" icon="spellcheck" disabled={value.trim() === ''}>
            Verificar
          </Button>
        ) : null}
      </form>

      {checked !== null ? (
        <div
          className={`flex flex-col items-center gap-1 rounded-xl p-3 text-center ${
            checked ? 'bg-success-container/40 text-success' : 'bg-error/5 text-error'
          }`}
        >
          <p className="flex items-center gap-1.5 font-semibold">
            <Icon name={checked ? 'check_circle' : 'cancel'} />
            {checked ? 'Correto!' : 'Ainda não'}
          </p>
          <p lang="de" className="text-lg font-semibold text-primary">
            {card.term}
          </p>
          {card.extra && card.extraKind ? (
            <p className="text-sm text-ink-soft">
              <span className="rubric text-secondary">{EXTRA_KIND_LABELS[card.extraKind]}</span>{' '}
              <span lang="de">{card.extra}</span>
            </p>
          ) : null}
          {card.synonyms.length > 0 ? (
            <p lang="de" className="text-sm text-ink-soft">
              {card.synonyms.join(' · ')}
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
