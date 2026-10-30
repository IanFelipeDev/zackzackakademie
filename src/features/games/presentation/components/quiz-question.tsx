import { useMemo, useState } from 'react';
import { Button, Icon } from '@/shared/ui';
import { wordTiles, type GrammarQuestion } from '../../domain/grammar-question';
import { shuffle } from '../shuffle';

interface QuizQuestionProps {
  readonly question: GrammarQuestion;
  readonly onAnswer: (given: string) => void;
}

/** Renders the right input for a question kind and reports the learner's answer once. */
export function QuizQuestion({ question, onAnswer }: QuizQuestionProps) {
  if (question.kind === 'multiple-choice') {
    return <MultipleChoice question={question} onAnswer={onAnswer} />;
  }
  if (question.kind === 'order-words') {
    return <OrderWords question={question} onAnswer={onAnswer} />;
  }
  return <FillBlank onAnswer={onAnswer} />;
}

function MultipleChoice({ question, onAnswer }: QuizQuestionProps) {
  const options = useMemo(() => shuffle(question.options ?? []), [question]);
  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onAnswer(option)}
          className="rounded-xl border border-hairline bg-surface-lowest px-4 py-3 text-left text-ink transition-colors hover:border-primary-container hover:bg-surface-high"
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function FillBlank({ onAnswer }: { onAnswer: (given: string) => void }) {
  const [value, setValue] = useState('');
  const submit = () => {
    if (value.trim()) onAnswer(value);
  };
  return (
    <form
      className="flex flex-col gap-3 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      {/* 16px text keeps iOS from zooming on focus (project convention). */}
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        autoComplete="off"
        autoCapitalize="off"
        aria-label="Sua resposta"
        className="flex-1 rounded-xl border border-hairline bg-surface-lowest px-4 py-3 text-base text-ink outline-none focus-visible:border-primary-container"
      />
      <Button type="submit" disabled={!value.trim()} icon="send">
        Responder
      </Button>
    </form>
  );
}

function OrderWords({ question, onAnswer }: QuizQuestionProps) {
  // Tile the correct sentence and shuffle; each tile keeps its slot index so repeated words stay distinct.
  const tiles = useMemo(() => {
    const words = wordTiles(question);
    return shuffle(words.map((word, index) => ({ index, word })));
  }, [question]);
  const [picked, setPicked] = useState<number[]>([]);

  const pickedSet = new Set(picked);
  const answer = picked.map((index) => tiles.find((tile) => tile.index === index)!.word).join(' ');

  return (
    <div className="flex flex-col gap-3">
      <div className="flex min-h-[3rem] flex-wrap gap-2 rounded-xl border border-dashed border-hairline bg-surface-high/50 p-3">
        {picked.length === 0 ? (
          <span className="self-center text-sm text-ink-soft">Toque nas palavras para montar a frase.</span>
        ) : null}
        {picked.map((index) => {
          const tile = tiles.find((item) => item.index === index)!;
          return (
            <button
              key={index}
              type="button"
              onClick={() => setPicked((current) => current.filter((item) => item !== index))}
              className="inline-flex items-center gap-1 rounded-lg bg-primary-container px-3 py-1.5 text-sm text-white"
            >
              {tile.word}
              <Icon name="close" className="text-[14px]" />
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {tiles.map((tile) =>
          pickedSet.has(tile.index) ? null : (
            <button
              key={tile.index}
              type="button"
              onClick={() => setPicked((current) => [...current, tile.index])}
              className="rounded-lg border border-hairline bg-surface-lowest px-3 py-1.5 text-sm text-ink transition-colors hover:border-primary-container hover:bg-surface-high"
            >
              {tile.word}
            </button>
          ),
        )}
      </div>
      <Button
        type="button"
        onClick={() => onAnswer(answer)}
        disabled={picked.length === 0}
        icon="send"
        className="self-start"
      >
        Responder
      </Button>
    </div>
  );
}
