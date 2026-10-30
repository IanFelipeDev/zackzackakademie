import { Button, Card } from '@/shared/ui';
import { levelLabel } from '../../domain/scoring';
import type { RoundSummary } from './quiz-round';
import { Stars } from './meters';

interface RoundResultProps {
  readonly summary: RoundSummary;
  readonly totalXp: number;
  readonly onReplay: () => void;
  readonly onReread: () => void;
  readonly onHome: () => void;
}

export function RoundResult({ summary, totalXp, onReplay, onReread, onHome }: RoundResultProps) {
  const headline = summary.survived ? 'Muito bem!' : 'Ach nein!';
  const message = summary.survived
    ? summary.stars === 3
      ? 'Perfeito! Tema dominado.'
      : 'Boa! Tente de novo para chegar às 3 estrelas.'
    : 'Os corações acabaram. Releia a regra e tente de novo.';

  return (
    <Card className="flex flex-col items-center gap-4 text-center">
      <span
        aria-hidden="true"
        className="grid h-16 w-16 place-items-center rounded-full bg-surface-high text-4xl"
      >
        🦒
      </span>
      <h2 className="font-serif text-2xl text-primary">{headline}</h2>
      <Stars value={summary.stars} className="text-[28px]" />
      <p className="text-ink">
        {summary.correct}/{summary.total} certas · +{summary.xp} XP · {levelLabel(totalXp)}
      </p>
      <p className="max-w-md text-sm text-ink-soft">{message}</p>
      <div className="flex flex-wrap justify-center gap-2">
        <Button icon="replay" onClick={onReplay}>
          Jogar de novo
        </Button>
        <Button variant="secondary" icon="menu_book" onClick={onReread}>
          Reler a regra
        </Button>
        <Button variant="soft" icon="home" onClick={onHome}>
          Início
        </Button>
      </div>
    </Card>
  );
}
