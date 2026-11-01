import { Link } from 'react-router';
import { useSignedInUser } from '@/features/auth';
import { EmptyState, Icon, PageHeader } from '@/shared/ui';
import { gameForLevel } from '../domain/content/catalog';
import { GrammarGame } from './components/grammar-game';
import { gamesEyebrow } from './game-labels';

/**
 * Grammar games for the signed-in student, scoped to their CEFR level (ADR-0018): each student sees only the
 * "Jogo da Girafa" for their own level, mirroring how the rest of the course content is gated.
 */
export function GamesPage() {
  const user = useSignedInUser();
  const game = gameForLevel(user.level);

  return (
    <div>
      <PageHeader
        eyebrow={gamesEyebrow(user.level)}
        title="Jogos de Gramática"
        description="Treine a gramática do seu nível com a girafa: leia a regra, responda ao desafio e ganhe estrelas. Seu progresso fica salvo neste dispositivo."
      />
      <Link
        to="/regras"
        className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-surface-low px-4 py-2 text-sm font-semibold text-primary hover:bg-surface-high"
      >
        <Icon name="menu_book" className="text-[18px]" />
        Regras de gramática
      </Link>
      {game ? (
        <GrammarGame game={game} />
      ) : (
        <EmptyState icon="sports_esports" title="Nenhum jogo disponível">
          Os jogos de gramática ainda não foram liberados para o seu nível.
        </EmptyState>
      )}
    </div>
  );
}
