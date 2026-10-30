import type { GrammarTopicInput } from '../grammar-game';

/** B1 grammar topics, transcribed from "Aulas de Alemão B1 – Jogo da Girafa". */
export const B1_TOPICS: readonly GrammarTopicInput[] = [
  {
    id: 'g1',
    icon: '🔵',
    title: 'Genus: masculinos',
    rule: `Masculinos: seres machos · dias, meses e estações (der Montag, der April, der Sommer) · pontos cardeais · fenômenos do tempo (der Regen; exceções: die Wolke, das Gewitter) · bebidas alcoólicas (der Wein; exceção: das Bier) · marcas de carro (der BMW).
Terminações: -ant, -ent, -ist, -ismus, -or, -ling, -er (der Lehrer). Plural em -er: só o artigo muda (die Lehrer).`,
    questions: [
      ['m', 'Qual palavra é masculina?', 'Regen|Gewitter|Wolke|Bier', 'Fenômeno do tempo: der Regen.'],
      [
        'm',
        'Exceção neutra entre as bebidas alcoólicas:',
        'das Bier|der Wein|der Sekt|der Wodka',
        'das Bier.',
      ],
      [
        'm',
        'der Journalist, der Student, der Motor têm em comum:',
        'terminações masculinas|são femininos|são neutros|são plurais',
        '-ist, -ent, -or → der.',
      ],
      [
        'm',
        'Feminino de der Lehrer:',
        'die Lehrerin|die Lehrer|das Lehrerchen|die Lehrere',
        '-in forma o feminino.',
      ],
      ['m', 'Plural de der Lehrer:', 'die Lehrer|die Lehrern|die Lehrers|die Lehreren', 'Só muda o artigo.'],
    ],
  },
  {
    id: 'g2',
    icon: '🔴',
    title: 'Genus: femininos',
    rule: `Femininos: seres fêmeas · números (die Drei) · frutas e flores (die Banane, die Rose; exceções: der Apfel, der Pfirsich) · marcas de moto.
Terminações: -in, -ik, -ion, -tät, -heit/-keit, -schaft, -ung, -ei, -e (die Lampe, die Reise).`,
    questions: [
      ['m', 'Qual palavra é feminina (die)?', 'Freiheit|Journalismus|Motor|Museum', '-heit → die.'],
      [
        'm',
        'die Überraschung, die Heizung: -ung é…',
        'sempre feminina|masculina|neutra|plural',
        '-ung → die.',
      ],
      ['m', 'Exceção masculina entre as frutas:', 'der Apfel|die Birne|die Banane|die Traube', 'der Apfel.'],
      ['m', 'die Bäckerei, die Metzgerei: -ei é…', 'feminina|neutra|masculina|diminutivo', '-ei → die.'],
      ['m', 'Qual é feminina?', 'Universität|Instrument|Wetter|Museum', '-tät → die.'],
    ],
  },
  {
    id: 'g3',
    icon: '🟢',
    title: 'Genus: neutros',
    rule: `Neutros: diminutivos -chen/-lein (das Mädchen) · seres jovens (das Kind, das Baby) · materiais (das Gold, das Holz) · verbos substantivados (das Essen) · cores (das Blau) · frações (das Viertel).
Terminações: -ment (exceção: der Moment), -um (das Museum), -ma (das Thema), -tum (das Eigentum; exceção: der Reichtum).`,
    questions: [
      ['m', 'Artigo de Mädchen:', 'das|die|der|den', '-chen → das.'],
      ['m', 'Qual é neutro?', 'Museum|Moment|Reichtum|Motor', '-um → das.'],
      [
        'm',
        'Exceção masculina em -ment:',
        'der Moment|das Instrument|das Element|das Dokument',
        'der Moment.',
      ],
      ['m', 'das Gold, das Silber, das Holz:', 'materiais|cores|frações|diminutivos', 'Materiais → das.'],
      ['m', 'Qual é neutro?', 'Klima|Wind|Sekt|Journalist', '-ma → das.'],
    ],
  },
  {
    id: 'pf',
    icon: '⏮️',
    title: 'Perfekt',
    rule: `haben/sein + Partizip II no final. Regular: ge-…-t (gemacht) · forte: ge-…-en (gegessen, gegangen). Radical em -t/-d: gearbeitet.
sein: deslocamento e mudança de estado (gefahren, aufgewacht, geblieben, geworden).
Separáveis: ge no meio (eingeladen, kennengelernt). Sem ge-: não separáveis (bekommen) e -ieren (telefoniert).`,
    questions: [
      ['m', 'Ich ___ nach Berlin gefahren.', 'bin|habe|hat|ist', 'Deslocamento → sein.'],
      ['m', 'Particípio de arbeiten:', 'gearbeitet|gearbeit|gearbeitt|arbeitet', 'Radical em -t: -et.'],
      [
        'm',
        'Particípio de kennenlernen:',
        'kennengelernt|gekennenlernt|kennenlernt|kennengelernen',
        'ge no meio.',
      ],
      ['m', 'Particípio de studieren:', 'studiert|gestudiert|studieren|gestudieren', '-ieren: sem ge-.'],
      ['o', 'Eu comi queijo.', 'Ich habe Käse gegessen', 'haben + Partizip II no final.'],
      ['m', 'Wir ___ lange geblieben.', 'sind|haben|hat|war', 'bleiben → sein.'],
    ],
  },
  {
    id: 'pr',
    icon: '📜',
    title: 'Präteritum: fracos e modais',
    rule: `Fracos: radical + -te, -test, -te, -ten, -tet, -ten (ich machte). Radical em -t/-d: -ete (arbeitete, landete).
sein: war, warst, war, waren, wart, waren · haben: hatte, hattest, hatte, hatten, hattet, hatten.
Modais: konnte, musste, wollte, durfte, sollte, mochte. Mistos: brachte, wusste, kannte.`,
    questions: [
      ['m', 'ich ___ (lernen)', 'lernte|lernt|gelernt|lernete', 'radical + -te.'],
      ['m', 'du ___ (sein)', 'warst|bist|wärst|wast', 'war, warst, war…'],
      ['m', 'er ___ (arbeiten)', 'arbeitete|arbeitte|arbeite|gearbeitet', 'Radical em -t: -ete.'],
      ['m', 'wir ___ (müssen)', 'mussten|müssten|musst|gemusst', 'Modal: sem trema.'],
      ['m', 'ich ___ (bringen, misto)', 'brachte|bringte|brang|bräuchte', 'Radical muda + -te.'],
      ['t', 'ihr ___ (haben)', 'hattet', 'hatte, hattest, hatte, hatten, hattet, hatten.'],
    ],
  },
  {
    id: 'ps',
    icon: '💪',
    title: 'Präteritum: fortes',
    rule: `Fortes mudam o radical; terminações: ich –, du -st, er –, wir -en, ihr -t, sie -en.
gehen – ging · kommen – kam · sehen – sah · geben – gab · essen – aß · trinken – trank · schlafen – schlief · fahren – fuhr · lesen – las · schreiben – schrieb · finden – fand · bleiben – blieb · stehen – stand.`,
    questions: [
      ['m', 'ich ___ (gehen)', 'ging|gehte|gang|gegangen', 'gehen – ging.'],
      ['m', 'er ___ (sehen)', 'sah|sahte|sieht|sehte', 'sehen – sah.'],
      ['m', 'wir ___ (trinken)', 'tranken|trinkten|getrunken|trankten', 'trank, tranken.'],
      ['t', 'ich ___ (fahren)', 'fuhr', 'fahren – fuhr.'],
      ['m', 'sie ___ (schlafen, Singular)', 'schlief|schlafte|schlaf|schlieft', 'schlafen – schlief.'],
      ['m', 'ich ___ (lesen)', 'las|lese|lasen|gelesen', 'lesen – las.'],
      ['m', 'er ___ (bleiben)', 'blieb|bleibte|bleib|geblieben', 'bleiben – blieb.'],
    ],
  },
  {
    id: 'pv',
    icon: '⚖️',
    title: 'Perfekt ou Präteritum?',
    rule: `Conversa: Perfekt. Textos escritos (livros, notícias, relatórios): Präteritum.
sein, haben e modais ficam quase sempre no Präteritum, até na fala (Ich war müde, Ich musste arbeiten).
als = evento único no passado (Als ich ankam…) · wenn = repetição, ‘toda vez que’ (Wenn er kam, brachte er Blumen mit).`,
    questions: [
      [
        'm',
        'Na conversa, ‘Ontem fui ao cinema’:',
        'Ich bin gestern ins Kino gegangen.|Ich bin gestern ins Kino gehen.|Ich habe gestern ins Kino gegangen.|Ich war gestern ins Kino gegangen.',
        'Fala → Perfekt com sein.',
      ],
      ['m', 'Gestern ___ ich müde. (fala)', 'war|bin gewesen|wäre|wurde', 'sein → Präteritum.'],
      ['m', '___ ich ankam, war der Zug weg. (evento único)', 'Als|Wenn|Ob|Weil', 'Evento único: als.'],
      ['m', '___ ich Zeit hatte, ging ich spazieren. (toda vez)', 'Wenn|Als|Ob|Dass', 'Repetição: wenn.'],
      [
        'm',
        'Textos de jornal usam sobretudo:',
        'Präteritum|Perfekt|Futur|Konjunktiv I',
        'Escrita → Präteritum.',
      ],
      ['m', 'Ich ___ gestern arbeiten. (müssen)', 'musste|habe gemusst|müsste|muss', 'Modal → Präteritum.'],
    ],
  },
  {
    id: 'pq',
    icon: '⏪',
    title: 'Plusquamperfekt e conjunções de tempo',
    rule: `hatte/war + Partizip II = ação anterior a outra no passado: Ich hatte gemacht · Ich war gegangen.
nachdem + Plusquamperfekt; principal em Präteritum/Perfekt: Nachdem ich das Projekt beendet hatte, ging ich nach Hause.
bevor = antes · während = enquanto · seit(dem) = desde que · bis = até que.`,
    questions: [
      [
        'm',
        'Nachdem ich gegessen ___, ging ich schlafen.',
        'hatte|habe|war|hätte',
        'Plusquamperfekt: hatte + Partizip II.',
      ],
      ['m', 'Als ich ankam, ___ der Zug schon abgefahren.', 'war|hatte|ist|wurde', 'abfahren → sein.'],
      [
        'o',
        'Ele estava cansado porque tinha trabalhado o dia todo.',
        'Er war müde, weil er den ganzen Tag gearbeitet hatte',
        'weil: auxiliar no final.',
      ],
      [
        'm',
        'Plusquamperfekt de ‘ich gehe’:',
        'ich war gegangen|ich habe gegangen|ich bin gegangen|ich ging gegangen',
        'war + Partizip II.',
      ],
      [
        'm',
        'Du suchst die Datei, ___ ich das Programm runterlade.',
        'während|bevor|nachdem|bis',
        'Ao mesmo tempo: während.',
      ],
      ['m', 'Alex war Polizist, ___ er Superstar wurde.', 'bevor|nachdem|während|seit', 'Antes: bevor.'],
    ],
  },
  {
    id: 'pa',
    icon: '🔧',
    title: 'Passiv',
    rule: `werden + Partizip II. Präsens: wird renoviert · Präteritum: wurde renoviert · Perfekt: ist renoviert worden · Plusquamperfekt: war renoviert worden · Futur: wird renoviert werden.
Com modal: Das sollte beachtet werden. Agente: von + Dativ (pessoas), durch + Akk. (meios).
Zustandspassiv (sein + Partizip II) = resultado: Das Fenster ist geöffnet.`,
    questions: [
      ['m', 'Das Haus ___ renoviert. (Präsens)', 'wird|wurde|ist|hat', 'werden + Partizip II.'],
      ['m', 'Das Haus ___ renoviert. (Präteritum)', 'wurde|wird|war|ist', 'wurde.'],
      ['o', 'A casa foi reformada. (Perfekt)', 'Das Haus ist renoviert worden', 'ist … worden.'],
      [
        'm',
        'Das Haus ___ renoviert worden. (tinha sido)',
        'war|ist|wurde|hatte',
        'Plusquamperfekt: war … worden.',
      ],
      ['o', 'Isso deve ser observado.', 'Das sollte beachtet werden', 'modal + Partizip II + werden.'],
      [
        'm',
        'Das Fenster ist geöffnet. significa:',
        'a janela está aberta|a janela está sendo aberta|a janela foi aberta|a janela será aberta',
        'Zustandspassiv: resultado.',
      ],
    ],
  },
  {
    id: 'k2',
    icon: '💭',
    title: 'Konjunktiv II: irreal e passado',
    rule: `Wenn + Konjunktiv II no fim; principal com (dann) + würde/hätte/könnte/wäre: Wenn ich Zeit hätte, würde ich kommen.
Passado: hätte/wäre + Partizip II: Wenn ich gelernt hätte, wäre ich durchgekommen.
Desejo irreal: Hätte ich bloß nichts gesagt! · als ob + Konjunktiv II.`,
    questions: [
      ['m', 'Wenn ich Zeit ___, würde ich kommen.', 'hätte|habe|hatte|hat', 'Irreal: hätte.'],
      ['m', 'Wenn er nicht so anstrengend ___, würde ich mich freuen.', 'wäre|ist|war|würde', 'sein → wäre.'],
      [
        'o',
        'Se ao menos eu não tivesse dito nada!',
        'Hätte ich bloß nichts gesagt',
        'hätte + Partizip II, verbo na pos. 1.',
      ],
      ['m', 'Du tust so, als ob ich keine Ahnung ___.', 'hätte|habe|hatte|hat', 'als ob + Konjunktiv II.'],
      [
        'm',
        'Konjunktiv II passado de ‘ich gehe’:',
        'ich wäre gegangen|ich hätte gegangen|ich würde gegangen|ich war gegangen',
        'gehen → sein.',
      ],
      ['m', 'Ich ___ gern ein bisschen Ruhe.', 'hätte|habe|hatte|hat', 'Desejo educado.'],
    ],
  },
  {
    id: 'ge',
    icon: '🏛️',
    title: 'Genitiv e N-Deklination',
    rule: `Genitiv = posse: des + -(e)s (masc./neutro), der (fem./plural): das Auto des Mannes, die Tasche der Frau, meines Kindes, einer Spezialistin.
Pedem Genitiv: wegen, trotz, während, innerhalb, außerhalb. (Na fala, wegen aparece com Dativ.)
N-Deklination: masculinos como der Kollege, der Junge, der Mensch, der Nachbar ganham -(e)n em todos os casos, menos no Nominativ singular.`,
    questions: [
      ['m', 'wegen ___ Verkehrs', 'des|dem|den|der', 'wegen + Genitiv.'],
      ['m', 'trotz ___ Regens', 'des|dem|den|der', 'trotz + Genitiv.'],
      ['m', 'während ___ Kurses', 'des|dem|der|den', 'während + Genitiv.'],
      [
        'm',
        'Akkusativ de der Kollege:',
        'den Kollegen|den Kollege|dem Kollegen|des Kollegen',
        'N-Deklination: -n.',
      ],
      ['m', 'Dativ de der Junge:', 'dem Jungen|dem Junge|den Jungen|des Jungen', 'N-Deklination.'],
      ['m', 'wegen ___ Arbeit', 'meiner|meinem|meine|meinen', 'Genitiv feminino: -er.'],
      [
        'm',
        'Wir melden uns ___ einer Woche. (dentro de)',
        'innerhalb|während|wegen|bis',
        'innerhalb + Genitiv.',
      ],
    ],
  },
  {
    id: 'iz',
    icon: '🎯',
    title: 'Infinitivo com zu',
    rule: `um … zu = finalidade, mesmo sujeito · damit = sujeitos diferentes.
statt … zu = em vez de · ohne … zu = sem (ohne dass se os sujeitos forem diferentes).
zu + infinitivo depois de anfangen, versuchen, vergessen, aufhören, Lust haben, Es ist toll…
Separáveis: zu no meio (aufzustehen).`,
    questions: [
      [
        'o',
        'Ele quer ser o primeiro na loja para comprar sapatos.',
        'Er will als Erster im Laden sein, um Schuhe zu kaufen',
        'um … zu: mesmo sujeito.',
      ],
      [
        'm',
        'Leon kauft Schuhe, ___ sein Kunde ausschlafen kann.',
        'damit|um|statt|ohne',
        'Sujeitos diferentes → damit.',
      ],
      ['m', 'Man sollte etwas tun, ___ nur zu träumen.', 'statt|ohne|um|damit', 'statt … zu.'],
      ['m', 'Man kann nichts lernen, ___ Fehler zu machen.', 'ohne|statt|um|damit', 'ohne … zu.'],
      ['m', 'Es ist toll, Kunden ___ beraten.', 'zu|um|zum|dass', 'Es ist … + zu.'],
      [
        'm',
        'Ich versuche, früh ___.',
        'aufzustehen|zu aufstehen|aufzustehen zu|zuaufstehen',
        'zu entra no meio.',
      ],
    ],
  },
  {
    id: 'cj',
    icon: '🔗',
    title: 'Conectores B1',
    rule: `obwohl = embora · falls = caso · da = visto que · indem = ao/por meio de · seit(dem), bis · verbo sempre no final.
je … desto/umso: Je länger man wartet, desto schlechter wird die Stimmung.
De duas partes: nicht nur … sondern auch · zwar … aber · entweder … oder · sowohl … als auch · weder … noch.`,
    questions: [
      [
        'm',
        'Max sieht die Serie an, ___ er sie schon dreimal gesehen hat.',
        'obwohl|weil|damit|denn',
        'Concessão: obwohl.',
      ],
      ['m', '___ dich das interessiert, ruf mich an.', 'Falls|Obwohl|Indem|Bis', 'falls = caso.'],
      [
        'm',
        'Auch Sie können helfen, ___ Sie Geld spenden.',
        'indem|damit|obwohl|bevor',
        'indem = por meio de.',
      ],
      ['m', 'Je länger man wartet, ___ schlechter wird die Stimmung.', 'desto|je|dann|weil', 'je … desto.'],
      ['m', 'Der Tee ist ___ lecker noch gesund.', 'weder|nicht|kein|sowohl', 'weder … noch.'],
      [
        'm',
        'Das macht ___ nur Lärm, sondern auch Schmutz.',
        'nicht|weder|zwar|sowohl',
        'nicht nur … sondern auch.',
      ],
      [
        'm',
        'Ich habe zwar Vorschläge gemacht, ___ sie haben sich nicht interessiert.',
        'aber|sondern|noch|als auch',
        'zwar … aber.',
      ],
    ],
  },
  {
    id: 'rl',
    icon: '🧲',
    title: 'Relativsatz e verbos com preposição',
    rule: `Pronome relativo: gênero/número do substantivo, caso pela função na oração. Nom.: der/das/die/die · Akk.: den/das/die/die · Dativ: dem/dem/der/denen. Verbo no final; preposição vem antes: ein Job, mit dem er verdient.
wo = lugar (dort, wo…) · was = depois de alles, nichts, das.
Partizip Präsens = infinitivo + d: der wohltuende Tee.
Verbos: denken an (Akk.) → daran, an wen? · träumen von (Dativ) → davon · warten auf → worauf?`,
    questions: [
      ['m', 'Das ist ein Mann, ___ gut kochen kann.', 'der|den|dem|das', 'Sujeito → Nominativ.'],
      ['m', 'Der Berliner, ___ man kennt…', 'den|der|dem|denen', 'Objeto direto → Akk.'],
      ['m', 'Ein Job, mit ___ er viel verdient.', 'dem|den|der|das', 'mit → Dativ.'],
      ['m', 'Die Kollegen, von ___ ich erzähle…', 'denen|die|den|der', 'Dativ plural: denen.'],
      ['m', 'Alles, ___ du suchst, findest du hier.', 'was|das|wo|der', 'Depois de alles: was.'],
      ['m', 'Partizip Präsens de leuchten:', 'leuchtend|geleuchtet|leuchtet|leuchten', 'infinitivo + d.'],
      [
        'm',
        'Ich denke oft an die Reise. → Ich denke oft ___.',
        'daran|dafür|davon|an sie',
        'denken an → daran.',
      ],
    ],
  },
];
