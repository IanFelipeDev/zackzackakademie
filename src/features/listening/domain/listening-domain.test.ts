import { describe, expect, it } from 'vitest';
import { ALL_HOEREN_TRAINERS, hoerenForLevel } from './content/catalog';
import { sectionTopicCount } from './hoeren';

describe('listening content', () => {
  it('gates the Hören trainer by level (B2 only for now)', () => {
    expect(hoerenForLevel('B2')?.level).toBe('B2');
    expect(hoerenForLevel('A1')).toBeNull();
    expect(hoerenForLevel(null)).toBeNull();
  });

  it('has four non-empty Teil sections with titled topics', () => {
    for (const trainer of ALL_HOEREN_TRAINERS) {
      expect(trainer.sections.map((s) => s.teil)).toEqual([1, 2, 3, 4]);
      for (const section of trainer.sections) {
        expect(sectionTopicCount(section)).toBeGreaterThan(0);
        for (const group of section.groups) {
          for (const topic of group.topics) {
            expect(topic.title.length).toBeGreaterThan(0);
          }
        }
      }
    }
  });
});
