import type { PracticeMode } from '@/shared/domain';
import type { WritingTaskType } from '../domain/task-type';

interface TaskTypeLabel {
  readonly part: string;
  readonly name: string;
  readonly icon: string;
  /** Short value used in the URL (?teil=1). */
  readonly slug: string;
}

export const TASK_TYPE_LABELS: Record<WritingTaskType, TaskTypeLabel> = {
  forum_post: { part: 'Teil 1', name: 'Forumsbeitrag', icon: 'forum', slug: '1' },
  formal_email: { part: 'Teil 2', name: 'E-Mail formal', icon: 'mail', slug: '2' },
  short_message: { part: 'Nachricht', name: 'Mensagem curta', icon: 'chat', slug: 'nachricht' },
  form: { part: 'Formular', name: 'Formulário', icon: 'list_alt', slug: 'formular' },
  free_text: { part: 'Texto livre', name: 'Texto livre', icon: 'edit_note', slug: 'livre' },
};

/** The task type a URL slug refers to, or the first available one as a fallback. */
export function taskTypeFromSlug(
  slug: string | null,
  available: readonly WritingTaskType[],
): WritingTaskType {
  const match = available.find((type) => TASK_TYPE_LABELS[type].slug === slug);
  return match ?? available[0] ?? 'forum_post';
}

/** Deep link that reopens one exercise in the right tab (Simulado keeps its exam part, Treino Livre does not). */
export function practicePath(exerciseId: string, taskType: WritingTaskType, mode: PracticeMode): string {
  const params = new URLSearchParams({ modo: mode === 'free' ? 'livre' : 'simulado' });
  if (mode === 'exam') params.set('teil', TASK_TYPE_LABELS[taskType].slug);
  params.set('tema', exerciseId);
  return `/treino?${params.toString()}`;
}
