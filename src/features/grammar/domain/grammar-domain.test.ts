import { describe, expect, it } from 'vitest';
import { GRAMMAR_SHEETS, grammarSheetById } from './content/catalog';
import { sheetEntryCount } from './grammar-sheet';

describe('grammar reference sheets', () => {
  it('has the gender and verb-preposition sheets with unique ids', () => {
    const ids = GRAMMAR_SHEETS.map((sheet) => sheet.id);
    expect(ids).toContain('genero');
    expect(ids).toContain('verben-praeposition');
    expect(new Set(ids).size).toBe(ids.length);
    expect(grammarSheetById('genero')?.title).toMatch(/der\/die\/das/);
    expect(grammarSheetById('missing')).toBeUndefined();
  });

  it('has non-empty groups with titled entries', () => {
    for (const sheet of GRAMMAR_SHEETS) {
      expect(sheetEntryCount(sheet)).toBeGreaterThan(0);
      for (const group of sheet.groups) {
        expect(group.label.length).toBeGreaterThan(0);
        expect(group.entries.length).toBeGreaterThan(0);
        for (const entry of group.entries) {
          expect(entry.term.length).toBeGreaterThan(0);
        }
      }
    }
  });
});
