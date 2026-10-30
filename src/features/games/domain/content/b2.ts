import type { GrammarTopicInput } from '../grammar-game';

/** B2 grammar topics, transcribed from "Aulas de Alemão B2 – Jogo da Girafa". */
export const B2_TOPICS: readonly GrammarTopicInput[] = [
  {
    id: 'di',
    icon: '🔁',
    title: 'Duplo infinitivo no Perfekt',
    rule: `Sem zu: gehen, lernen, bleiben + infinitivo → Partizip II normal: Ich bin joggen gegangen.
sehen, hören, lassen (+ verbo) e modais (+ verbo) → Ersatzinfinitiv: Ich habe ihn stehen sehen · Er hat das Foto machen lassen · Ich habe das machen können.
Outros verbos pedem zu: Ich habe versucht zu schlafen.`,
    questions: [
      [
        'm',
        'Perfekt: Ich gehe joggen. →',
        'Ich bin joggen gegangen.|Ich habe joggen gegangen.|Ich bin joggen gehen.|Ich bin gegangen joggen.',
        'gehen → sein + Partizip II.',
      ],
      [
        'm',
        'Perfekt: Ich höre ihn lachen. →',
        'Ich habe ihn lachen hören.|Ich habe ihn lachen gehört.|Ich bin ihn lachen hören.|Ich habe ihn gelacht hören.',
        'hören + verbo → Ersatzinfinitiv.',
      ],
      [
        'm',
        'Perfekt: Er lässt das Foto machen. →',
        'Er hat das Foto machen lassen.|Er hat das Foto machen gelassen.|Er ist das Foto machen lassen.|Er hat das Foto gemacht lassen.',
        'lassen + verbo → Ersatzinfinitiv.',
      ],
      [
        'm',
        'Perfekt: Ich bleibe stehen. →',
        'Ich bin stehen geblieben.|Ich habe stehen geblieben.|Ich bin stehen bleiben.|Ich bin geblieben stehen.',
        'bleiben → Partizip II normal.',
      ],
      [
        'm',
        'Perfekt: Ich kann das machen. →',
        'Ich habe das machen können.|Ich habe das machen gekonnt.|Ich bin das machen können.|Ich habe das gemacht können.',
        'Modal + verbo → Ersatzinfinitiv.',
      ],
      [
        'm',
        'Perfekt: Ich versuche zu schlafen. →',
        'Ich habe versucht zu schlafen.|Ich habe zu schlafen versuchen.|Ich habe versuchen zu schlafen.|Ich bin versucht zu schlafen.',
        'Com zu: Partizip II normal.',
      ],
    ],
  },
  {
    id: 'la',
    icon: '✂️',
    title: 'Os 4 sentidos de lassen',
    rule: `lassen: 1) permitir (Laura lässt Fotos von sich machen) · 2) delegar (Er lässt das Auto reparieren) · 3) possibilidade com sich (Es lässt sich machen = pode ser feito) · 4) manter/deixar (Sie lässt die Frisur so).
Perfekt: lassen + verbo → hat … machen lassen · lassen sozinho → hat … gelassen.`,
    questions: [
      [
        'm',
        'Sie lässt ihre Frisur so. → Perfekt',
        'Sie hat ihre Frisur so gelassen.|Sie hat ihre Frisur so lassen.|Sie ist ihre Frisur so gelassen.|Sie hat ihre Frisur so gelässt.',
        'lassen sozinho: gelassen.',
      ],
      [
        'm',
        'Es lässt sich machen. significa:',
        'pode ser feito|deve ser feito|foi feito|ninguém faz',
        'sich lassen = können + Passiv.',
      ],
      [
        'o',
        'Eu mandei consertar meu carro.',
        'Ich habe mein Auto reparieren lassen',
        'hat + infinitivo + lassen no final.',
      ],
      ['m', 'Er ___ sein Auto reparieren. (lassen)', 'lässt|lasst|lassen|lasset', 'er/sie/es lässt.'],
      ['m', 'Man kann das ___. (deixar para lá)', 'lassen|gelassen|lässt|zu lassen', 'Sentido 4: não fazer.'],
    ],
  },
  {
    id: 'f2',
    icon: '🔮',
    title: 'Futur II e sollen (boatos)',
    rule: `Futur II = dedução sobre o passado: werden + Partizip II + haben/sein: Ihre Freunde werden neidisch gewesen sein.
Equivalente: advérbio + passado (wohl, vermutlich): Ihre Freunde waren vermutlich neidisch.
sollen = boato: Es soll vegetarische Hamburger geben. Passado: soll + Partizip II + haben/sein: Der Boxer soll seinen Salat früher selbst angebaut haben.`,
    questions: [
      ['m', 'Dedução: Er ___ den Zug verpasst haben.', 'wird|hat|wurde|ist', 'werden + Partizip II + haben.'],
      [
        'o',
        'Seus amigos provavelmente estavam com inveja.',
        'Ihre Freunde werden neidisch gewesen sein',
        'Futur II: werden … gewesen sein.',
      ],
      [
        'm',
        '‘Dizem que ele é rico.’',
        'Er soll reich sein.|Er will reich sein.|Er muss reich sein.|Er sollte reich sein.',
        'sollen = boato.',
      ],
      [
        'm',
        '‘Dizem que ele cultivava a salada.’',
        'Er soll den Salat angebaut haben.|Er soll den Salat anbauen haben.|Er hat den Salat angebaut sollen.|Er soll den Salat angebaut sein.',
        'soll + Partizip II + haben.',
      ],
      [
        'm',
        'Futur II usa:',
        'werden + Partizip II + haben/sein|werden + infinitivo|wurde + Partizip II|hatte + Partizip II',
        'Dedução sobre o passado.',
      ],
    ],
  },
  {
    id: 'k2',
    icon: '💭',
    title: 'Konjunktiv II: irreal',
    rule: `Condição irreal: presente würde + infinitivo ou forma própria · passado hätte/wäre + Partizip II: Wenn Jana die App nicht verwendet hätte, hätte sie nicht alles gesehen.
Desejo irreal com doch/bloß: Könnte ich doch in Berlin wohnen! · Wäre ich bloß in Köln geblieben!
Comparação irreal: als ob (verbo no fim) ou als (verbo na pos. 2): Es sieht so aus, als wäre die Welle so hoch wie ein Haus.
Formas próprias: käme, wüsste, fände, gäbe, wäre, hätte, könnte, müsste.`,
    questions: [
      [
        'm',
        'Wenn Jana die App nicht verwendet ___, hätte sie nicht alles gesehen.',
        'hätte|würde|wäre|hat',
        'Passado: hätte + Partizip II.',
      ],
      [
        'o',
        'Se ao menos eu tivesse ficado em Colônia!',
        'Wäre ich bloß in Köln geblieben',
        'wäre + Partizip II; verbo na pos. 1.',
      ],
      [
        'm',
        'Es sieht so aus, als ___ die Welle so hoch wie ein Haus.',
        'wäre|ist|war|würde sein',
        'als + Konjunktiv II na pos. 2.',
      ],
      [
        'm',
        'Es sah so aus, als ob die Welle so hoch wie ein Haus ___.',
        'gewesen wäre|wäre gewesen|war gewesen|gewesen war',
        'als ob: verbo no final.',
      ],
      [
        'm',
        'Konjunktiv II de kommen / wissen:',
        'käme / wüsste|kömme / wüsste|kame / wusste|kommte / wisste',
        'Formas próprias.',
      ],
    ],
  },
  {
    id: 'ap',
    icon: '💞',
    title: 'Adjetivos e sentimentos com preposição',
    rule: `Akk.: stolz auf, bekannt für, verliebt in, überrascht über, eifersüchtig auf, Verständnis haben für.
Dativ: interessiert an, bekannt bei, zufrieden mit, verrückt nach, begeistert von, nett zu, Beziehung haben zu, Vertrauen haben zu, eine Vorstellung haben von.`,
    questions: [
      ['m', 'Basel ist stolz ___ seine Kunstsammlung.', 'auf|über|an|von', 'stolz auf + Akk.'],
      ['m', 'Zürich ist bekannt ___ sein Nachtleben.', 'für|bei|von|auf', 'bekannt für + Akk.'],
      ['m', 'Tom ist interessiert ___ der Kultur.', 'an|auf|für|über', 'interessiert an + Dat.'],
      ['m', 'Die Besucher sind begeistert ___ der Ausstellung.', 'von|über|für|auf', 'begeistert von + Dat.'],
      ['m', 'Sie hat eine gute Beziehung ___ ihren Eltern.', 'zu|mit|für|an', 'Beziehung zu + Dat.'],
      ['m', 'Er ist eifersüchtig ___ seinen Bruder.', 'auf|über|an|zu', 'eifersüchtig auf + Akk.'],
    ],
  },
  {
    id: 'ir',
    icon: '📰',
    title: 'Indirekte Rede',
    rule: `Konjunktiv I = radical + -e, -est, -e, -en, -et, -en (er habe, sei, werde, könne, müsse). Se for igual ao Indikativ (sie haben), usa-se Konjunktiv II ou würde: sie hätten.
Passado: habe/sei + Partizip II (Er sagte, er sei gegangen).
Típico de notícias: Der Minister sagte, die Wirtschaft wachse wieder.`,
    questions: [
      ['m', 'Er sagt, er ___ müde. (Konj. I)', 'sei|ist|war|wird', 'sein → sei.'],
      [
        'm',
        'Der Minister sagte, die Wirtschaft ___ wieder.',
        'wachse|wächst|wuchs|wachsen',
        '3ª pessoa: -e.',
      ],
      [
        'm',
        'Rita sagt, die Familien ___ Verständnis füreinander.',
        'hätten|haben|habe|hatten',
        'Konj. I = Indikativ → Konj. II.',
      ],
      ['m', 'Er sagte, er ___ nach Hause gegangen.', 'sei|ist|war|hat', 'sei + Partizip II.'],
      ['m', 'Konjunktiv I de er kann:', 'er könne|er könnte|er kann|er könnt', 'radical + -e.'],
    ],
  },
  {
    id: 'wr',
    icon: '🧑‍🤝‍🧑',
    title: 'Wer/wen/wem e je … desto',
    rule: `wer/wen/wem = ‘quem…’: a oração relativa vem primeiro e é retomada por der/den/dem: Wer keine Ratschläge annehmen will, dem ist nicht zu helfen · Wen ich nicht mag, den lade ich nicht ein · Wem man die Hand gibt, dem sieht man in die Augen.
je … desto/umso + comparativo: je com verbo no final, desto/umso com verbo na pos. 2.`,
    questions: [
      ['m', '___ ich nicht mag, den lade ich nicht ein.', 'Wen|Wer|Wem|Was', 'mögen → Akk. → wen.'],
      [
        'm',
        'Wer keine Ratschläge annehmen will, ___ ist nicht zu helfen.',
        'dem|der|den|das',
        'helfen → Dativ → dem.',
      ],
      ['m', 'Wem man die Hand gibt, ___ sieht man in die Augen.', 'dem|den|der|wem', 'Retoma o Dativ: dem.'],
      ['m', 'Je jünger man ist, ___ öfter verliebt man sich.', 'desto|je|dann|weil', 'je … desto.'],
      [
        'o',
        'Quanto melhor nos entendemos, mais estável é a relação.',
        'Je besser man sich versteht, umso stabiler ist die Beziehung',
        'je: verbo ao final; umso: verbo na pos. 2.',
      ],
    ],
  },
  {
    id: 'cn',
    icon: '⛓️',
    title: 'Concessão, condição e consequência',
    rule: `Concessão: obwohl/obgleich + verbo no fim · trotz + Genitiv.
Condição: wenn/sofern/falls + verbo no fim · bei + Dativ.
Consequência: folglich/infolgedessen (pos. 1, verbo logo depois) · so … dass · sodass · infolge + Genitiv.`,
    questions: [
      [
        'm',
        '___ die Kapseln nicht umweltschonend sind, kaufe ich sie.',
        'Obwohl|Trotz|Folglich|Sodass',
        'Verbo no final: obwohl.',
      ],
      [
        'm',
        '___ des guten Wetters hatten wir keine gute Ernte.',
        'Trotz|Obwohl|Falls|Dass',
        'Genitiv → trotz.',
      ],
      [
        'm',
        'Er bewirbt sich um ein Stipendium; ___ reist er ab.',
        'folglich|sodass|dass|sofern',
        'Verbo logo depois: folglich.',
      ],
      [
        'm',
        'Manche Städte sind so beliebt, ___ es schwer ist, eine Unterkunft zu finden.',
        'dass|sodass|weil|obwohl',
        'so … dass.',
      ],
      [
        'm',
        'Der Arbeitsaufwand ist hoch, ___ einige aufgeben.',
        'sodass|folglich|infolge|trotz',
        'Verbo no final: sodass.',
      ],
      [
        'm',
        '___ des hohen Arbeitsaufwands geben einige das Studium auf.',
        'Infolge|Folglich|Sodass|Obwohl',
        'infolge + Genitiv.',
      ],
    ],
  },
  {
    id: 'mo',
    icon: '🛠️',
    title: 'Modo, meio e contraste',
    rule: `Meio: indem + verbo no fim · durch + Akk. · dadurch, dass.
Ausência: anstatt zu / anstatt dass · ohne zu / ohne dass.
Contraste: während + verbo no fim · dagegen / im Gegensatz dazu (pos. 1, verbo logo depois).`,
    questions: [
      ['m', 'Man lernt viel, ___ man häufig übt.', 'indem|durch|obwohl|damit', 'indem = por meio de.'],
      [
        'm',
        '___ regelmäßiges Training verbessert man die Kondition.',
        'Durch|Indem|Dadurch|Ohne',
        'durch + Akk.',
      ],
      [
        'm',
        'Man verbessert die Kondition ___, dass man trainiert.',
        'dadurch|dafür|davon|darauf',
        'dadurch, dass.',
      ],
      [
        'm',
        '___ Symptome zu behandeln, sollte man die Ursachen suchen.',
        'Anstatt|Ohne|Um|Damit',
        'anstatt … zu.',
      ],
      [
        'm',
        '___ viele Schweizer Deutsch können, können nur wenige Rätoromanisch.',
        'Während|Dagegen|Obwohl|Bevor',
        'Subordinada de contraste.',
      ],
      [
        'm',
        'Viele Schweizer können Deutsch, ___ können nur wenige Rätoromanisch.',
        'dagegen|während|dass|indem',
        'Pos. 1 + inversão.',
      ],
    ],
  },
  {
    id: 'ps',
    icon: '🧾',
    title: 'Substitutos do Passiv',
    rule: `sein + -bar/-lich = können + Passiv (lieferbar) · sich lassen + inf. = können + Passiv · sein + zu + inf. = müssen/können + Passiv (Der Termin ist einzuhalten) · haben + zu + inf. = müssen (Du hast das zu befolgen).
Passiv impessoal: Im Herbst wird mit der Ernte begonnen · Den Pflückern wird gratuliert.
Partizip I + zu: die zu lösenden Probleme = die gelöst werden müssen.`,
    questions: [
      [
        'm',
        'Das Buch ist nicht lieferbar. =',
        'kann nicht geliefert werden|muss geliefert werden|wurde nicht geliefert|darf nicht geliefert werden',
        '-bar = können + Passiv.',
      ],
      ['m', 'Führungen ___ sich vereinbaren.', 'lassen|können|werden|sind', 'sich lassen.'],
      [
        'm',
        'Der Termin ist einzuhalten. =',
        'muss eingehalten werden|kann eingehalten werden|wurde eingehalten|wird eingehalten haben',
        'sein + zu = müssen.',
      ],
      [
        'm',
        'Du hast diese Anweisungen zu befolgen. =',
        'Du musst sie befolgen.|Du kannst sie befolgen.|Du darfst sie befolgen.|Du wirst sie befolgen.',
        'haben + zu = müssen.',
      ],
      [
        'o',
        'Aos colhedores se parabeniza.',
        'Den Pflückern wird gratuliert',
        'O Dativ continua; sem sujeito.',
      ],
      [
        'm',
        '‘os problemas que precisam ser resolvidos’:',
        'die zu lösenden Probleme|die gelösten Probleme|die lösenden Probleme|die zu gelösten Probleme',
        'zu + Partizip I.',
      ],
    ],
  },
  {
    id: 'no',
    icon: '🧱',
    title: 'Nominalização e Nomen-Verb',
    rule: `Infinitivo substantivado: das Kochen. Sufixos: die Herstellung, der Ablauf, die Ernte.
Nomen-Verb: ein Praktikum absolvieren, Kontakte knüpfen, Verantwortung übernehmen, eine Rede halten · im Gegensatz stehen zu + Dat. · in Anspruch nehmen + Akk. · unter Druck stehen.
Fugen-s depois de -ung, -heit, -keit, -schaft, -tion: das Diskussionsthema. Sem -s: die Muttersprache.`,
    questions: [
      [
        'm',
        'Infinitivo substantivado de kochen:',
        'das Kochen|der Koch|die Kochung|die Koche',
        'Sempre neutro.',
      ],
      [
        'm',
        'herstellen → (-ung):',
        'die Herstellung|der Herstellung|das Herstellung|die Herstell',
        '-ung → die.',
      ],
      ['m', 'Ein Praktikum ___.', 'absolvieren|knüpfen|halten|stehen', 'Nomen-Verb.'],
      ['m', 'Kontakte ___.', 'knüpfen|absolvieren|übernehmen|halten', 'Kontakte knüpfen.'],
      [
        'm',
        'Diskussion + Thema:',
        'Diskussionsthema|Diskussionthema|Diskussionenthema|Diskussionsthemas',
        '-tion + s.',
      ],
      ['m', 'Seine Taten stehen ___ Gegensatz zu seinen Worten.', 'im|am|in|zum', 'im Gegensatz stehen zu.'],
      [
        'm',
        'Mutter + Sprache:',
        'Muttersprache|Mutterssprache|Mutterensprache|Muttersprachen',
        'Exceção: sem -s-.',
      ],
    ],
  },
  {
    id: 'sa',
    icon: '🧑‍💼',
    title: 'Adjetivos substantivados',
    rule: `Adjetivo/particípio substantivado declina como adjetivo: der Angestellte, den Angestellten, dem Angestellten · ein Angestellter, einen Angestellten.
Neutro abstrato: etwas Neues, nichts Gutes, mit viel Schönem. Também: der/die Mitarbeitende, die Anwesenden.
Indefinidos: jemand, niemand, einer/eine/eines, jeder · etwas, nichts, irgendwelche.`,
    questions: [
      [
        'm',
        'ein ___ (Angestellte, Nominativ masc.)',
        'Angestellter|Angestellte|Angestellten|Angestelltes',
        'ein + -er.',
      ],
      [
        'm',
        'Ich kenne den ___. (Angestellte, Akk.)',
        'Angestellten|Angestellte|Angestellter|Angestelltem',
        'Masc. Akk: -en.',
      ],
      ['m', 'etwas ___ (neu)', 'Neues|Neue|Neuer|Neuen', 'Neutro abstrato: -es.'],
      ['m', 'nichts ___ (gut)', 'Gutes|Gute|Guter|Guten', 'nichts + -es.'],
      ['m', 'mit viel ___ (schön, Dativ)', 'Schönem|Schönes|Schöne|Schönen', 'Dativ sem artigo: -em.'],
      ['m', '‘os presentes’:', 'die Anwesenden|die Anwesende|der Anwesenden|die Anwesend', 'Plural: -en.'],
    ],
  },
  {
    id: 'gp',
    icon: '🎩',
    title: 'Genitiv formal e partículas',
    rule: `Com Genitiv: anlässlich (por ocasião de) · anstelle/anstatt (em vez de) · hinsichtlich/bezüglich (com relação a) · unweit (não longe de) · mitten (mitten in + Dat.).
Partículas: ja (algo sabido ou surpresa) · denn (interesse em perguntas) · doch (encorajar, contradizer) · halt/eben (resignação).`,
    questions: [
      [
        'm',
        '___ seines Geburtstags gab er eine Feier.',
        'Anlässlich|Bezüglich|Unweit|Mitten',
        'Por ocasião de.',
      ],
      [
        'm',
        '___ des Direktors kam seine Sekretärin.',
        'Anstelle|Unweit|Anlässlich|Hinsichtlich',
        'Em vez de.',
      ],
      ['m', 'Das Hotel liegt ___ des Bahnhofs.', 'unweit|anlässlich|bezüglich|anstelle', 'Não longe de.'],
      ['m', 'Ich habe eine Frage ___ Ihrer E-Mail.', 'bezüglich|unweit|anlässlich|mitten', 'Com relação a.'],
      ['m', 'Was machst du ___ hier? (estranhamento)', 'denn|halt|ja|eben', 'denn em perguntas.'],
      ['m', 'Es ist ___ so, man kann nichts ändern.', 'halt|denn|ja|doch', 'Resignação: halt/eben.'],
      ['m', 'Komm ___ herein! (encorajar)', 'doch|denn|eben|ja', 'doch encoraja.'],
    ],
  },
];
