import type { PracticeMode } from '@/shared/domain';
import type { WritingExercise } from '../../domain/writing-exercise';

export interface ExerciseRepository {
  /** Published exercises of a practice mode visible to the current user, ordered by position. */
  listByMode(mode: PracticeMode): Promise<WritingExercise[]>;
  findById(id: string): Promise<WritingExercise | null>;
}
