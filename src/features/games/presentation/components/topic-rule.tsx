import { Button, Card } from '@/shared/ui';
import type { GrammarTopic } from '../../domain/grammar-game';

interface TopicRuleProps {
  readonly topic: GrammarTopic;
  readonly onStart: () => void;
  readonly onBack: () => void;
}

export function TopicRule({ topic, onStart, onBack }: TopicRuleProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Button variant="soft" size="sm" icon="arrow_back" onClick={onBack}>
          Voltar
        </Button>
        <h2 className="flex items-center gap-2 font-serif text-2xl text-primary">
          <span aria-hidden="true">{topic.icon}</span>
          {topic.title}
        </h2>
      </div>
      <Card tone="inset">
        {/* Rules carry intentional line breaks; keep them. */}
        <p className="rubric mb-2 text-primary">🦒 Achtung! Leia a regra com calma</p>
        <p className="whitespace-pre-line leading-relaxed text-ink">{topic.rule}</p>
      </Card>
      <div>
        <Button icon="play_arrow" onClick={onStart}>
          Começar o desafio
        </Button>
      </div>
    </div>
  );
}
