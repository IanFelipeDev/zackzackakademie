// Generated from the teacher's grammar reference HTML (ADR-0024). Do not edit by hand; regenerate with
// scratchpad/gen-grammar.cjs.
import type { GrammarSheet } from '../grammar-sheet';

export const GRAMMAR_SHEETS: readonly GrammarSheet[] = [
  {
    id: 'genero',
    title: 'Gênero dos substantivos (der/die/das)',
    description: 'Regras e grupos que ajudam a adivinhar o artigo de um substantivo, com exemplos.',
    icon: 'wc',
    groups: [
      {
        label: 'der',
        sublabel: 'masculino',
        entries: [
          {
            term: 'Mann',
            tag: 'der',
            note: 'ser biológico masculino',
          },
          {
            term: 'Vater',
            tag: 'der',
            note: 'ser biológico masculino',
          },
          {
            term: 'Onkel',
            tag: 'der',
            note: 'ser biológico masculino',
          },
          {
            term: 'Dienstag',
            tag: 'der',
            note: 'dia da semana',
          },
          {
            term: 'Mittag',
            tag: 'der',
            note: 'parte do dia',
          },
          {
            term: 'Mai',
            tag: 'der',
            note: 'mês',
          },
          {
            term: 'Dezember',
            tag: 'der',
            note: 'mês',
          },
          {
            term: 'Winter',
            tag: 'der',
            note: 'estação do ano',
          },
          {
            term: 'Sommer',
            tag: 'der',
            note: 'estação do ano',
          },
          {
            term: 'Herbst',
            tag: 'der',
            note: 'estação do ano',
          },
          {
            term: 'Norden',
            tag: 'der',
            note: 'ponto cardeal',
          },
          {
            term: 'Süden',
            tag: 'der',
            note: 'ponto cardeal',
          },
          {
            term: 'Regen',
            tag: 'der',
            note: 'fenômeno natural',
          },
          {
            term: 'Nebel',
            tag: 'der',
            note: 'fenômeno natural',
          },
          {
            term: 'Sturm',
            tag: 'der',
            note: 'fenômeno natural',
          },
          {
            term: 'Schnee',
            tag: 'der',
            note: 'fenômeno natural',
          },
          {
            term: 'Wein',
            tag: 'der',
            note: 'bebida alcoólica',
          },
          {
            term: 'Wodka',
            tag: 'der',
            note: 'bebida alcoólica',
          },
          {
            term: 'Whisky',
            tag: 'der',
            note: 'bebida alcoólica',
          },
          {
            term: 'Präsident',
            tag: 'der',
            note: 'terminação -ent',
          },
          {
            term: 'Student',
            tag: 'der',
            note: 'terminação -ent',
          },
          {
            term: 'Demonstrant',
            tag: 'der',
            note: 'terminação -ant',
          },
          {
            term: 'Polizist',
            tag: 'der',
            note: 'terminação -ist',
          },
          {
            term: 'Journalist',
            tag: 'der',
            note: 'terminação -ist',
          },
          {
            term: 'Optimist',
            tag: 'der',
            note: 'terminação -ist',
          },
          {
            term: 'Kommunismus',
            tag: 'der',
            note: 'terminação -ismus',
          },
          {
            term: 'Buddhismus',
            tag: 'der',
            note: 'terminação -ismus',
          },
          {
            term: 'Motor',
            tag: 'der',
            note: 'terminação -or',
          },
          {
            term: 'Faktor',
            tag: 'der',
            note: 'terminação -or',
          },
          {
            term: 'Schmetterling',
            tag: 'der',
            note: 'terminação -ling',
          },
          {
            term: 'Säugling',
            tag: 'der',
            note: 'terminação -ling',
          },
          {
            term: 'Lehrer',
            tag: 'der',
            note: 'terminação -er (agente)',
          },
          {
            term: 'Bäcker',
            tag: 'der',
            note: 'terminação -er (agente)',
          },
          {
            term: 'Schüler',
            tag: 'der',
            note: 'terminação -er (agente)',
          },
          {
            term: 'Apfel',
            tag: 'der',
            note: 'exceção: fruta masculina',
          },
          {
            term: 'Pfirsich',
            tag: 'der',
            note: 'exceção: fruta masculina',
          },
          {
            term: 'Name',
            tag: 'der',
            note: 'exceção: N-Deklination',
          },
          {
            term: 'Moment',
            tag: 'der',
            note: 'exceção da terminação -ment',
          },
          {
            term: 'Reichtum',
            tag: 'der',
            note: 'exceção da terminação -tum',
          },
        ],
      },
      {
        label: 'die',
        sublabel: 'feminino',
        entries: [
          {
            term: 'Frau',
            tag: 'die',
            note: 'ser biológico feminino',
          },
          {
            term: 'Mutter',
            tag: 'die',
            note: 'ser biológico feminino',
          },
          {
            term: 'Tante',
            tag: 'die',
            note: 'ser biológico feminino',
          },
          {
            term: 'Million',
            tag: 'die',
            note: 'número',
          },
          {
            term: 'Tausend',
            tag: 'die',
            note: 'número',
          },
          {
            term: 'Drei',
            tag: 'die',
            note: 'número',
          },
          {
            term: 'Birne',
            tag: 'die',
            note: 'fruta',
          },
          {
            term: 'Banane',
            tag: 'die',
            note: 'fruta',
          },
          {
            term: 'Traube',
            tag: 'die',
            note: 'fruta',
          },
          {
            term: 'Rose',
            tag: 'die',
            note: 'flor',
          },
          {
            term: 'Tulpe',
            tag: 'die',
            note: 'flor',
          },
          {
            term: 'Eiche',
            tag: 'die',
            note: 'árvore/planta',
          },
          {
            term: 'Lehrerin',
            tag: 'die',
            note: 'terminação -in',
          },
          {
            term: 'Polizistin',
            tag: 'die',
            note: 'terminação -in',
          },
          {
            term: 'Präsidentin',
            tag: 'die',
            note: 'terminação -in',
          },
          {
            term: 'Musik',
            tag: 'die',
            note: 'terminação -ik',
          },
          {
            term: 'Physik',
            tag: 'die',
            note: 'terminação -ik',
          },
          {
            term: 'Mathematik',
            tag: 'die',
            note: 'terminação -ik',
          },
          {
            term: 'Aktion',
            tag: 'die',
            note: 'terminação -ion',
          },
          {
            term: 'Diskussion',
            tag: 'die',
            note: 'terminação -ion',
          },
          {
            term: 'Revolution',
            tag: 'die',
            note: 'terminação -ion',
          },
          {
            term: 'Universität',
            tag: 'die',
            note: 'terminação -tät',
          },
          {
            term: 'Qualität',
            tag: 'die',
            note: 'terminação -tät',
          },
          {
            term: 'Realität',
            tag: 'die',
            note: 'terminação -tät',
          },
          {
            term: 'Freiheit',
            tag: 'die',
            note: 'terminação -heit',
          },
          {
            term: 'Einheit',
            tag: 'die',
            note: 'terminação -heit',
          },
          {
            term: 'Möglichkeit',
            tag: 'die',
            note: 'terminação -keit',
          },
          {
            term: 'Freundschaft',
            tag: 'die',
            note: 'terminação -schaft',
          },
          {
            term: 'Nachbarschaft',
            tag: 'die',
            note: 'terminação -schaft',
          },
          {
            term: 'Heizung',
            tag: 'die',
            note: 'terminação -ung',
          },
          {
            term: 'Überraschung',
            tag: 'die',
            note: 'terminação -ung',
          },
          {
            term: 'Umgebung',
            tag: 'die',
            note: 'terminação -ung',
          },
          {
            term: 'Bäckerei',
            tag: 'die',
            note: 'terminação -ei',
          },
          {
            term: 'Metzgerei',
            tag: 'die',
            note: 'terminação -ei',
          },
          {
            term: 'Wäscherei',
            tag: 'die',
            note: 'terminação -ei',
          },
          {
            term: 'Lampe',
            tag: 'die',
            note: 'terminação -e',
          },
          {
            term: 'Hose',
            tag: 'die',
            note: 'terminação -e',
          },
          {
            term: 'Reise',
            tag: 'die',
            note: 'terminação -e',
          },
          {
            term: 'Tochter',
            tag: 'die',
            note: 'exceção: -er feminina',
          },
          {
            term: 'Schwester',
            tag: 'die',
            note: 'exceção: -er feminina',
          },
        ],
      },
      {
        label: 'das',
        sublabel: 'neutro',
        entries: [
          {
            term: 'Essen',
            tag: 'das',
            note: 'verbo infinitivo substantivado',
          },
          {
            term: 'Schwimmen',
            tag: 'das',
            note: 'verbo infinitivo substantivado',
          },
          {
            term: 'Schreiben',
            tag: 'das',
            note: 'verbo infinitivo substantivado',
          },
          {
            term: 'Mädchen',
            tag: 'das',
            note: 'diminutivo -chen',
          },
          {
            term: 'Brötchen',
            tag: 'das',
            note: 'diminutivo -chen',
          },
          {
            term: 'Fräulein',
            tag: 'das',
            note: 'diminutivo -lein',
          },
          {
            term: 'Baby',
            tag: 'das',
            note: 'ser jovem',
          },
          {
            term: 'Kind',
            tag: 'das',
            note: 'ser jovem',
          },
          {
            term: 'Lamm',
            tag: 'das',
            note: 'ser jovem',
          },
          {
            term: 'Gold',
            tag: 'das',
            note: 'material',
          },
          {
            term: 'Silber',
            tag: 'das',
            note: 'material',
          },
          {
            term: 'Holz',
            tag: 'das',
            note: 'material',
          },
          {
            term: 'Blau',
            tag: 'das',
            note: 'cor',
          },
          {
            term: 'Rot',
            tag: 'das',
            note: 'cor',
          },
          {
            term: 'Grün',
            tag: 'das',
            note: 'cor',
          },
          {
            term: 'Drittel',
            tag: 'das',
            note: 'fração',
          },
          {
            term: 'Viertel',
            tag: 'das',
            note: 'fração',
          },
          {
            term: 'Fünftel',
            tag: 'das',
            note: 'fração',
          },
          {
            term: 'Instrument',
            tag: 'das',
            note: 'terminação -ment',
          },
          {
            term: 'Element',
            tag: 'das',
            note: 'terminação -ment',
          },
          {
            term: 'Museum',
            tag: 'das',
            note: 'terminação -um',
          },
          {
            term: 'Zentrum',
            tag: 'das',
            note: 'terminação -um',
          },
          {
            term: 'Thema',
            tag: 'das',
            note: 'terminação -ma',
          },
          {
            term: 'Klima',
            tag: 'das',
            note: 'terminação -ma',
          },
          {
            term: 'Drama',
            tag: 'das',
            note: 'terminação -ma',
          },
          {
            term: 'Eigentum',
            tag: 'das',
            note: 'terminação -tum',
          },
          {
            term: 'Brauchtum',
            tag: 'das',
            note: 'terminação -tum',
          },
          {
            term: 'Bier',
            tag: 'das',
            note: 'exceção: bebida neutra',
          },
          {
            term: 'Wasser',
            tag: 'das',
            note: 'exceção: -er neutra',
          },
          {
            term: 'Fenster',
            tag: 'das',
            note: 'exceção: -er neutra',
          },
          {
            term: 'Wetter',
            tag: 'das',
            note: 'exceção: -er neutra',
          },
          {
            term: 'Messer',
            tag: 'das',
            note: 'exceção: -er neutra',
          },
        ],
      },
    ],
  },
  {
    id: 'verben-praeposition',
    title: 'Verbos com preposição fixa',
    description:
      'Verbos que pedem sempre a mesma preposição, agrupados por preposição, com o caso e um exemplo.',
    icon: 'link',
    groups: [
      {
        label: 'an',
        entries: [
          {
            term: 'denken',
            tag: 'Akk',
            translation: 'pensar em',
            example: 'Ich denke oft an dich.',
          },
          {
            term: 'sich erinnern',
            tag: 'Akk',
            translation: 'lembrar-se de',
            example: 'Erinnerst du dich an ihn?',
          },
          {
            term: 'sich gewöhnen',
            tag: 'Akk',
            translation: 'acostumar-se com',
            example: 'Ich gewöhne mich an das Wetter.',
          },
          {
            term: 'glauben',
            tag: 'Akk',
            translation: 'acreditar em',
            example: 'Sie glaubt an Gott.',
          },
          {
            term: 'sich wenden',
            tag: 'Akk',
            translation: 'dirigir-se a',
            example: 'Wenden Sie sich an das Sekretariat.',
          },
          {
            term: 'teilnehmen',
            tag: 'Dat',
            translation: 'participar de',
            example: 'Ich nehme an dem Kurs teil.',
          },
          {
            term: 'leiden',
            tag: 'Dat',
            translation: 'sofrer de',
            example: 'Er leidet an einer Krankheit.',
          },
          {
            term: 'zweifeln',
            tag: 'Dat',
            translation: 'duvidar de',
            example: 'Ich zweifle an seiner Ehrlichkeit.',
          },
          {
            term: 'sterben',
            tag: 'Dat',
            translation: 'morrer de',
            example: 'Er ist an Krebs gestorben.',
          },
          {
            term: 'arbeiten',
            tag: 'Dat',
            translation: 'trabalhar em (projeto)',
            example: 'Wir arbeiten an einem Projekt.',
          },
          {
            term: 'erkennen',
            tag: 'Dat',
            translation: 'reconhecer por',
            example: 'Man erkennt ihn an der Stimme.',
          },
        ],
      },
      {
        label: 'auf',
        entries: [
          {
            term: 'warten',
            tag: 'Akk',
            translation: 'esperar por',
            example: 'Ich warte auf den Bus.',
          },
          {
            term: 'sich freuen',
            tag: 'Akk',
            translation: 'alegrar-se com (futuro)',
            example: 'Ich freue mich auf die Reise.',
          },
          {
            term: 'sich vorbereiten',
            tag: 'Akk',
            translation: 'preparar-se para',
            example: 'Sie bereitet sich auf die Prüfung vor.',
          },
          {
            term: 'verzichten',
            tag: 'Akk',
            translation: 'renunciar a',
            example: 'Er verzichtet auf Alkohol.',
          },
          {
            term: 'sich verlassen',
            tag: 'Akk',
            translation: 'confiar em',
            example: 'Ich verlasse mich auf dich.',
          },
          {
            term: 'achten',
            tag: 'Akk',
            translation: 'prestar atenção em',
            example: 'Achte auf die Straße!',
          },
          {
            term: 'hoffen',
            tag: 'Akk',
            translation: 'ter esperança em',
            example: 'Wir hoffen auf gutes Wetter.',
          },
          {
            term: 'reagieren',
            tag: 'Akk',
            translation: 'reagir a',
            example: 'Sie reagierte auf die Frage nicht.',
          },
          {
            term: 'sich konzentrieren',
            tag: 'Akk',
            translation: 'concentrar-se em',
            example: 'Konzentrier dich auf die Arbeit.',
          },
          {
            term: 'stolz sein',
            tag: 'Akk',
            translation: 'orgulhar-se de',
            example: 'Ich bin stolz auf dich.',
          },
          {
            term: 'bestehen',
            tag: 'Dat',
            translation: 'insistir em',
            example: 'Er besteht auf seiner Meinung.',
          },
        ],
      },
      {
        label: 'für',
        entries: [
          {
            term: 'sich interessieren',
            tag: 'Akk',
            translation: 'interessar-se por',
            example: 'Ich interessiere mich für Musik.',
          },
          {
            term: 'sich entscheiden',
            tag: 'Akk',
            translation: 'decidir-se por',
            example: 'Wir haben uns für dieses Haus entschieden.',
          },
          {
            term: 'sich bedanken',
            tag: 'Akk',
            translation: 'agradecer por',
            example: 'Ich bedanke mich für die Hilfe.',
          },
          {
            term: 'sich entschuldigen',
            tag: 'Akk',
            translation: 'desculpar-se por',
            example: 'Entschuldige dich für den Fehler.',
          },
          {
            term: 'sorgen',
            tag: 'Akk',
            translation: 'cuidar de / providenciar',
            example: 'Sie sorgt für ihre Familie.',
          },
          {
            term: 'kämpfen',
            tag: 'Akk',
            translation: 'lutar por',
            example: 'Sie kämpfen für ihre Rechte.',
          },
          {
            term: 'sich schämen',
            tag: 'Akk',
            translation: 'envergonhar-se por',
            example: 'Er schämt sich für sein Verhalten.',
          },
          {
            term: 'halten',
            tag: 'Akk',
            translation: 'considerar como',
            example: 'Ich halte ihn für ehrlich.',
          },
        ],
      },
      {
        label: 'um',
        entries: [
          {
            term: 'bitten',
            tag: 'Akk',
            translation: 'pedir por',
            example: 'Ich bitte um Verzeihung.',
          },
          {
            term: 'sich kümmern',
            tag: 'Akk',
            translation: 'cuidar de',
            example: 'Sie kümmert sich um die Kinder.',
          },
          {
            term: 'sich bemühen',
            tag: 'Akk',
            translation: 'esforçar-se por',
            example: 'Er bemüht sich um eine Lösung.',
          },
          {
            term: 'es geht',
            tag: 'Akk',
            translation: 'trata-se de',
            example: 'Es geht um dein Leben.',
          },
          {
            term: 'sich streiten',
            tag: 'Akk',
            translation: 'brigar por',
            example: 'Sie streiten sich um das Erbe.',
          },
          {
            term: 'beneiden',
            tag: 'Akk',
            translation: 'invejar por',
            example: 'Ich beneide dich um dein Glück.',
          },
        ],
      },
      {
        label: 'über',
        entries: [
          {
            term: 'sich freuen',
            tag: 'Akk',
            translation: 'alegrar-se com (já ocorrido)',
            example: 'Ich freue mich über das Geschenk.',
          },
          {
            term: 'sich ärgern',
            tag: 'Akk',
            translation: 'irritar-se com',
            example: 'Er ärgert sich über den Lärm.',
          },
          {
            term: 'sich beschweren',
            tag: 'Akk',
            translation: 'reclamar sobre',
            example: 'Sie beschwert sich über das Essen.',
          },
          {
            term: 'sich wundern',
            tag: 'Akk',
            translation: 'espantar-se com',
            example: 'Ich wundere mich über seine Reaktion.',
          },
          {
            term: 'diskutieren',
            tag: 'Akk',
            translation: 'discutir sobre',
            example: 'Wir diskutieren über Politik.',
          },
          {
            term: 'nachdenken',
            tag: 'Akk',
            translation: 'refletir sobre',
            example: 'Denk über die Frage nach.',
          },
          {
            term: 'sprechen',
            tag: 'Akk',
            translation: 'falar sobre',
            example: 'Wir sprechen über das Wetter.',
          },
          {
            term: 'sich informieren',
            tag: 'Akk',
            translation: 'informar-se sobre',
            example: 'Ich informiere mich über den Kurs.',
          },
          {
            term: 'lachen',
            tag: 'Akk',
            translation: 'rir de',
            example: 'Alle lachen über den Witz.',
          },
          {
            term: 'klagen',
            tag: 'Akk',
            translation: 'queixar-se de',
            example: 'Er klagt über Schmerzen.',
          },
        ],
      },
      {
        label: 'mit',
        entries: [
          {
            term: 'sprechen',
            tag: 'Dat',
            translation: 'falar com',
            example: 'Ich spreche mit meinem Chef.',
          },
          {
            term: 'sich beschäftigen',
            tag: 'Dat',
            translation: 'ocupar-se com',
            example: 'Sie beschäftigt sich mit Kunst.',
          },
          {
            term: 'rechnen',
            tag: 'Dat',
            translation: 'contar com',
            example: 'Ich rechne mit deiner Hilfe.',
          },
          {
            term: 'übereinstimmen',
            tag: 'Dat',
            translation: 'concordar com',
            example: 'Das stimmt mit meiner Meinung überein.',
          },
          {
            term: 'aufhören',
            tag: 'Dat',
            translation: 'parar de / com',
            example: 'Hör auf mit dem Lärm!',
          },
          {
            term: 'anfangen',
            tag: 'Dat',
            translation: 'começar com',
            example: 'Wir fangen mit der Arbeit an.',
          },
          {
            term: 'sich streiten',
            tag: 'Dat',
            translation: 'brigar com',
            example: 'Er streitet sich mit seinem Bruder.',
          },
          {
            term: 'vergleichen',
            tag: 'Dat',
            translation: 'comparar com',
            example: 'Vergleich das nicht mit früher.',
          },
        ],
      },
      {
        label: 'nach',
        entries: [
          {
            term: 'fragen',
            tag: 'Dat',
            translation: 'perguntar por',
            example: 'Er fragt nach dem Weg.',
          },
          {
            term: 'sich sehnen',
            tag: 'Dat',
            translation: 'ansiar por',
            example: 'Ich sehne mich nach Ruhe.',
          },
          {
            term: 'riechen',
            tag: 'Dat',
            translation: 'cheirar a',
            example: 'Es riecht nach Kaffee.',
          },
          {
            term: 'schmecken',
            tag: 'Dat',
            translation: 'ter gosto de',
            example: 'Das schmeckt nach Zimt.',
          },
          {
            term: 'suchen',
            tag: 'Dat',
            translation: 'procurar por',
            example: 'Wir suchen nach einer Lösung.',
          },
        ],
      },
      {
        label: 'von',
        entries: [
          {
            term: 'abhängen',
            tag: 'Dat',
            translation: 'depender de',
            example: 'Das hängt von dir ab.',
          },
          {
            term: 'sich verabschieden',
            tag: 'Dat',
            translation: 'despedir-se de',
            example: 'Ich verabschiede mich von euch.',
          },
          {
            term: 'träumen',
            tag: 'Dat',
            translation: 'sonhar com',
            example: 'Sie träumt von einer Reise.',
          },
          {
            term: 'erzählen',
            tag: 'Dat',
            translation: 'contar sobre',
            example: 'Erzähl mir von deinem Urlaub.',
          },
          {
            term: 'sich unterscheiden',
            tag: 'Dat',
            translation: 'diferenciar-se de',
            example: 'Das unterscheidet sich von dem anderen.',
          },
          {
            term: 'profitieren',
            tag: 'Dat',
            translation: 'beneficiar-se de',
            example: 'Wir profitieren von der Erfahrung.',
          },
          {
            term: 'leben',
            tag: 'Dat',
            translation: 'viver de',
            example: 'Er lebt von seiner Kunst.',
          },
          {
            term: 'halten',
            tag: 'Dat',
            translation: 'ter opinião sobre',
            example: 'Was hältst du von diesem Plan?',
          },
        ],
      },
      {
        label: 'bei',
        entries: [
          {
            term: 'helfen',
            tag: 'Dat',
            translation: 'ajudar em / com',
            example: 'Hilfst du mir bei den Hausaufgaben?',
          },
          {
            term: 'sich bedanken',
            tag: 'Dat',
            translation: 'agradecer a (alguém)',
            example: 'Ich bedanke mich bei dir.',
          },
          {
            term: 'sich entschuldigen',
            tag: 'Dat',
            translation: 'desculpar-se com (alguém)',
            example: 'Entschuldige dich bei ihr.',
          },
        ],
      },
      {
        label: 'zu',
        entries: [
          {
            term: 'gehören',
            tag: 'Dat',
            translation: 'pertencer a',
            example: 'Das gehört zu unserer Kultur.',
          },
          {
            term: 'passen',
            tag: 'Dat',
            translation: 'combinar com',
            example: 'Die Farbe passt zu deinen Augen.',
          },
          {
            term: 'führen',
            tag: 'Dat',
            translation: 'levar a',
            example: 'Das führt zu Problemen.',
          },
          {
            term: 'einladen',
            tag: 'Dat',
            translation: 'convidar para',
            example: 'Ich lade dich zu meiner Party ein.',
          },
          {
            term: 'gratulieren',
            tag: 'Dat',
            translation: 'parabenizar por',
            example: 'Ich gratuliere dir zum Geburtstag.',
          },
          {
            term: 'beitragen',
            tag: 'Dat',
            translation: 'contribuir para',
            example: 'Das trägt zum Erfolg bei.',
          },
        ],
      },
      {
        label: 'vor',
        entries: [
          {
            term: 'sich fürchten',
            tag: 'Dat',
            translation: 'ter medo de',
            example: 'Ich fürchte mich vor Spinnen.',
          },
          {
            term: 'Angst haben',
            tag: 'Dat',
            translation: 'ter medo de',
            example: 'Sie hat Angst vor der Dunkelheit.',
          },
          {
            term: 'warnen',
            tag: 'Dat',
            translation: 'avisar sobre',
            example: 'Er warnt vor der Gefahr.',
          },
          {
            term: 'schützen',
            tag: 'Dat',
            translation: 'proteger de',
            example: 'Die Creme schützt vor der Sonne.',
          },
          {
            term: 'fliehen',
            tag: 'Dat',
            translation: 'fugir de',
            example: 'Sie flieht vor der Polizei.',
          },
        ],
      },
      {
        label: 'aus',
        entries: [
          {
            term: 'bestehen',
            tag: 'Dat',
            translation: 'consistir em',
            example: 'Das Team besteht aus zehn Leuten.',
          },
          {
            term: 'entstehen',
            tag: 'Dat',
            translation: 'originar-se de',
            example: 'Das Problem entstand aus einem Missverständnis.',
          },
        ],
      },
    ],
  },
];
