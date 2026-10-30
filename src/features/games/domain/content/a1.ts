import type { GrammarTopicInput } from '../grammar-game';

/** A1 grammar topics, transcribed from "Aulas de Alemão A1 – Jogo da Girafa". */
export const A1_TOPICS: readonly GrammarTopicInput[] = [
  {
    id: 'v',
    icon: '🔤',
    title: 'Verbos no presente',
    rule: `Tire o -en e ache o radical. Terminações: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en.
Radical terminado em -t ou -d ganha um -e: du arbeitest, er arbeitet.
O verbo conjugado fica sempre na 2ª posição: Heute suche ich ein Buch.`,
    questions: [
      ['t', 'Ich ___ (lernen)', 'lerne', 'Radical lern- + e.'],
      [
        'm',
        'Du ___ (arbeiten)',
        'arbeitest|arbeitst|arbeitet|arbeiten',
        'Radical em -t ganha -e: arbeit-e-st.',
      ],
      ['m', 'Er ___ (kaufen)', 'kauft|kaufst|kaufe|kaufen', 'er/sie/es → -t.'],
      ['t', 'Ihr ___ (trinken)', 'trinkt', 'ihr → -t.'],
      [
        'o',
        'Hoje eu procuro um livro.',
        'Heute suche ich ein Buch',
        'Verbo na 2ª posição, mesmo com ‘heute’ na frente.',
      ],
    ],
  },
  {
    id: 'a',
    icon: '📘',
    title: 'Artigos e plural',
    rule: `der = masc. · die = fem. · das = neutro · die = plural.
ein (masc./neutro), eine (fem.): ein Computer, ein Auto, eine Tür. ‘Eine’ não é plural!
Plural: +n, +er, +s (palavras estrangeiras) ou igual. Veja no dicionário.
Substantivos compostos pegam o gênero da última palavra: der Orangensaft (der Saft).`,
    questions: [
      [
        'm',
        'Qual frase está certa?',
        'Ein Computer, ein Auto und eine Tür|Eine Computer, ein Auto und ein Tür|Ein Computer, eine Auto und ein Tür|Eine Computer, eine Auto und eine Tür',
        'Masc. ein, neutro ein, fem. eine.',
      ],
      ['m', 'Plural de das Auto:', 'die Autos|die Autoen|die Auter|die Auto', 'Palavras estrangeiras: +s.'],
      ['m', 'Gênero de Orangensaft:', 'der|die|das|plural', 'Vale a última palavra: der Saft.'],
      ['m', 'Quem é incontável?', 'Wasser|Computer|Tür|Auto', 'Incontáveis não recebem ein/eine.'],
      ['t', 'Um irmão: ___ Bruder', 'ein', 'Masculino no Nominativ → ein.'],
    ],
  },
  {
    id: 'k',
    icon: '🚫',
    title: 'Kein ou nicht?',
    rule: `kein = nega um substantivo (cabe ‘um/uma’ na frente): Das ist kein Ei.
nicht = nega o resto (verbo, adjetivo, advérbio).
Incontáveis também usam kein: Ich habe keine Milch.
Existir: es gibt / sind. Haben é só para ‘ter’: Hier sind zwei Autos.`,
    questions: [
      ['m', 'Nein, das ist ___ Ei.', 'kein|nicht|keine|keinen', 'Ei é neutro e cabe ‘ein’.'],
      ['m', 'Ich bin ___ müde.', 'nicht|kein|keine|keinen', 'Adjetivo → nicht.'],
      ['m', 'Ich habe ___ Hunger.', 'keinen|kein|nicht|keine', 'Hunger é masculino, Akkusativ.'],
      ['m', 'Wir haben ___ Zeit.', 'keine|kein|nicht|keinen', 'Zeit é feminino.'],
      [
        'm',
        '‘Tem dois carros aqui.’',
        'Hier sind zwei Autos.|Hier haben zwei Autos.|Hier ist zwei Autos.|Hier hat zwei Autos.',
        'Existência: sein, não haben.',
      ],
    ],
  },
  {
    id: 'n',
    icon: '💶',
    title: 'Números e compras',
    rule: `30–90: dreißig, vierzig, fünfzig, sechzig, siebzig, achtzig, neunzig.
Primeiro a unidade, depois ‘und’ e a dezena: 33 = dreiunddreißig.
Preço: 2,20 € = zwei Euro zwanzig. Singular: Was kostet…? Plural: Was kosten…?
Sem ‘de’: ein Kilo Orangen · ein Pfund = 500 g · ein Liter · hundert Gramm.`,
    questions: [
      ['t', '33 em alemão:', 'dreiunddreißig', 'unidade + und + dezena.'],
      ['m', '45:', 'fünfundvierzig|vierzigundfünf|vierundfünfzig|fünfvierzig', 'fünf-und-vierzig.'],
      [
        'm',
        '2,20 €:',
        'zwei Euro zwanzig|zwei Cent zwanzig|zwanzig Euro zwei|zwei Euro zweiundzwanzig',
        'Forma curta do dia a dia.',
      ],
      ['o', 'Quanto custa o peixe?', 'Was kostet der Fisch?', 'Singular → kostet.'],
      [
        'm',
        'Quanto custam 100 g de queijo?',
        'Was kosten 100 Gramm Käse?|Was kostest 100 Gramm Käse?|Wo kostet 100 Gramm Käse?|Was kosten der Käse 100 Gramm?',
        'Plural → kosten.',
      ],
      ['m', 'Meio quilo:', 'ein Pfund|ein Kilo|ein Liter|hundert Gramm', 'ein Pfund = 500 g.'],
    ],
  },
  {
    id: 's',
    icon: '🧩',
    title: 'Separáveis e ‘Vamos?’',
    rule: `Verbos separáveis (auf.stehen, ein.kaufen): o prefixo vai para o fim: Ich stehe um 6 Uhr auf.
Só separa se for o único verbo; com modal fica junto no infinitivo: Wo kann man hier einkaufen?
Perfekt: o ge- entra entre prefixo e verbo: eingekauft.
Vamos…? = verbo + wir: Kaufen wir ein?
man + 3ª pessoa = ‘se’ impessoal: man kann, man spricht.`,
    questions: [
      ['o', 'Vamos fazer compras!', 'Kaufen wir ein', 'Verbo + wir; ‘ein’ vai ao final.'],
      ['o', 'Eu levanto às 6.', 'Ich stehe um 6 Uhr auf', 'Prefixo ‘auf’ no final.'],
      ['o', 'Eu acordo às 5.', 'Ich wache um 5 Uhr auf', 'aufwachen separa.'],
      ['m', 'Perfekt de einkaufen:', 'eingekauft|geeinkauft|gekauft ein|einkauft', 'ein + ge + kauf + t.'],
      [
        'm',
        'Wo kann man hier ___?',
        'einkaufen|ein kaufen|kaufen ein|einkauft',
        'Com modal, fica junto no infinitivo.',
      ],
      ['m', 'man conjuga como:', 'er/sie/es (man kann)|ich|wir|sie (plural)', 'Terceira pessoa do singular.'],
    ],
  },
  {
    id: 'h',
    icon: '🕐',
    title: 'Uhrzeit',
    rule: `Hora cheia: zehn Uhr. Depois: minutos + nach + hora: fünf nach sieben.
Antes da hora: vor. 15 = Viertel nach/vor.
Meia hora olha para a hora seguinte: 6:30 = halb sieben (não ‘halb vor’).
6:25 = fünf vor halb sieben · 6:35 = fünf nach halb sieben.`,
    questions: [
      ['m', '10:00', 'zehn Uhr|zehn nach|halb zehn|zehn vor', 'Hora cheia: Uhr.'],
      ['t', '7:05: fünf nach ___', 'sieben', 'Minutos + nach + hora.'],
      ['m', '7:15', 'Viertel nach sieben|Viertel vor sieben|fünfzehn sieben|halb sieben', '15 = Viertel.'],
      ['m', '6:30', 'halb sieben|halb sechs|sechs halb|dreißig sechs', 'halb + hora seguinte.'],
      [
        'm',
        '6:35',
        'fünf nach halb sieben|fünf vor halb sieben|fünf nach halb sechs|fünf vor sieben',
        'Depois da meia: nach halb.',
      ],
    ],
  },
  {
    id: 'd',
    icon: '📅',
    title: 'Datas e ordinais',
    rule: `Datas usam ordinais: 1.–19. = +te (erste, zweite, dritte, siebte); a partir de 20 = +ste (zwanzigste).
Com artigo: der vierte (sem -n). Com am: am vierten Mai (com -n).
Ano: sem preposição: Ich bin 2003 geboren.
De… até…: von … bis zum …`,
    questions: [
      ['m', 'Em 1º de maio:', 'Am ersten Mai|Am erste Mai|Der ersten Mai|Am eins Mai', 'am pede -n.'],
      [
        'm',
        'Hoje é dia 4.',
        'Heute ist der vierte.|Heute ist der vierten.|Heute ist am vierten.|Heute ist vier.',
        'Com artigo: sem -n.',
      ],
      [
        'm',
        'Nasci em 2003.',
        'Ich bin 2003 geboren.|Ich bin in 2003 geboren.|Ich habe 2003 geboren.|Ich bin am 2003 geboren.',
        'Ano sem preposição; geboren pede sein.',
      ],
      ['t', 'Am ___ April (20º)', 'zwanzigsten', 'Ab 20: -sten.'],
      ['m', 'Am ___ März (3º)', 'dritten|dreiten|drittten|dritsten', 'Irregular: dritte.'],
    ],
  },
  {
    id: 'ak',
    icon: '🎯',
    title: 'Akkusativ e pronomes',
    rule: `Akkusativ = quem/o que sofre a ação. Só o masculino muda: der → den, ein → einen, mein → meinen.
Pronomes: mich, dich, ihn, es, sie, uns, euch, sie, Sie.
Sempre Akk: durch, für, gegen, ohne, um, bis, entlang. Sein não pede Akk: Mein Bruder ist müde.`,
    questions: [
      ['m', 'Ich liebe ___. (você)', 'dich|du|dir|dein', 'lieben → Akk.'],
      ['m', 'Ich habe ___ Bruder.', 'einen|ein|eine|einem', 'Masculino no Akk.'],
      ['m', 'Das ist für ___. (ele)', 'ihn|er|ihm|sein', 'für → Akk.'],
      ['t', 'Ich besuche ___ Vater. (mein)', 'meinen', 'Masculino no Akk.'],
      ['m', 'No Akkusativ muda só:', 'o masculino|o feminino|o neutro|o plural', 'der → den.'],
    ],
  },
  {
    id: 'da',
    icon: '🤝',
    title: 'Dativ e preposições',
    rule: `Sempre Dativ: aus, bei, mit, nach, seit, von, zu, außer, gegenüber.
Dativ: masc./neutro = -em/dem · fem. = -er/der · plural = -en/den (+n).
zu+dem = zum · zu+der = zur · bei+dem = beim.
Transporte: mit dem Bus, mit der U-Bahn. seit = desde (continua); vor = há (acabou).`,
    questions: [
      ['m', 'Ich fahre mit ___ Bus.', 'dem|den|der|das', 'mit → Dativ.'],
      ['m', 'Ich komme aus ___ Schweiz.', 'der|dem|den|die', 'Schweiz é feminino.'],
      ['m', 'Ich gehe ___ Arzt.', 'zum|ins|nach|im', 'Pessoa/profissional → zu.'],
      ['m', 'Sempre Akkusativ:', 'für|mit|bei|aus', 'für → Akk.'],
      ['m', 'Geschenk von ___ Bruder.', 'meinem|meinen|meiner|mein', 'von → Dativ.'],
      ['m', 'Ich lerne Deutsch ___ einem Monat.', 'seit|vor|nach|für', 'Começou e continua → seit.'],
    ],
  },
  {
    id: 'w',
    icon: '📍',
    title: 'Wo ou Wohin?',
    rule: `Wo? (parado) → Dativ. Wohin? (movimento) → Akkusativ.
An, auf, hinter, in, neben, über, unter, vor, zwischen mudam conforme Wo/Wohin.
bei = pessoas/instituições · in = lugares fechados · nach = países/cidades/Hause · zu = pessoas e comércio.
liegen/stehen/hängen = estado (Dativ) · legen/stellen/hängen = ação (Akk).`,
    questions: [
      ['m', 'Wo? Ich bin ___ Küche.', 'in der|in die|ins|nach der', 'Wo → Dativ.'],
      ['m', 'Wohin? Ich gehe ___ Küche.', 'in die|in der|zu der|im', 'Wohin → Akk.'],
      ['m', 'Das Handy ___ auf dem Tisch.', 'liegt|legt|liegen|legen', 'Estado: liegen.'],
      ['m', 'Ich ___ das Glas auf den Tisch.', 'stelle|stehe|steht|stellt', 'Ação: stellen.'],
      [
        'm',
        'Eu vou à casa da Camille:',
        'Ich gehe zu Camille.|Ich gehe nach Camille.|Ich gehe bei Camille.|Ich gehe in Camille.',
        'Casa de outra pessoa → zu.',
      ],
      [
        'm',
        'Eu vou para casa:',
        'Ich gehe nach Hause.|Ich gehe zu Hause.|Ich gehe ins Hause.|Ich gehe zum Hause.',
        'nach Hause = para casa; zu Hause = em casa.',
      ],
    ],
  },
  {
    id: 'p',
    icon: '⏪',
    title: 'Perfekt e Präteritum',
    rule: `Perfekt = haben/sein + particípio no final. Regular: ge+radical+t · irregular: ge+radical+en (gegessen, getrunken, geschrieben).
sein para deslocamento e mudança de estado: Ich bin geflogen, ich bin aufgewacht.
Verbos em -ieren e não separáveis (be-, er-, ver-…) não levam ge-: passiert.
Präteritum: ich war, du warst · ich hatte, du hattest.`,
    questions: [
      ['m', 'Ich habe Käse ___.', 'gegessen|gegesst|geessen|essen', 'Irregular.'],
      ['m', 'Wir haben die Hausaufgabe ___.', 'gemacht|gemachen|gemachtet|machen', 'Regular: ge-t.'],
      ['m', 'Ich ___ nach Berlin geflogen.', 'bin|habe|hat|ist', 'Deslocamento → sein.'],
      ['m', 'Particípio de passieren:', 'passiert|gepassiert|passiern|gepassieren', '-ieren: sem ge-.'],
      ['m', 'Gestern ___ ich müde.', 'war|wars|wart|bin', 'Präteritum de sein.'],
      ['t', 'Er ___ Hunger. (haben, Präteritum)', 'hatte', 'hatte, hattest, hatte…'],
    ],
  },
  {
    id: 'c',
    icon: '🔗',
    title: 'Conectivos e pedidos',
    rule: `weil/wenn/ob mandam o verbo conjugado ao final. denn/aber ficam na posição 0.
wenn = se (condição) · ob = se (sim/não).
Polidez: Könnten Sie…? / Würden Sie…? + verbo principal no final.
Imperativo: Sie → Hören Sie! · du → radical sem -st (Fahr!, Komm!).
Futuro/tornar-se: werden + infinitivo. sich freuen auf = futuro · über = presente/passado.`,
    questions: [
      [
        'o',
        'Eu estudo alemão porque quero trabalhar na Alemanha.',
        'Ich lerne Deutsch, weil ich in Deutschland arbeiten will',
        'weil: verbo conjugado ao final.',
      ],
      [
        'm',
        'denn:',
        'fica na posição 0, não muda a ordem|manda o verbo ao final|exige Akkusativ|só se usa em perguntas',
        'denn = aber, posição 0.',
      ],
      ['m', 'Ich weiß nicht, ___ er kommt.', 'ob|wenn|weil|denn', 'Dúvida sim/não → ob.'],
      ['m', '___ ich Zeit habe, komme ich.', 'Wenn|Ob|Denn|Weil', 'Condição → wenn.'],
      [
        'o',
        'Poderia me ajudar, por favor?',
        'Könnten Sie mir bitte helfen',
        'Konjunktiv II + verbo no final.',
      ],
      ['m', 'Imperativo de du fährst:', 'Fahr!|Fährst!|Fahre Sie!|Fähr!', 'Sem -st e sem trema.'],
      [
        'm',
        'Ele vai se tornar médico.',
        'Er wird Arzt werden.|Er werde Arzt werden.|Er werden Arzt wird.|Er wird Arzt geworden.',
        'werden + infinitivo.',
      ],
      ['m', 'Ich freue mich ___ die Party. (ainda vai acontecer)', 'auf|über|an|für', 'Futuro → auf.'],
    ],
  },
];
