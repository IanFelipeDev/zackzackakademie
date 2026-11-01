import type { CefrLevel } from '@/shared/domain';

/** A topic the teacher noted as frequent in the Hören exam, with its key words or a note. */
export interface HoerenTopic {
  readonly title: string;
  /** A short clue (e.g. what makes the statement true/false). */
  readonly detail?: string;
  /** A longer note (e.g. speaker order and a mnemonic, Teil 3). */
  readonly note?: string;
  readonly keywords?: readonly string[];
}

export interface HoerenGroup {
  readonly label?: string;
  readonly topics: readonly HoerenTopic[];
}

export interface HoerenSection {
  readonly teil: number;
  readonly title: string;
  readonly description?: string;
  readonly groups: readonly HoerenGroup[];
}

export interface HoerenTrainer {
  readonly level: CefrLevel;
  readonly sections: readonly HoerenSection[];
}

export function sectionTopicCount(section: HoerenSection): number {
  return section.groups.reduce((sum, group) => sum + group.topics.length, 0);
}
