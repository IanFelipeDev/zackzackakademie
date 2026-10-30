/**
 * Normalize an answer the way the original trainer did: lower-cased, punctuation stripped, umlauts and ß
 * transliterated and whitespace collapsed. This lets "Fußball" match "fussball" and ignores trailing dots,
 * so learners are not failed for cosmetic differences.
 */
export function normalizeAnswer(value: string): string {
  return value
    .toLowerCase()
    .replace(/[.,!?]/g, '')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isCorrect(expected: string, given: string): boolean {
  return normalizeAnswer(expected) === normalizeAnswer(given);
}
