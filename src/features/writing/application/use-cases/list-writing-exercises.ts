import type { PracticeMode } from '@/shared/domain';
import type { WritingExercise } from '../../domain/writing-exercise';
import type { ExerciseRepository } from '../ports/exercise-repository';

export class ListWritingExercises {
  constructor(private readonly exercises: ExerciseRepository) {}

  execute(mode: PracticeMode): Promise<WritingExercise[]> {
    return this.exercises.listByMode(mode);
  }
}
