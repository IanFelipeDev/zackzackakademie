import { isCefrLevel, type CefrLevel } from '@/shared/domain';
import { RepositoryError } from '@/shared/infrastructure/repository-error';
import type { Database } from '@/shared/infrastructure/supabase/database.types';
import type { FlashcardMark } from '../application/ports/flashcard-mark-repository';
import { isMarkStatus } from '../domain/card-status';
import { isExtraKind, isWordType, type ExtraKind, type Flashcard, type WordType } from '../domain/flashcard';

type Tables = Database['public']['Tables'];

export const FLASHCARD_COLUMNS =
  'id, level, category, position, term, translation, synonyms, word_type, extra, extra_kind';

export type FlashcardRow = Pick<
  Tables['flashcards']['Row'],
  | 'id'
  | 'level'
  | 'category'
  | 'position'
  | 'term'
  | 'translation'
  | 'synonyms'
  | 'word_type'
  | 'extra'
  | 'extra_kind'
>;

export const MARK_COLUMNS = 'flashcard_id, status';

export type MarkRow = Pick<Tables['flashcard_marks']['Row'], 'flashcard_id' | 'status'>;

function toLevel(value: string): CefrLevel {
  if (!isCefrLevel(value)) throw new RepositoryError(`Unknown CEFR level: ${value}`);
  return value;
}

function toCategory(value: string): string {
  if (!/^[a-z0-9-]+$/.test(value)) throw new RepositoryError(`Invalid flashcard category: ${value}`);
  return value;
}

function toWordType(value: string | null): WordType | null {
  if (value === null) return null;
  if (!isWordType(value)) throw new RepositoryError(`Unknown flashcard word type: ${value}`);
  return value;
}

function toExtraKind(value: string | null): ExtraKind | null {
  if (value === null) return null;
  if (!isExtraKind(value)) throw new RepositoryError(`Unknown flashcard extra kind: ${value}`);
  return value;
}

export function toFlashcard(row: FlashcardRow): Flashcard {
  return {
    id: row.id,
    level: toLevel(row.level),
    category: toCategory(row.category),
    position: row.position,
    term: row.term,
    translation: row.translation,
    synonyms: row.synonyms,
    wordType: toWordType(row.word_type),
    extra: row.extra,
    extraKind: toExtraKind(row.extra_kind),
  };
}

export function toMark(row: MarkRow): FlashcardMark {
  if (!isMarkStatus(row.status)) throw new RepositoryError(`Unknown flashcard mark status: ${row.status}`);
  return { flashcardId: row.flashcard_id, status: row.status };
}
