import { useState } from 'react';
import { useSignedInUser } from '@/features/auth';
import { Badge, Card, EmptyState, Icon, PageHeader } from '@/shared/ui';
import { readingExamsForLevel } from '../domain/content/catalog';
import { totalQuestions, type ReadingExam } from '../domain/reading-exam';
import { ReadingExamRunner } from './components/reading-exam-runner';
import { useReadingProgress } from './use-reading-progress';

/**
 * Lesen simulators for the signed-in student, scoped to their CEFR level (like the games, ADR-0020). Content is
 * in code, auto-graded in the browser, and the best score per simulator is kept on the device.
 */
export function LesenPage() {
  const user = useSignedInUser();
  const exams = readingExamsForLevel(user.level);
  const progress = useReadingProgress(user.level ?? 'A1');
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = exams.find((exam) => exam.id === activeId) ?? null;

  return (
    <div>
      <PageHeader
        eyebrow={user.level ? `Goethe-Zertifikat ${user.level} · Modul Lesen` : 'Modul Lesen'}
        title="Leitura (Lesen)"
        description="Simulados de leitura no formato oficial do Goethe, com correção automática e gabarito. Seu melhor resultado fica salvo neste dispositivo."
      />
      {exams.length === 0 ? (
        <EmptyState icon="auto_stories" title="Nenhum simulado disponível">
          Os simulados de leitura ainda não foram liberados para o seu nível.
        </EmptyState>
      ) : active ? (
        <ReadingExamRunner
          exam={active}
          onRecord={(correct) => progress.record(active.id, correct)}
          onBack={() => setActiveId(null)}
        />
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {exams.map((exam) => (
            <li key={exam.id}>
              <ExamCard
                exam={exam}
                bestScore={progress.progress[exam.id]}
                onOpen={() => setActiveId(exam.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ExamCard({
  exam,
  bestScore,
  onOpen,
}: {
  exam: ReadingExam;
  bestScore: number | undefined;
  onOpen: () => void;
}) {
  const total = totalQuestions(exam);
  const passed = bestScore !== undefined && bestScore >= exam.passScore;
  return (
    <Card className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xl text-primary">{exam.title}</h2>
        {bestScore !== undefined ? (
          <Badge tone={passed ? 'success' : 'warning'} icon={passed ? 'check_circle' : 'history'}>
            Melhor: {bestScore}/{total}
          </Badge>
        ) : (
          <Badge icon="schedule">Não feito</Badge>
        )}
      </div>
      <p className="text-sm text-ink-soft">
        {exam.parts.length} partes · {total} questões · {exam.minutes} min · aprovação a partir de{' '}
        {exam.passScore}
      </p>
      <button
        type="button"
        onClick={onOpen}
        className="press mt-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-primary-container px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary"
      >
        {bestScore !== undefined ? 'Refazer simulado' : 'Começar simulado'}
        <Icon name="arrow_forward" className="text-[18px]" />
      </button>
    </Card>
  );
}
