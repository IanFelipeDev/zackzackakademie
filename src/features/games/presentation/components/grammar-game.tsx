import { useCallback, useState } from 'react';
import type { GrammarGame } from '../../domain/grammar-game';
import { useGameProgress } from '../use-game-progress';
import { GameHome } from './game-home';
import { QuizRound, type RoundSummary } from './quiz-round';
import { RoundResult } from './round-result';
import { TopicRule } from './topic-rule';

type View =
  | { readonly screen: 'home' }
  | { readonly screen: 'rule'; readonly topicIndex: number }
  | { readonly screen: 'quiz'; readonly topicIndex: number }
  | { readonly screen: 'result'; readonly topicIndex: number; readonly summary: RoundSummary };

/** The playable "Jogo da Girafa" for one level: home → rule → quiz → result, with local progress. */
export function GrammarGame({ game }: { game: GrammarGame }) {
  const { progress, record, reset } = useGameProgress(game.level);
  const [view, setView] = useState<View>({ screen: 'home' });

  const goHome = useCallback(() => setView({ screen: 'home' }), []);

  const handleFinish = useCallback(
    (summary: RoundSummary) => {
      setView((current) => {
        if (current.screen !== 'quiz') return current;
        const topic = game.topics[current.topicIndex];
        if (topic) record(topic.id, summary.xp, summary.stars);
        return { screen: 'result', topicIndex: current.topicIndex, summary };
      });
    },
    [game.topics, record],
  );

  if (view.screen === 'home') {
    return (
      <GameHome
        game={game}
        progress={progress}
        onPickTopic={(topicIndex) => setView({ screen: 'rule', topicIndex })}
        onReset={reset}
      />
    );
  }

  const topic = game.topics[view.topicIndex];
  if (!topic) return null;

  if (view.screen === 'rule') {
    return (
      <TopicRule
        topic={topic}
        onBack={goHome}
        onStart={() => setView({ screen: 'quiz', topicIndex: view.topicIndex })}
      />
    );
  }

  if (view.screen === 'quiz') {
    return <QuizRound topic={topic} onFinish={handleFinish} onExit={goHome} />;
  }

  return (
    <RoundResult
      summary={view.summary}
      totalXp={progress.xp}
      onReplay={() => setView({ screen: 'quiz', topicIndex: view.topicIndex })}
      onReread={() => setView({ screen: 'rule', topicIndex: view.topicIndex })}
      onHome={goHome}
    />
  );
}
