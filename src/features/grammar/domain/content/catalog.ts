import type { GrammarSheet } from '../grammar-sheet';
import { GRAMMAR_SHEETS } from './sheets';

export { GRAMMAR_SHEETS };

export function grammarSheetById(id: string): GrammarSheet | undefined {
  return GRAMMAR_SHEETS.find((sheet) => sheet.id === id);
}
