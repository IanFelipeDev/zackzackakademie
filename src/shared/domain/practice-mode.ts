/**
 * How a piece of practice is framed (ADR-0017). `exam` is the Simulado: timed, with a word count and Leitpunkte.
 * `free` is the Treino Livre: a low-pressure prompt with none of that. It drives presentation only, never access.
 */
export const PRACTICE_MODES = ['exam', 'free'] as const;

export type PracticeMode = (typeof PRACTICE_MODES)[number];

export function isPracticeMode(value: string): value is PracticeMode {
  return (PRACTICE_MODES as readonly string[]).includes(value);
}
