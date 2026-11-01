import { useMemo, useState } from 'react';
import { Badge, Button, Card, Icon } from '@/shared/ui';
import {
  answeredCount,
  gradeReading,
  type QuestionOutcome,
  type ReadingAnswers,
  type ReadingResult,
} from '../../domain/grading';
import {
  optionsForQuestion,
  totalQuestions,
  type ReadingExam,
  type ReadingPart,
  type ReadingQuestion,
} from '../../domain/reading-exam';

interface ReadingExamRunnerProps {
  readonly exam: ReadingExam;
  readonly onRecord: (correct: number) => void;
  readonly onBack: () => void;
}

export function ReadingExamRunner({ exam, onRecord, onBack }: ReadingExamRunnerProps) {
  const [answers, setAnswers] = useState<ReadingAnswers>({});
  const [result, setResult] = useState<ReadingResult | null>(null);
  const total = useMemo(() => totalQuestions(exam), [exam]);
  const answered = answeredCount(answers);
  const outcomes = useMemo(() => {
    if (!result) return null;
    const map = new Map<number, QuestionOutcome>();
    for (const outcome of result.outcomes) map.set(outcome.number, outcome);
    return map;
  }, [result]);

  function set(number: number, value: string) {
    if (result) return;
    setAnswers((current) => ({ ...current, [number]: value }));
  }

  function submit() {
    const graded = gradeReading(exam, answers);
    setResult(graded);
    onRecord(graded.correct);
    globalThis.scrollTo?.({ top: 0, behavior: 'smooth' });
  }

  function retry() {
    setAnswers({});
    setResult(null);
    globalThis.scrollTo?.({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="flex flex-col gap-5">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1 self-start text-sm font-semibold text-primary hover:underline"
      >
        <Icon name="arrow_back" className="text-[18px]" />
        Voltar para os simulados
      </button>

      {result ? (
        <ResultCard exam={exam} result={result} onRetry={retry} />
      ) : (
        <Card className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="rubric text-ink-soft">
              {exam.title} · {exam.minutes} min · aprovação a partir de {exam.passScore}/{total}
            </p>
            <p className="text-sm text-ink-soft">
              Respondidas: <span className="font-semibold text-ink">{answered}</span>/{total}
            </p>
          </div>
          <Button icon="done_all" onClick={submit} disabled={answered === 0}>
            Corrigir e ver nota
          </Button>
        </Card>
      )}

      {exam.parts.map((part) => (
        <PartView key={part.teil} part={part} answers={answers} outcomes={outcomes} onSet={set} />
      ))}

      {!result ? (
        <Button size="lg" icon="done_all" onClick={submit} disabled={answered === 0}>
          Corrigir e ver nota
        </Button>
      ) : (
        <Button size="lg" variant="secondary" icon="replay" onClick={retry}>
          Refazer este simulado
        </Button>
      )}
    </div>
  );
}

function ResultCard({
  exam,
  result,
  onRetry,
}: {
  exam: ReadingExam;
  result: ReadingResult;
  onRetry: () => void;
}) {
  return (
    <Card className="flex flex-col items-center gap-3 text-center">
      <p className="rubric text-ink-soft">Sua nota · {exam.title}</p>
      <p className="font-serif text-6xl leading-none font-bold text-primary">
        {result.correct}
        <span className="text-2xl text-ink-soft"> / {result.total}</span>
      </p>
      <Badge tone={result.passed ? 'success' : 'warning'} icon={result.passed ? 'check_circle' : 'info'}>
        {result.passed
          ? `Aprovado(a)! (mínimo: ${exam.passScore})`
          : `Ainda não passou (mínimo: ${exam.passScore})`}
      </Badge>
      <ul className="flex flex-wrap justify-center gap-2 text-sm">
        {result.perPart.map((part) => (
          <li key={part.teil} className="rounded-lg bg-surface-low px-3 py-1.5">
            <span className="font-semibold">Teil {part.teil}</span>{' '}
            <span className="font-mono text-ink-soft">
              {part.correct}/{part.total}
            </span>
          </li>
        ))}
      </ul>
      <Button variant="secondary" icon="replay" onClick={onRetry}>
        Refazer este simulado
      </Button>
    </Card>
  );
}

function PartView({
  part,
  answers,
  outcomes,
  onSet,
}: {
  part: ReadingPart;
  answers: ReadingAnswers;
  outcomes: Map<number, QuestionOutcome> | null;
  onSet: (number: number, value: string) => void;
}) {
  return (
    <Card className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl text-primary">
          Teil {part.teil}
          {part.title ? <span lang="de"> · {part.title}</span> : null}
        </h2>
        <p lang="de" className="mt-1 text-sm font-semibold text-ink">
          {part.instruction}
        </p>
        {part.hint ? <p className="text-sm text-ink-soft">{part.hint}</p> : null}
      </div>

      {part.texts?.map((text, index) => (
        <div key={text.label ?? index} className="rounded-lg border border-hairline bg-surface-low p-3">
          {text.label ? (
            <p lang="de" className="mb-1 font-semibold text-primary">
              {text.label}
            </p>
          ) : null}
          <p lang="de" className="text-sm whitespace-pre-line text-ink">
            {text.body}
          </p>
        </div>
      ))}

      {part.bank ? (
        <div className="rounded-lg border border-dashed border-hairline bg-surface-lowest p-3">
          <p className="mb-1.5 text-xs font-semibold text-ink-soft">{part.bank.title}</p>
          <ul className="flex flex-col gap-1 text-sm">
            {part.bank.options.map((option) => (
              <li key={option.label} lang="de">
                <span className="font-mono font-bold text-primary">{option.label}</span> {option.text}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <ol className="flex flex-col gap-3">
        {part.questions.map((question) => (
          <QuestionView
            key={question.number}
            part={part}
            question={question}
            value={answers[question.number]}
            outcome={outcomes?.get(question.number) ?? null}
            onSet={onSet}
          />
        ))}
      </ol>
    </Card>
  );
}

function QuestionView({
  part,
  question,
  value,
  outcome,
  onSet,
}: {
  part: ReadingPart;
  question: ReadingQuestion;
  value: string | undefined;
  outcome: QuestionOutcome | null;
  onSet: (number: number, value: string) => void;
}) {
  const options = optionsForQuestion(part, question);
  const tone = outcome ? (outcome.correct ? 'ok' : 'bad') : 'idle';
  const borderClass =
    tone === 'ok'
      ? 'border-success bg-success-container/30'
      : tone === 'bad'
        ? 'border-error bg-error/5'
        : 'border-hairline';

  return (
    <li className={`rounded-lg border p-3 ${borderClass}`}>
      {question.context ? (
        <p lang="de" className="mb-2 rounded bg-surface-high px-3 py-2 text-sm whitespace-pre-line text-ink">
          {question.context}
        </p>
      ) : null}
      <p lang="de" className="mb-2 text-sm font-semibold text-ink">
        <span className="mr-1.5 font-mono text-primary">{question.number}.</span>
        {question.prompt}
      </p>

      {question.choices ? (
        <div className="flex flex-col gap-1.5">
          {options.map((option) => (
            <label
              key={option.label}
              lang="de"
              className="flex cursor-pointer items-start gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-surface-low has-[:checked]:bg-primary-container/10 has-[:checked]:font-semibold"
            >
              <input
                type="radio"
                name={`q${question.number}`}
                value={option.label}
                checked={value === option.label}
                disabled={Boolean(outcome)}
                onChange={() => onSet(question.number, option.label)}
                className="mt-0.5 accent-primary-container"
              />
              <span>{option.text}</span>
            </label>
          ))}
        </div>
      ) : (
        <select
          aria-label={`Resposta ${question.number}`}
          value={value ?? ''}
          disabled={Boolean(outcome)}
          onChange={(event) => onSet(question.number, event.target.value)}
          className="rounded-lg border border-hairline bg-surface-lowest px-3 py-2 font-mono text-base outline-none focus:border-primary-container"
        >
          <option value="">–</option>
          {options.map((option) => (
            <option key={option.label} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {outcome ? (
        <p className={`mt-2 text-sm font-semibold ${outcome.correct ? 'text-success' : 'text-error'}`}>
          {outcome.correct
            ? `✓ Correto (${outcome.answer})`
            : `✗ Correta: ${outcome.answer}${outcome.given ? ` · você: ${outcome.given}` : ' · em branco'}`}
        </p>
      ) : null}
    </li>
  );
}
