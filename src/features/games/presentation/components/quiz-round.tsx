import { useEffect, useMemo, useReducer, useRef } from 'react';
import { Button, Card, Icon } from '@/shared/ui';
import { isCorrect } from '../../domain/answer-checking';
import type { GrammarQuestion } from '../../domain/grammar-question';
import type { GrammarTopic } from '../../domain/grammar-game';
import { MAX_LIVES, starsForRound, WIN_BONUS_XP, xpForCorrect } from '../../domain/scoring';
import { shuffle } from '../shuffle';
import { Hearts, ProgressBar } from './meters';
import { QuizQuestion } from './quiz-question';

export interface RoundSummary {
  readonly correct: number;
  readonly total: number;
  readonly survived: boolean;
  /** XP earned this round, including the win bonus. */
  readonly xp: number;
  readonly stars: number;
}

interface RoundState {
  readonly questions: readonly GrammarQuestion[];
  readonly index: number;
  readonly lives: number;
  readonly streak: number;
  readonly correct: number;
  readonly xp: number;
  readonly phase: 'answering' | 'feedback' | 'finished';
  readonly lastCorrect: boolean;
}

type RoundAction = { type: 'answer'; given: string } | { type: 'advance' };

function reducer(state: RoundState, action: RoundAction): RoundState {
  if (action.type === 'answer' && state.phase === 'answering') {
    const question = state.questions[state.index];
    if (!question) return state;
    if (isCorrect(question.answer, action.given)) {
      const streak = state.streak + 1;
      return {
        ...state,
        phase: 'feedback',
        lastCorrect: true,
        streak,
        correct: state.correct + 1,
        xp: state.xp + xpForCorrect(streak),
      };
    }
    return { ...state, phase: 'feedback', lastCorrect: false, streak: 0, lives: state.lives - 1 };
  }
  if (action.type === 'advance' && state.phase === 'feedback') {
    const isLast = state.index >= state.questions.length - 1;
    if (state.lives === 0 || isLast) return { ...state, phase: 'finished' };
    return { ...state, index: state.index + 1, phase: 'answering' };
  }
  return state;
}

interface QuizRoundProps {
  readonly topic: GrammarTopic;
  readonly onFinish: (summary: RoundSummary) => void;
  readonly onExit: () => void;
}

export function QuizRound({ topic, onFinish, onExit }: QuizRoundProps) {
  const questions = useMemo(() => shuffle(topic.questions), [topic]);
  const [state, dispatch] = useReducer(reducer, questions, (qs): RoundState => ({
    questions: qs,
    index: 0,
    lives: MAX_LIVES,
    streak: 0,
    correct: 0,
    xp: 0,
    phase: 'answering',
    lastCorrect: false,
  }));

  // Report the result exactly once when the round ends (the ref guards against a double invocation).
  const reported = useRef(false);
  useEffect(() => {
    if (state.phase === 'finished' && !reported.current) {
      reported.current = true;
      const survived = state.lives > 0;
      onFinish({
        correct: state.correct,
        total: state.questions.length,
        survived,
        xp: state.xp + (survived ? WIN_BONUS_XP : 0),
        stars: starsForRound(state.correct, state.questions.length, survived),
      });
    }
  }, [state, onFinish]);

  if (state.phase === 'finished') return null;

  const question = state.questions[state.index];
  if (!question) return null;
  const progress = (state.index / state.questions.length) * 100;
  const isLast = state.index >= state.questions.length - 1;

  return (
    <Card className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <Button variant="soft" size="sm" icon="close" onClick={onExit}>
          Sair
        </Button>
        <Hearts value={state.lives} />
        <span className="inline-flex items-center gap-1 text-sm text-ink-soft">
          <Icon name="local_fire_department" className="text-[18px] text-tertiary" />
          {state.streak} · {state.xp} XP
        </span>
      </div>

      <ProgressBar percent={progress} label="Progresso da rodada" />

      <p className="text-lg text-ink">
        {question.kind === 'order-words' ? <span className="text-ink-soft">Monte a frase: </span> : null}
        {question.prompt}
      </p>

      {state.phase === 'answering' ? (
        <QuizQuestion
          key={state.index}
          question={question}
          onAnswer={(given) => dispatch({ type: 'answer', given })}
        />
      ) : (
        <Feedback
          correct={state.lastCorrect}
          answer={question.answer}
          explanation={question.explanation}
          isLast={isLast || state.lives === 0}
          onNext={() => dispatch({ type: 'advance' })}
        />
      )}
    </Card>
  );
}

interface FeedbackProps {
  readonly correct: boolean;
  readonly answer: string;
  readonly explanation: string;
  readonly isLast: boolean;
  readonly onNext: () => void;
}

function Feedback({ correct, answer, explanation, isLast, onNext }: FeedbackProps) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${
          correct
            ? 'border-success/30 bg-success-container text-success'
            : 'border-error/30 bg-error-container text-error'
        }`}
        role="status"
      >
        <Icon name={correct ? 'check_circle' : 'cancel'} className="mt-px text-[20px]" />
        <div>
          <p className="font-semibold">{correct ? 'Sehr gut! 🎉' : 'Achtung! 🦒'}</p>
          {!correct ? (
            <p className="mt-0.5">
              Resposta: <strong>{answer}</strong>
            </p>
          ) : null}
          <p className="mt-0.5 text-ink-soft">{explanation}</p>
        </div>
      </div>
      <Button onClick={onNext} icon={isLast ? 'flag' : 'arrow_forward'} className="self-start">
        {isLast ? 'Ver resultado' : 'Weiter'}
      </Button>
    </div>
  );
}
