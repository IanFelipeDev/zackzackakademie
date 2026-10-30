import { Button, Card, Icon } from '@/shared/ui';
import type { GrammarGame } from '../../domain/grammar-game';
import type { GameProgress } from '../../domain/progress';
import { levelLabel, levelProgressPercent, MAX_STARS } from '../../domain/scoring';
import { totalStars } from '../../domain/progress';
import { Stars, ProgressBar } from './meters';

interface GameHomeProps {
  readonly game: GrammarGame;
  readonly progress: GameProgress;
  readonly onPickTopic: (index: number) => void;
  readonly onReset: () => void;
}

export function GameHome({ game, progress, onPickTopic, onReset }: GameHomeProps) {
  const topicIds = game.topics.map((topic) => topic.id);
  const earned = totalStars(progress, topicIds);
  const possible = game.topics.length * MAX_STARS;

  return (
    <div className="flex flex-col gap-6">
      <Card className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-surface-high text-4xl"
          >
            🦒
          </span>
          <div>
            <p className="font-serif text-xl text-primary">Spiel mit der Giraffe</p>
            <p className="text-sm text-ink-soft">
              Escolha um tema, leia a regra e ganhe estrelas. Errou? A girafa explica.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="inline-flex items-center gap-1 text-primary">
            <Icon name="military_tech" className="text-[18px] text-tertiary" />
            {levelLabel(progress.xp)} · {progress.xp} XP
          </span>
          <span className="inline-flex items-center gap-1 text-ink-soft">
            <Icon name="star" filled className="text-[18px] text-tertiary" />
            {earned}/{possible}
          </span>
        </div>
        <ProgressBar percent={levelProgressPercent(progress.xp)} label="Progresso de nível" />
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        {game.topics.map((topic, index) => (
          <button
            key={topic.id}
            type="button"
            onClick={() => onPickTopic(index)}
            className="flex items-center gap-3 rounded-xl border border-hairline bg-surface-lowest p-4 text-left shadow-paper transition-colors hover:border-primary-container hover:bg-surface-high"
          >
            <span aria-hidden="true" className="text-3xl">
              {topic.icon}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-serif text-lg leading-tight text-primary">{topic.title}</span>
              <Stars value={progress.stars[topic.id] ?? 0} className="mt-1" />
            </span>
            <Icon name="chevron_right" className="text-[22px] text-ink-soft" />
          </button>
        ))}
      </div>

      {progress.xp > 0 || earned > 0 ? (
        <div>
          <Button
            variant="soft"
            size="sm"
            icon="restart_alt"
            onClick={() => {
              if (window.confirm('Apagar todo o progresso deste nível?')) onReset();
            }}
          >
            Zerar progresso
          </Button>
        </div>
      ) : null}
    </div>
  );
}
