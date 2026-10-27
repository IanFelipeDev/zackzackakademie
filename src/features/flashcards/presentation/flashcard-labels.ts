import type { CardStatus } from '../domain/card-status';
import type { ExtraKind, WordType } from '../domain/flashcard';

interface ThemeLabel {
  readonly name: string;
  readonly icon: string;
}

/**
 * Human labels and Material Symbols icons per theme slug (the card's `category`). Covers the nine original B2
 * themes and the A1–A2 themes (ADR-0016). Unknown slugs fall back to a title-cased name via `categoryLabel`.
 */
export const CATEGORY_LABELS: Record<string, ThemeLabel> = {
  // B2 themes (migration 0018).
  work: { name: 'Trabalho e Profissão', icon: 'work' },
  environment: { name: 'Meio Ambiente', icon: 'eco' },
  health: { name: 'Saúde e Estilo de Vida', icon: 'health_and_safety' },
  technology: { name: 'Tecnologia e Mídia', icon: 'devices' },
  education: { name: 'Educação e Família', icon: 'school' },
  housing: { name: 'Moradia e Sociedade', icon: 'home' },
  verbs: { name: 'Verbos e Expressões', icon: 'sync_alt' },
  synonyms: { name: 'Sinônimos e Paráfrases', icon: 'compare_arrows' },
  general: { name: 'Vocabulário Geral', icon: 'abc' },
  // A1–A2 themes (migration 0023).
  familia: { name: 'Família', icon: 'family_restroom' },
  'comida-e-bebida': { name: 'Comida e Bebida', icon: 'restaurant' },
  'casa-e-moveis': { name: 'Casa e Móveis', icon: 'home' },
  'tempo-e-calendario': { name: 'Tempo e Calendário', icon: 'calendar_month' },
  'clima-e-natureza': { name: 'Clima e Natureza', icon: 'partly_cloudy_day' },
  'cidade-e-transporte': { name: 'Cidade e Transporte', icon: 'directions_bus' },
  'corpo-e-saude': { name: 'Corpo e Saúde', icon: 'medical_services' },
  'trabalho-e-estudo': { name: 'Trabalho e Estudo', icon: 'work' },
  'compras-e-dinheiro': { name: 'Compras e Dinheiro', icon: 'payments' },
  'verbos-regulares': { name: 'Verbos regulares', icon: 'check_circle' },
  'verbos-irregulares': { name: 'Verbos irregulares', icon: 'flash_on' },
  'verbos-separaveis': { name: 'Verbos separáveis', icon: 'content_cut' },
  'verbos-reflexivos': { name: 'Verbos reflexivos', icon: 'flip_camera_android' },
  'verbos-com-preposicao': { name: 'Verbos com preposição', icon: 'link' },
  adjetivos: { name: 'Adjetivos', icon: 'palette' },
  cores: { name: 'Cores', icon: 'gradient' },
  'adverbios-e-tempo': { name: 'Advérbios e tempo', icon: 'schedule' },
  'conectores-e-preposicoes': { name: 'Conectores e preposições', icon: 'link' },
  cumprimentos: { name: 'Cumprimentos', icon: 'waving_hand' },
  'no-restaurante': { name: 'No restaurante', icon: 'local_dining' },
  direcoes: { name: 'Direções', icon: 'explore' },
  'saude-e-clima': { name: 'Saúde e clima', icon: 'thermostat' },
  'na-aula-e-no-dia-a-dia': { name: 'Na aula e no dia a dia', icon: 'backpack' },
  'profissoes-e-pessoas': { name: 'Profissões e Pessoas', icon: 'badge' },
  'paises-e-idiomas': { name: 'Países e Idiomas', icon: 'public' },
  'utensilios-de-cozinha': { name: 'Utensílios de cozinha', icon: 'restaurant_menu' },
  animais: { name: 'Animais', icon: 'pets' },
  roupas: { name: 'Roupas', icon: 'apparel' },
  'verbos-modais': { name: 'Verbos modais', icon: 'bolt' },
  'verbos-inseparaveis': { name: 'Verbos inseparáveis', icon: 'extension' },
  'posicao-acao-estado': { name: 'Posição: ação × estado', icon: 'place' },
  'adverbios-a2': { name: 'Advérbios A2', icon: 'more_time' },
  'palavras-interrogativas': { name: 'Palavras interrogativas', icon: 'help' },
  'preposicoes-basicas': { name: 'Preposições básicas', icon: 'push_pin' },
  compras: { name: 'Compras', icon: 'shopping_bag' },
};

/** Label + icon for a theme slug, with a readable fallback for any slug not in CATEGORY_LABELS. */
export function categoryLabel(slug: string): ThemeLabel {
  const known = CATEGORY_LABELS[slug];
  if (known) return known;
  const name = slug
    .split('-')
    .map((part) => (part ? part[0]!.toUpperCase() + part.slice(1) : part))
    .join(' ');
  return { name, icon: 'style' };
}

/** Part-of-speech labels for the A1–A2 word-type filter. */
export const WORD_TYPE_LABELS: Record<WordType, ThemeLabel> = {
  noun: { name: 'Substantivos', icon: 'label' },
  verb: { name: 'Verbos', icon: 'sync_alt' },
  adjective: { name: 'Adjetivos', icon: 'palette' },
  adverb: { name: 'Advérbios', icon: 'schedule' },
  connector: { name: 'Conectores', icon: 'link' },
  phrase: { name: 'Frases', icon: 'chat' },
};

/** Short pt-BR label for the grammatical extra shown on the back of a card. */
export const EXTRA_KIND_LABELS: Record<ExtraKind, string> = {
  plural: 'Plural',
  perfekt: 'Perfekt',
  case: 'Caso',
};

interface StatusLabel {
  readonly one: string;
  readonly many: string;
  readonly icon: string;
  readonly tone: 'neutral' | 'warning' | 'success';
}

/** Status names from the teacher's plan: Não feito, A revisar, Realizado. */
export const STATUS_LABELS: Record<CardStatus, StatusLabel> = {
  new: { one: 'Não feito', many: 'Não feitos', icon: 'radio_button_unchecked', tone: 'neutral' },
  review: { one: 'A revisar', many: 'A revisar', icon: 'replay', tone: 'warning' },
  known: { one: 'Realizado', many: 'Realizados', icon: 'check_circle', tone: 'success' },
};
