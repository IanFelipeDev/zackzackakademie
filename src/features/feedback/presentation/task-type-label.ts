import type { ReviewTaskType } from '../application/read-models';

export const REVIEW_TASK_LABELS: Record<ReviewTaskType, string> = {
  forum_post: 'Teil 1 · Forumsbeitrag',
  formal_email: 'Teil 2 · E-Mail formal',
  short_message: 'Nachricht · Mensagem curta',
  form: 'Formular · Formulário',
  free_text: 'Treino Livre · Texto livre',
};
