import type { GrammarTopicInput } from '../grammar-game';

/** A2 grammar topics, transcribed from "Aulas de Alemão A2 – Jogo da Girafa". */
export const A2_TOPICS: readonly GrammarTopicInput[] = [
  {
    id: 'd',
    icon: '🎁',
    title: 'Dativ: artigos e verbos',
    rule: `Dativ = objeto indireto (para quem?): masc./neutro -em (meinem, einem, keinem) · fem. -er (meiner) · plural -en, e o substantivo ganha -n (den Kindern).
Verbos com Dativ: helfen, danken, gehören, gratulieren, antworten, schenken, geben.
Ich helfe meinem Vater. · Ich antworte meiner Mutter.`,
    questions: [
      ['m', 'Ich helfe ___ Vater. (mein)', 'meinem|meinen|meiner|mein', 'helfen → Dativ; masculino -em.'],
      ['m', 'Ich antworte ___ Mutter. (mein)', 'meiner|meinem|meinen|meine', 'Feminino no Dativ: -er.'],
      ['m', 'Ich gratuliere ___ Freunden. (mein)', 'meinen|meinem|meiner|meine', 'Plural no Dativ: -en.'],
      ['t', 'die Kinder → mit den ___', 'Kindern', 'Dativ plural: +n no substantivo.'],
      ['m', 'Das gehört ___ Kind.', 'einem|einen|einer|ein', 'Neutro no Dativ: -em.'],
      ['m', 'Ich esse mit ___ Löffel.', 'einem|einen|einer|ein', 'mit → Dativ.'],
    ],
  },
  {
    id: 'o',
    icon: '🔀',
    title: 'Ordem dos objetos',
    rule: `Dois substantivos: Dativ antes de Akkusativ: Ich gebe meinem Bruder den Löffel.
Pronome + substantivo: o pronome vem primeiro: Ich gebe ihm den Löffel · Ich gebe ihn meinem Bruder.
Dois pronomes: Akkusativ antes de Dativ: Ich gebe ihn ihm. Com weil: …weil ich es ihm gebe.
Reflexivo: Ich kaufe mir einen Espresso.`,
    questions: [
      [
        'o',
        'Eu dou a colher ao meu irmão.',
        'Ich gebe meinem Bruder den Löffel',
        'Dois substantivos: Dativ → Akk.',
      ],
      ['o', 'Eu dou a colher a ele.', 'Ich gebe ihm den Löffel', 'Pronome vem primeiro.'],
      ['o', 'Eu dou a colher (ela) a ele.', 'Ich gebe ihn ihm', 'Dois pronomes: Akk → Dativ.'],
      ['o', 'Eu presenteio a mulher com isso.', 'Ich schenke es der Frau', 'Pronome antes do substantivo.'],
      ['m', 'Ich schenke ___ das Messer. (a ela)', 'ihr|sie|ihn|ihre', 'Dativ de sie: ihr.'],
      ['o', '…porque eu dou isso a ele.', 'weil ich es ihm gebe', 'Nebensatz: verbo ao final; Akk → Dat.'],
    ],
  },
  {
    id: 'c',
    icon: '🔗',
    title: 'ADUSO e conectores',
    rule: `ADUSO (aber, denn, und, sondern, oder) fica na posição 0: o verbo continua na posição 2. Aber, denn e sondern pedem vírgula antes.
sondern só depois de negação: Ich trinke nicht Wein, sondern Apfelschorle.
denn tem o sentido de weil, mas não manda o verbo ao final.
trotzdem (mesmo assim) e deshalb (por isso) são advérbios: ocupam a posição 1 e o verbo vem logo depois.`,
    questions: [
      ['m', 'Ich lerne, ___ ich habe einen Test.', 'denn|weil|dass|ob', 'Verbo na posição 2 → denn.'],
      [
        'm',
        'Ich trinke nicht Wein, ___ Apfelschorle.',
        'sondern|aber|denn|oder',
        'Depois de negação: sondern.',
      ],
      [
        'm',
        'Es regnet. ___ gehe ich spazieren.',
        'Trotzdem|Weil|Denn|Und',
        'trotzdem na pos. 1, verbo na pos. 2.',
      ],
      [
        'o',
        'Tommy gosta de tigres. Por isso ele quer ir ao zoológico.',
        'Deshalb möchte er in den Zoo gehen',
        'deshalb na pos. 1.',
      ],
      [
        'o',
        'Eu estou com fome, mas não como nada.',
        'Ich habe Hunger, aber ich esse nichts',
        'aber na posição 0.',
      ],
      [
        'm',
        'O ADUSO ocupa qual posição?',
        'posição 0|posição 1|posição 2|o final',
        'Não conta como posição.',
      ],
    ],
  },
  {
    id: 'n',
    icon: '🧱',
    title: 'Nebensätze e perguntas',
    rule: `weil, wenn, dass, ob: verbo conjugado no fim. Se a subordinada vem primeiro, o verbo da principal vem logo depois da vírgula.
Pergunta indireta com palavra W: Können Sie mir sagen, wie lange das dauert?
Sim/não → ob: Darf ich fragen, ob Sie Ihren Ausweis dabeihaben?
Separáveis voltam a juntar no fim: …weil ich heute aufräume.`,
    questions: [
      ['o', '…porque eu estou cansado.', 'weil ich müde bin', 'weil: verbo ao final.'],
      [
        'o',
        'Se eu tiver tempo, vou ao dentista.',
        'Wenn ich Zeit habe, gehe ich zum Zahnarzt',
        'Subordinada primeiro, verbo logo depois da vírgula.',
      ],
      ['m', 'Ich weiß, ___ ich das nicht machen kann.', 'dass|ob|denn|aber', 'dass = que.'],
      [
        'o',
        'Pode me dizer quanto tempo isso demora?',
        'Können Sie mir sagen, wie lange das dauert',
        'Palavra W: verbo ao final.',
      ],
      [
        'm',
        'Darf ich fragen, ___ Sie Ihren Ausweis dabeihaben?',
        'ob|dass|wie|denn',
        'Pergunta de sim/não → ob.',
      ],
      [
        'm',
        'Ich bin müde, weil ich heute mein Zimmer ___.',
        'aufräume|räume auf|aufräumen|räume',
        'O prefixo se junta ao verbo no final.',
      ],
    ],
  },
  {
    id: 'ai',
    icon: '👗',
    title: 'Adjetivos com ein/mein',
    rule: `Nominativ: masc. -er (ein neuer Laden) · neutro -es (ein schönes Licht) · fem. -e (eine schöne Wohnung).
Akkusativ: só o masculino muda: einen neuen Laden.
Dativ: sempre -en: einem neuen Laden, einer schönen Wohnung.`,
    questions: [
      ['m', 'Das ist ein ___ Laden. (neu)', 'neuer|neue|neues|neuen', 'Masculino Nominativ: -er.'],
      ['m', 'Das ist ein ___ Licht. (schön)', 'schönes|schöner|schöne|schönen', 'Neutro: -es.'],
      ['m', 'Ich suche einen ___ Job. (gut)', 'guten|guter|gutes|gute', 'Masculino Akk: -en.'],
      ['m', 'Das ist eine ___ Wohnung. (schön)', 'schöne|schöner|schönes|schönen', 'Feminino: -e.'],
      ['m', 'Ich wohne in einer ___ Wohnung. (klein)', 'kleinen|kleine|kleiner|kleines', 'Dativ: -en.'],
      ['t', 'Ich habe ein ___ Handy. (neu, Akk.)', 'neues', 'Neutro mantém -es.'],
    ],
  },
  {
    id: 'ad',
    icon: '🧣',
    title: 'Adjetivos: der e sem artigo',
    rule: `Com der/die/das: Nominativ -e (der grüne Schal) · Akkusativ: só o masc. -en (den grünen Schal) · Dativ e plural: -en.
Sem artigo, o adjetivo mostra gênero e caso: schöner Blick (m.), leckeres Frühstück (n.), schöne Lage (f.).
Dativ sem artigo: -em (m./n.), -er (f.), -en (plural): schönem Blick.`,
    questions: [
      ['m', 'der ___ Schal (grün)', 'grüne|grüner|grünen|grünes', 'Nominativ com artigo: -e.'],
      ['m', 'Ich mag den ___ Schal. (grün)', 'grünen|grüne|grüner|grünes', 'Masculino Akk: -en.'],
      ['m', 'mit dem ___ Schal (grün)', 'grünen|grüne|grünem|grüner', 'Dativ: -en.'],
      [
        'm',
        '___ Frühstück (lecker, sem artigo)',
        'Leckeres|Leckere|Leckerer|Leckeren',
        'Neutro sem artigo: -es.',
      ],
      [
        'm',
        'in ___ Lage (schön, sem artigo, Dativ)',
        'schöner|schöne|schönem|schönen',
        'Feminino Dativ: -er.',
      ],
    ],
  },
  {
    id: 'cp',
    icon: '📏',
    title: 'Comparação',
    rule: `Comparativo: +er (schön → schöner); a/o/u costumam ganhar trema: groß → größer.
Superlativo: am + -sten (am schönsten). Depois de -d, -t, -s, -z entra um -e: am interessantesten.
als = diferença (lieber als) · wie = igualdade (genauso gern … wie).`,
    questions: [
      ['m', 'Comparativo de groß:', 'größer|großer|größter|am größer', 'Trema + -er.'],
      ['m', 'Superlativo de schön:', 'am schönsten|am schöner|am schönesten|am schön', 'am + -sten.'],
      [
        'm',
        'Superlativo de interessant:',
        'am interessantesten|am interessantsten|am interessanter|am interessantten',
        'Termina em -t: entra -e.',
      ],
      ['m', 'Ich höre lieber Pop ___ Jazz.', 'als|wie|denn|dass', 'Comparativo → als.'],
      ['m', 'Ich esse genauso gern Pizza ___ Pasta.', 'wie|als|denn|dass', 'genauso … wie.'],
      ['t', 'Er ist älter ___ ich.', 'als', 'Comparativo → als.'],
    ],
  },
  {
    id: 'k2',
    icon: '💭',
    title: 'Konjunktiv II',
    rule: `sein → wäre · haben → hätte · können → könnte · sollen → sollte · müssen → müsste · wollen → wollte · mögen → möchte.
Outros verbos: würde + infinitivo (ich würde kaufen).
Usos: desejo (Ich wäre gern am Meer), sugestão (Du könntest ins Kino gehen), conselho (Du solltest…), pedido educado (Ich hätte gern eine Cola).`,
    questions: [
      ['m', 'Ich ___ gern eine Cola, bitte.', 'hätte|habe|hatte|hat', 'Pedido educado.'],
      ['m', 'Ich ___ gern am Meer.', 'wäre|bin|war|werde', 'Desejo: wäre.'],
      ['m', 'Du ___ ins Kino gehen. (sugestão)', 'könntest|kannst|konntest|kennst', 'können → könntest.'],
      ['m', 'Du ___ mehr schlafen. (conselho)', 'solltest|sollst|sollen|solltet', 'sollen → solltest.'],
      ['o', 'Eu compraria isso.', 'Ich würde das kaufen', 'würde + infinitivo.'],
      ['m', 'Konjunktiv II de werden:', 'würden|wurden|werden|wären', 'werden → würde.'],
    ],
  },
  {
    id: 'pa',
    icon: '🔧',
    title: 'Passiv',
    rule: `A voz passiva foca na ação: Das Auto wird repariert.
Präsens: wird/werden + Partizip II · Präteritum: wurde/wurden + Partizip II · Perfekt: ist/sind + Partizip II + worden · Futur: wird + Partizip II + werden.
Quem faz: von + Dativ: Das Auto wird vom Mechaniker repariert.`,
    questions: [
      ['o', 'O carro está sendo consertado.', 'Das Auto wird repariert', 'werden + Partizip II.'],
      ['m', 'Die Autos ___ repariert.', 'werden|wird|wurde|ist', 'Plural → werden.'],
      ['m', 'Das Auto ___ repariert. (foi)', 'wurde|wird|wurden|ist', 'Präteritum: wurde.'],
      ['o', 'O carro foi consertado. (Perfekt)', 'Das Auto ist repariert worden', 'ist … worden.'],
      ['m', 'Das Auto wird ___ Mechaniker repariert.', 'vom|von|vor|beim', 'von + dem = vom.'],
      [
        'm',
        'Futur: Das Auto wird gekauft ___.',
        'werden|worden|geworden|wird',
        'wird + Partizip II + werden.',
      ],
    ],
  },
  {
    id: 'l',
    icon: '🧭',
    title: 'Origem e lugar',
    rule: `Woher? (Dativ): aus = países, cidades e lugares fechados (aus dem Hotel, aus dem Wohnzimmer) · von = pessoas e lugares abertos (von Patrick, vom Friseur).
Wo? (Dativ): im = dentro · an der/am = junto de (an der Haltestelle) · beim = pessoa (beim Arzt).
Wohin? (Akk): ins Haus = para dentro · an die Küste = até perto. zu (sempre Dativ): zur Tankstelle, zum Arzt.`,
    questions: [
      ['m', 'Woher? Ich komme ___ Hotel.', 'aus dem|vom|ins|im', 'Lugar fechado → aus.'],
      ['m', 'Woher? Ich komme ___ Friseur.', 'vom|aus dem|beim|im', 'Pessoa → von.'],
      ['m', 'Wo? Ich warte ___ Haltestelle.', 'an der|in der|bei der|zur', 'Junto de → an.'],
      ['m', 'Wo? Ich bin ___ Arzt.', 'beim|im|am|zum', 'Pessoa, parado → bei.'],
      ['m', 'Wohin? Wir fahren ___ Berge.', 'in die|in den|im|zu den', 'Plural, movimento → in die (Akk).'],
      ['m', 'Wohin? Ich fahre ___ Tankstelle.', 'zur|in die|an der|zum', 'zu é sempre Dativ.'],
    ],
  },
  {
    id: 'ls',
    icon: '✂️',
    title: 'Lassen, inversão e passado',
    rule: `lassen = mandar/deixar alguém fazer: ich lasse, du lässt, er lässt, wir lassen, ihr lasst, sie lassen. Posição 2 + infinitivo no fim.
Inversão: pode começar pelo objeto se o caso estiver certo: Den Hund biss der Junge.
Präteritum para sein, haben e modais (war, hatte, konnte, musste); Perfekt para os demais.
Sem ge-: não separáveis e -ieren (bekommen, telefoniert). Separáveis: ge no meio (eingeladen).`,
    questions: [
      ['m', 'Sie ___ ihr Konto prüfen.', 'lässt|lasst|lassen|lasse', 'er/sie/es lässt.'],
      [
        'o',
        'Eu mando consertar meu carro.',
        'Ich lasse mein Auto reparieren',
        'lassen + infinitivo no final.',
      ],
      ['m', 'Den Hund biss ___ Junge.', 'der|den|dem|die', 'Quem morde é o sujeito: Nominativ.'],
      ['m', 'Particípio de bekommen:', 'bekommen|gebekommen|bekomment|gebekommt', 'Prefixo be-: sem ge-.'],
      [
        'm',
        'Particípio de einladen:',
        'eingeladen|geeinladen|eingeladt|einladen',
        'ge entre prefixo e verbo.',
      ],
      ['m', 'Ich ___ gestern keine Zeit. (Präteritum)', 'hatte|habe|hätte|hat', 'haben → hatte.'],
      [
        'm',
        'Particípio de telefonieren:',
        'telefoniert|getelefoniert|telefonieren|getelefonieren',
        '-ieren: sem ge-.',
      ],
    ],
  },
  {
    id: 'w',
    icon: '🧰',
    title: 'Formação de palavras',
    rule: `-los = sem: arbeitslos, herzlos · -bar = possível: machbar, brauchbar · -isch/-ig: stürmisch, eisig · un- = oposto: unangenehm.
Bär → Bärchen · Partner → Partnerin · rauchen → Raucher · befragen → Befragung.
aus = feito de (aus Holz) · zu = demais (zu klein).
Dias da semana + s = toda semana: Montags habe ich keine Zeit. ohne + Akk. · von … an + Dativ · über + Akk. = mais de.`,
    questions: [
      ['m', 'Arbeit → sem trabalho:', 'arbeitslos|arbeitsbar|arbeitisch|arbeitig', '-los = sem.'],
      ['m', 'machen → possível de fazer:', 'machbar|machlos|machig|machisch', '-bar = possível.'],
      ['m', 'Der Tisch ist ___ Holz.', 'aus|zu|von|bei', 'Material → aus.'],
      ['m', 'Der Schuh ist ___ klein. (pequeno demais)', 'zu|aus|von|bei', 'zu = demais.'],
      [
        'm',
        'Toda segunda eu não tenho tempo.',
        'Montags habe ich keine Zeit.|Montage habe ich keine Zeit.|Montags ich habe keine Zeit.|Der Montags habe ich keine Zeit.',
        'Dia + s, minúsculo ou início de frase, verbo na pos. 2.',
      ],
      ['m', 'ohne pede:', 'Akkusativ|Dativ|Genitiv|Nominativ', 'ohne → sempre Akk.'],
      ['m', 'Er hat über ___ Stunde Aufenthalt.', 'eine|einer|einem|ein', 'über (= mais de) + Akk.'],
    ],
  },
];
