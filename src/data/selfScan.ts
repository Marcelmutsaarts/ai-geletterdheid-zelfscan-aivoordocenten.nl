export interface SelfScanItem {
  id: number;
  theme: string;
  statement: string;
}

export const selfScanItems: SelfScanItem[] = [
  {
    id: 1,
    theme: 'Hoe werkt generatieve AI?',
    statement: 'Ik weet hoe een LLM werkt en kan dat helder aan een collega uitleggen.'
  },
  {
    id: 2,
    theme: 'Prompting',
    statement: 'Ik weet hoe ik een goede prompt moet opbouwen.'
  },
  {
    id: 3,
    theme: 'Custom chatbots',
    statement: 'Ik weet hoe ik een custom chatbot bouw en hoe ik custom instructions vormgeef.'
  },
  {
    id: 4,
    theme: 'Vibecoden',
    statement: 'Ik begrijp hoe frontend, database en chatbot-integratie samenwerken in een AI-app.'
  },
  {
    id: 5,
    theme: 'Risico\'s van AI',
    statement: 'Ik kan de belangrijkste risico\'s van AI inschatten (privacy, bias, hallucineren, duurzaamheid, cognitive offloading) en passende maatregelen nemen.'
  },
  {
    id: 6,
    theme: 'AI-ready toetsing',
    statement: 'Ik kan een toets AI-ready maken.'
  },
  {
    id: 7,
    theme: 'Toekomst van AI',
    statement: 'Ik heb inzicht in de ontwikkelingen van AI en weet hoe ik deze ontwikkelingen bij kan houden.'
  },
  {
    id: 8,
    theme: 'Adoptie & verandermanagement',
    statement: 'Ik weet hoe ik collega\'s meekrijg in verantwoorde AI-adoptie op onze school.'
  }
];