/**
 * Schreiben task formats. `forum_post` (Goethe B2 Teil 1) and `formal_email` (Teil 2) are the exam formats; `form`
 * and `short_message` cover the A1/A2 Simulado (fill a form, write a short message); `free_text` is the open
 * Treino Livre prompt (ADR-0017).
 */
export const WRITING_TASK_TYPES = [
  'forum_post',
  'formal_email',
  'short_message',
  'form',
  'free_text',
] as const;

export type WritingTaskType = (typeof WRITING_TASK_TYPES)[number];

export function isWritingTaskType(value: string): value is WritingTaskType {
  return (WRITING_TASK_TYPES as readonly string[]).includes(value);
}
