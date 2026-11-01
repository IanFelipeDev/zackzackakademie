/** One row in a reference sheet: a German word or verb and its details. */
export interface GrammarEntry {
  readonly term: string;
  /** A short marker, e.g. the gender (der/die/das) or the case (Akk/Dat). */
  readonly tag?: string;
  readonly translation?: string;
  readonly example?: string;
  /** The rule the entry illustrates (gender sheet). */
  readonly note?: string;
}

export interface GrammarGroup {
  readonly label: string;
  readonly sublabel?: string;
  readonly entries: readonly GrammarEntry[];
}

/** A grammar reference sheet (gender rules, verbs with fixed prepositions…). */
export interface GrammarSheet {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly groups: readonly GrammarGroup[];
}

export function sheetEntryCount(sheet: GrammarSheet): number {
  return sheet.groups.reduce((sum, group) => sum + group.entries.length, 0);
}
