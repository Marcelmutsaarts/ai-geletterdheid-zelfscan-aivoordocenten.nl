export interface SelfScanItem {
  id: number;
  theme: string;
  statement: string;
}

export const selfScanItems: SelfScanItem[] = [
  // Thema 1: Wat is generatieve AI & basis prompting
  {
    id: 1,
    theme: 'Generatieve AI & prompting',
    statement: 'Ik kan in eigen woorden uitleggen wat generatieve AI is en hoe een taalmodel (LLM) globaal werkt.'
  },
  {
    id: 2,
    theme: 'Generatieve AI & prompting',
    statement: 'Ik kan een gestructureerde prompt schrijven om bruikbare output te krijgen.'
  },
  // Thema 2: AI-ready toetsen
  {
    id: 3,
    theme: 'AI-ready toetsen',
    statement: 'Ik weet welke toetsvormen kwetsbaar zijn voor AI-gebruik door studenten.'
  },
  {
    id: 4,
    theme: 'AI-ready toetsen',
    statement: 'Ik kan een toets zo (her)ontwerpen dat deze ook in het AI-tijdperk valide meet wat ik wil meten.'
  },
  // Thema 3: AI als assistent van de docent
  {
    id: 5,
    theme: 'AI als assistent van de docent',
    statement: 'Ik weet hoe ik AI kan inzetten voor lesvoorbereiding, het maken van toetsvragen of het geven van feedback.'
  },
  {
    id: 6,
    theme: 'AI als assistent van de docent',
    statement: 'Ik weet hoe ik een custom chatbot kan bouwen en inzetten voor mijn onderwijs.'
  },
  // Thema 4: AI als versterker van het leerproces
  {
    id: 7,
    theme: 'AI als versterker van het leerproces',
    statement: 'Ik kan AI inzetten om gepersonaliseerde oefenstof of leeractiviteiten te maken voor studenten, gebaseerd op onderwijskundige rollen.'
  },
  {
    id: 8,
    theme: 'AI als versterker van het leerproces',
    statement: 'Ik weet hoe ik een interactieve AI-leeromgeving kan opzetten die studenten activeert en motiveert.'
  },
  // Thema 5: Verantwoord AI-gebruik
  {
    id: 9,
    theme: 'Verantwoord AI-gebruik',
    statement: 'Ik kan de belangrijkste risico\'s van AI in onderwijs uitleggen en er rekening mee houden, zoals bias, hallucinaties, privacy en cognitive offloading.'
  },
  {
    id: 10,
    theme: 'Verantwoord AI-gebruik',
    statement: 'Ik heb een beeld van hoe een verantwoord kader voor AI-gebruik eruitziet binnen mijn onderwijscontext.'
  }
];
