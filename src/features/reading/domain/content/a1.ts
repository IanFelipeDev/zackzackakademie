// Generated from the teacher's Goethe Lesen simulators (ADR-0020). Do not edit by hand; regenerate with
// scratchpad/gen-reading.cjs. Faithful transcription of the exam texts, questions and answer keys.
import type { ReadingExam } from '../reading-exam';

export const A1_READING_EXAMS: readonly ReadingExam[] = [
  {
    id: 'a1-lesen-1',
    level: 'A1',
    title: 'Simulado 1',
    minutes: 25,
    passScore: 9,
    parts: [
      {
        teil: 1,
        instruction: 'Lesen Sie die beiden Texte und entscheiden Sie: Richtig oder Falsch? (Aufgaben 1–5)',
        hint: 'Leia os dois textos e decida se cada afirmação é verdadeira (Richtig) ou falsa (Falsch).',
        texts: [
          {
            label: 'Text 1',
            body: 'Liebe Anna,\nam Samstag habe ich Geburtstag. Ich mache eine Party bei mir zu Hause. Die Party beginnt um 19 Uhr. Kannst du kommen? Mein Bruder kocht eine Suppe und es gibt Pizza. Bitte bring etwas zu trinken mit, vielleicht Cola oder Saft.\nLiebe Grüße,\nLaura',
          },
          {
            label: 'Text 2',
            body: 'Information für alle Deutschschüler:\nDer neue Deutschkurs A2 beginnt nächste Woche am Montag, den 10. Mai. Der Kurs ist von Montag bis Donnerstag, immer von 9:00 bis 12:00 Uhr. Wir treffen uns in Raum 14 im zweiten Stock. Das Kursbuch kostet 25 Euro. Sie können das Buch im Büro kaufen.\nDie Sprachschule',
          },
        ],
        questions: [
          {
            number: 1,
            prompt: 'Laura macht am Sonntag eine Party.',
            answer: 'F',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 2,
            prompt: 'Anna soll Getränke für die Party mitbringen.',
            answer: 'R',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 3,
            prompt: 'Der Kurs ist auch am Freitag.',
            answer: 'F',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 4,
            prompt: 'Die Schüler lernen in Raum 14.',
            answer: 'R',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 5,
            prompt: 'Man kann das Kursbuch in der Schule kaufen.',
            answer: 'R',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
        ],
      },
      {
        teil: 2,
        instruction:
          'Lesen Sie die Situationen und wählen Sie die passende Internetseite, A oder B. (Aufgaben 6–10)',
        hint: 'Leia cada situação e escolha a página da internet correta.',
        questions: [
          {
            number: 6,
            prompt: 'Sie möchten mit dem Zug von München nach Berlin fahren und suchen ein Ticket.',
            answer: 'A',
            choices: [
              {
                label: 'A',
                text: 'www.bahn-tickets-online.de',
              },
              {
                label: 'B',
                text: 'www.hotel-berlin.de',
              },
            ],
          },
          {
            number: 7,
            prompt: 'Sie möchten heute Abend ins Kino gehen und suchen einen guten Film.',
            answer: 'B',
            choices: [
              {
                label: 'A',
                text: 'www.fernseh-programm-heute.de',
              },
              {
                label: 'B',
                text: 'www.kino-programm-stadt.de',
              },
            ],
          },
          {
            number: 8,
            prompt: 'Sie suchen ein billiges, gebrauchtes Fahrrad.',
            answer: 'A',
            choices: [
              {
                label: 'A',
                text: 'www.fahrrad-kaufen-gebraucht.de',
              },
              {
                label: 'B',
                text: 'www.fahrrad-reparatur-schnell.de',
              },
            ],
          },
          {
            number: 9,
            prompt: 'Sie möchten Spanisch lernen und suchen eine Sprachschule in Spanien.',
            answer: 'B',
            choices: [
              {
                label: 'A',
                text: 'www.spanisch-woerterbuch-online.de',
              },
              {
                label: 'B',
                text: 'www.spanisch-lernen-in-madrid.es',
              },
            ],
          },
          {
            number: 10,
            prompt: 'Sie machen Urlaub in Hamburg und suchen ein Zimmer für zwei Nächte.',
            answer: 'A',
            choices: [
              {
                label: 'A',
                text: 'www.hamburg-tourismus.de/hotels',
              },
              {
                label: 'B',
                text: 'www.restaurant-hamburg-hafen.de',
              },
            ],
          },
        ],
      },
      {
        teil: 3,
        instruction:
          'Lesen Sie die Schilder und Hinweise. Ist die Aussage Richtig oder Falsch? (Aufgaben 11–15)',
        hint: 'Leia os avisos e decida se a afirmação é verdadeira ou falsa.',
        questions: [
          {
            number: 11,
            context:
              'Aushang an einer Arztpraxis\n\nUrlaub! Unsere Praxis ist vom 1. August bis zum 15. August geschlossen. Bitte gehen Sie zu Dr. Müller (Hauptstraße 10).',
            prompt: 'Am 10. August ist der Arzt da.',
            answer: 'F',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 12,
            context:
              'Durchsage am Bahnhof\n\nAchtung Fahrgäste! Der Zug nach Frankfurt fährt heute nicht auf Gleis 3 ab. Bitte gehen Sie zu Gleis 5!',
            prompt: 'Der Zug nach Frankfurt fährt von Gleis 5 ab.',
            answer: 'R',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 13,
            context: 'Schild im Restaurant\n\nLiebe Gäste, warme Küche gibt es bei uns nur bis 21:30 Uhr.',
            prompt: 'Sie können um 22:00 Uhr noch ein warmes Essen bestellen.',
            answer: 'F',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 14,
            context: 'Schild im Supermarkt\n\nBitte keine Hunde in den Supermarkt mitbringen!',
            prompt: 'Hunde dürfen nicht in den Supermarkt.',
            answer: 'R',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 15,
            context:
              'Schild an einem Geschäft\n\nÖffnungszeiten: Montag bis Freitag 9:00–18:00 Uhr. Samstag 9:00–13:00 Uhr. Sonntag geschlossen.',
            prompt: 'Am Samstagnachmittag (15 Uhr) können Sie hier einkaufen.',
            answer: 'F',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'a1-lesen-2',
    level: 'A1',
    title: 'Simulado 2',
    minutes: 25,
    passScore: 9,
    parts: [
      {
        teil: 1,
        instruction: 'Lesen Sie die beiden Texte und entscheiden Sie: Richtig oder Falsch? (Aufgaben 1–5)',
        hint: 'Leia os dois textos e decida se cada afirmação é verdadeira (Richtig) ou falsa (Falsch).',
        texts: [
          {
            label: 'Text 1',
            body: 'Hallo Pedro,\ndanke für die Einladung zum Abendessen am Freitag. Ich komme sehr gern! Leider muss ich bis 19 Uhr arbeiten. Ich kann erst um 19:30 Uhr bei dir sein. Ist das okay? Brauchst du noch einen Salat? Ich kann einen Tomatensalat machen.\nBis Freitag!\nJulia',
          },
          {
            label: 'Text 2',
            body: 'Sehr geehrte Frau Schneider,\nIhr Auto ist fertig. Die Reparatur war nicht so teuer. Es kostet 120 Euro. Sie können das Auto heute bis 18 Uhr in der Werkstatt abholen. Morgen haben wir von 8 bis 14 Uhr geöffnet. Bitte bringen Sie das Geld bar mit, wir nehmen keine Karten.\nMit freundlichen Grüßen,\nAutowerkstatt Schmidt',
          },
        ],
        questions: [
          {
            number: 1,
            prompt: 'Pedro lädt Julia zum Abendessen ein.',
            answer: 'R',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 2,
            prompt: 'Julia kommt am Freitag um 19:00 Uhr.',
            answer: 'F',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 3,
            prompt: 'Die Reparatur kostet 120 Euro.',
            answer: 'R',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 4,
            prompt: 'Frau Schneider muss heute vor 18 Uhr kommen.',
            answer: 'F',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 5,
            prompt: 'Man kann in der Werkstatt mit Kreditkarte bezahlen.',
            answer: 'F',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
        ],
      },
      {
        teil: 2,
        instruction:
          'Lesen Sie die Situationen und wählen Sie die passende Internetseite, A oder B. (Aufgaben 6–10)',
        hint: 'Leia cada situação e escolha a página da internet correta.',
        questions: [
          {
            number: 6,
            prompt: 'Sie möchten am Wochenende kochen und suchen ein Rezept für einen Schokoladenkuchen.',
            answer: 'A',
            choices: [
              {
                label: 'A',
                text: 'www.backen-und-kochen.de',
              },
              {
                label: 'B',
                text: 'www.restaurant-suche.de',
              },
            ],
          },
          {
            number: 7,
            prompt: 'Sie suchen eine neue Arbeit als Kellner in Berlin.',
            answer: 'A',
            choices: [
              {
                label: 'A',
                text: 'www.berlin-jobs-gastro.de',
              },
              {
                label: 'B',
                text: 'www.ausbildung-informatik-berlin.de',
              },
            ],
          },
          {
            number: 8,
            prompt: 'Sie haben am Wochenende frei und möchten wissen, ob es regnet oder die Sonne scheint.',
            answer: 'A',
            choices: [
              {
                label: 'A',
                text: 'www.wetter-online-heute.de',
              },
              {
                label: 'B',
                text: 'www.nachrichten-welt.de',
              },
            ],
          },
          {
            number: 9,
            prompt: 'Ihr Laptop ist kaputt und Sie möchten einen neuen Computer im Internet kaufen.',
            answer: 'B',
            choices: [
              {
                label: 'A',
                text: 'www.computer-reparatur-service.de',
              },
              {
                label: 'B',
                text: 'www.elektronik-kaufen-24.de',
              },
            ],
          },
          {
            number: 10,
            prompt: 'Sie fliegen nach Italien und brauchen ein Auto für den Urlaub.',
            answer: 'A',
            choices: [
              {
                label: 'A',
                text: 'www.auto-mieten-italien.it',
              },
              {
                label: 'B',
                text: 'www.italien-flug-buchen.de',
              },
            ],
          },
        ],
      },
      {
        teil: 3,
        instruction:
          'Lesen Sie die Schilder und Hinweise. Ist die Aussage Richtig oder Falsch? (Aufgaben 11–15)',
        hint: 'Leia os avisos e decida se a afirmação é verdadeira ou falsa.',
        questions: [
          {
            number: 11,
            context: 'Schild im Park\n\nGrillen ist hier im Park verboten!',
            prompt: 'Sie dürfen im Park Fleisch grillen.',
            answer: 'F',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 12,
            context: 'Schild am Aufzug\n\nAufzug außer Betrieb! Bitte die Treppe benutzen.',
            prompt: 'Sie müssen laufen, der Aufzug ist kaputt.',
            answer: 'R',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 13,
            context: 'Schild an der Bank\n\nKasse von 12:30 bis 13:30 Uhr geschlossen. Mittagspause.',
            prompt: 'Um 13:00 Uhr bekommen Sie hier kein Geld.',
            answer: 'R',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 14,
            context: 'Hinweis an der Theaterkasse\n\nKarten für das Konzert am Samstag sind ausverkauft.',
            prompt: 'Sie können noch Tickets für Samstag kaufen.',
            answer: 'F',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 15,
            context: 'Schild im Bus\n\nBitte beim Einsteigen die Fahrkarten zeigen!',
            prompt: 'Sie müssen Ihr Ticket zeigen, wenn Sie in den Bus gehen.',
            answer: 'R',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'a1-lesen-3',
    level: 'A1',
    title: 'Simulado 3',
    minutes: 25,
    passScore: 9,
    parts: [
      {
        teil: 1,
        instruction: 'Lesen Sie die beiden Texte und entscheiden Sie: Richtig oder Falsch? (Aufgaben 1–5)',
        hint: 'Leia os dois textos e decida se cada afirmação é verdadeira (Richtig) ou falsa (Falsch).',
        texts: [
          {
            label: 'Text 1',
            body: 'Liebe Maria,\nviele Grüße aus dem Urlaub in Österreich! Das Wetter ist toll, die Sonne scheint jeden Tag. Wir wandern viel in den Bergen. Das Hotel ist sehr schön und das Essen schmeckt fantastisch. Nächste Woche am Dienstag fliegen wir wieder nach Hause.\nDeine Sabine',
          },
          {
            label: 'Text 2',
            body: 'Wohnung zu vermieten\nSchöne Wohnung im Stadtzentrum zu vermieten. Die Wohnung hat 3 Zimmer, eine Küche und ein Bad. Sie ist 75 Quadratmeter groß. Die Miete kostet 800 Euro im Monat plus Nebenkosten. Ab dem 1. September ist die Wohnung frei. Haustiere sind nicht erlaubt!\nTelefon: 0151-987654',
          },
        ],
        questions: [
          {
            number: 1,
            prompt: 'Sabine macht Urlaub am Meer in Italien.',
            answer: 'F',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 2,
            prompt: 'Sabine reist am Dienstag zurück.',
            answer: 'R',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 3,
            prompt: 'Die Wohnung kostet 800 Euro pro Monat.',
            answer: 'R',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 4,
            prompt: 'Man kann einen Hund in die Wohnung mitbringen.',
            answer: 'F',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 5,
            prompt: 'Die Wohnung hat drei Zimmer.',
            answer: 'R',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
        ],
      },
      {
        teil: 2,
        instruction:
          'Lesen Sie die Situationen und wählen Sie die passende Internetseite, A oder B. (Aufgaben 6–10)',
        hint: 'Leia cada situação e escolha a página da internet correta.',
        questions: [
          {
            number: 6,
            prompt: 'Sie möchten am Wochenende mit Ihrer Partnerin tanzen lernen.',
            answer: 'A',
            choices: [
              {
                label: 'A',
                text: 'www.tanzschule-schritt-fuer-schritt.de',
              },
              {
                label: 'B',
                text: 'www.musik-kaufen.de',
              },
            ],
          },
          {
            number: 7,
            prompt: 'Ihr Hund ist krank. Sie suchen einen Arzt für Tiere.',
            answer: 'A',
            choices: [
              {
                label: 'A',
                text: 'www.tierarzt-praxis-huber.de',
              },
              {
                label: 'B',
                text: 'www.hundefutter-online.de',
              },
            ],
          },
          {
            number: 8,
            prompt: 'Sie brauchen neue Winterstiefel und möchten sie online bestellen.',
            answer: 'B',
            choices: [
              {
                label: 'A',
                text: 'www.schuh-reparatur-zentrale.de',
              },
              {
                label: 'B',
                text: 'www.schuhe-und-stiefel-kaufen.de',
              },
            ],
          },
          {
            number: 9,
            prompt: 'Sie möchten ein Sofa kaufen, haben aber nicht viel Geld.',
            answer: 'B',
            choices: [
              {
                label: 'A',
                text: 'www.moebel-design-luxus.de',
              },
              {
                label: 'B',
                text: 'www.moebel-gebraucht-guenstig.de',
              },
            ],
          },
          {
            number: 10,
            prompt: 'Sie müssen Deutsch für Ihren Beruf üben und suchen Übungen im Internet.',
            answer: 'A',
            choices: [
              {
                label: 'A',
                text: 'www.deutsch-lernen-uebungen.de',
              },
              {
                label: 'B',
                text: 'www.buchhandlung-deutschland.de',
              },
            ],
          },
        ],
      },
      {
        teil: 3,
        instruction:
          'Lesen Sie die Schilder und Hinweise. Ist die Aussage Richtig oder Falsch? (Aufgaben 11–15)',
        hint: 'Leia os avisos e decida se a afirmação é verdadeira ou falsa.',
        questions: [
          {
            number: 11,
            context: 'Schild im Krankenhaus\n\nBitte im Krankenhaus nicht rauchen und Handys ausschalten!',
            prompt: 'Sie dürfen hier nicht telefonieren.',
            answer: 'R',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 12,
            context: 'Schild in der Waschküche\n\nWaschmaschine kaputt! Bitte Maschine 4 oder 5 benutzen.',
            prompt: 'Sie können hier waschen, aber Sie müssen Maschine 4 oder 5 nehmen.',
            answer: 'R',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 13,
            context: 'Schild an der Bibliothek\n\nRuhe bitte! Bitte leise sprechen.',
            prompt: 'Sie dürfen in der Bibliothek laut Musik hören.',
            answer: 'F',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 14,
            context:
              'Hinweis an der Haltestelle\n\nDie Haltestelle ist wegen Bauarbeiten 100 Meter weiter vorne.',
            prompt: 'Der Bus hält an der normalen Haltestelle.',
            answer: 'F',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 15,
            context:
              'Schild an der Supermarktkasse\n\nHeute leider keine Kartenzahlung möglich. Nur Bargeld!',
            prompt: 'Sie können Ihre Äpfel heute nicht mit Karte bezahlen.',
            answer: 'R',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'a1-lesen-4',
    level: 'A1',
    title: 'Simulado 4',
    minutes: 25,
    passScore: 9,
    parts: [
      {
        teil: 1,
        instruction: 'Lesen Sie die beiden Texte und entscheiden Sie: Richtig oder Falsch? (Aufgaben 1–5)',
        hint: 'Leia os dois textos e decida se cada afirmação é verdadeira (Richtig) ou falsa (Falsch).',
        texts: [
          {
            label: 'Text 1',
            body: 'Lieber Herr Bauer,\nhier ist ein Paket für Sie. Der Postbote war heute Morgen da, aber Sie waren nicht zu Hause. Ich habe das Paket für Sie angenommen. Ich bin heute Abend ab 18 Uhr in meiner Wohnung (Nummer 12). Sie können das Paket dann abholen.\nIhr Nachbar, Thomas Klein',
          },
          {
            label: 'Text 2',
            body: 'Hotelreservierung bestätigt\nSehr geehrte Frau Weber,\nvielen Dank für Ihre Buchung. Wir reservieren für Sie ein Einzelzimmer vom 10. bis zum 12. Oktober. Das Frühstück ist im Preis inklusive. Das Frühstücksbuffet gibt es jeden Morgen von 7:00 bis 10:00 Uhr. Sie können ab 14:00 Uhr einchecken. Wir wünschen Ihnen eine gute Reise!\nIhr Hotel zur Post',
          },
        ],
        questions: [
          {
            number: 1,
            prompt: 'Herr Bauer hat das Paket heute Morgen selbst bekommen.',
            answer: 'F',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 2,
            prompt: 'Herr Bauer kann das Paket um 19 Uhr bei Thomas Klein abholen.',
            answer: 'R',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 3,
            prompt: 'Frau Weber hat ein Doppelzimmer gebucht.',
            answer: 'F',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 4,
            prompt: 'Frau Weber muss für das Frühstück extra bezahlen.',
            answer: 'F',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 5,
            prompt: 'Das Frühstück gibt es bis zehn Uhr.',
            answer: 'R',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
        ],
      },
      {
        teil: 2,
        instruction:
          'Lesen Sie die Situationen und wählen Sie die passende Internetseite, A oder B. (Aufgaben 6–10)',
        hint: 'Leia cada situação e escolha a página da internet correta.',
        questions: [
          {
            number: 6,
            prompt: 'Sie möchten wissen, wann das Flugzeug von Ihrem Freund aus München heute landet.',
            answer: 'A',
            choices: [
              {
                label: 'A',
                text: 'www.flughafen-frankfurt-ankunft.de',
              },
              {
                label: 'B',
                text: 'www.flug-tickets-kaufen.de',
              },
            ],
          },
          {
            number: 7,
            prompt: 'Sie möchten Sport machen und suchen ein Studio mit Gewichten und Kursen.',
            answer: 'A',
            choices: [
              {
                label: 'A',
                text: 'www.fitnessstudio-power.de',
              },
              {
                label: 'B',
                text: 'www.sportkleidung-kaufen.de',
              },
            ],
          },
          {
            number: 8,
            prompt: 'Ihre Haare sind zu lang. Sie möchten einen Termin beim Friseur machen.',
            answer: 'B',
            choices: [
              {
                label: 'A',
                text: 'www.kosmetik-kaufen.de',
              },
              {
                label: 'B',
                text: 'www.friseur-salon-haarmode.de',
              },
            ],
          },
          {
            number: 9,
            prompt: 'Sie möchten am Samstag feiern gehen und suchen eine Diskothek.',
            answer: 'A',
            choices: [
              {
                label: 'A',
                text: 'www.club-und-party-berlin.de',
              },
              {
                label: 'B',
                text: 'www.tanzkurs-fuer-anfaenger.de',
              },
            ],
          },
          {
            number: 10,
            prompt: 'Sie lesen gerne. Sie suchen ein neues Buch von einem deutschen Autor.',
            answer: 'B',
            choices: [
              {
                label: 'A',
                text: 'www.bibliothek-oeffnungszeiten.de',
              },
              {
                label: 'B',
                text: 'www.buchhandel-online.de',
              },
            ],
          },
        ],
      },
      {
        teil: 3,
        instruction:
          'Lesen Sie die Schilder und Hinweise. Ist die Aussage Richtig oder Falsch? (Aufgaben 11–15)',
        hint: 'Leia os avisos e decida se a afirmação é verdadeira ou falsa.',
        questions: [
          {
            number: 11,
            context: 'Schild auf der Toilette\n\nToiletten sind außer Betrieb. Nächste Toilette im 1. Stock.',
            prompt: 'Sie können diese Toilette nicht benutzen.',
            answer: 'R',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 12,
            context:
              'Schild im Hausflur\n\nBitte Fahrräder nicht im Hausflur abstellen. Bitte den Fahrradkeller benutzen!',
            prompt: 'Sie sollen Ihr Fahrrad in den Fahrradkeller stellen.',
            answer: 'R',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 13,
            context:
              'Hinweis am Fahrkartenautomaten\n\nAutomat nimmt nur Münzen. Keine Scheine, keine Karten!',
            prompt: 'Sie können hier mit einem 10-Euro-Schein bezahlen.',
            answer: 'F',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 14,
            context: 'Schild vor einer Garage\n\nEinfahrt freihalten! Parken verboten.',
            prompt: 'Sie dürfen hier Ihr Auto parken.',
            answer: 'F',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
          {
            number: 15,
            context:
              'Aushang in der Sprachschule\n\nAm Freitag, 20. Mai, fällt der Deutschkurs aus. Die Lehrerin ist krank.',
            prompt: 'Am Freitag haben die Schüler Deutschunterricht.',
            answer: 'F',
            choices: [
              {
                label: 'R',
                text: 'Richtig',
              },
              {
                label: 'F',
                text: 'Falsch',
              },
            ],
          },
        ],
      },
    ],
  },
];
