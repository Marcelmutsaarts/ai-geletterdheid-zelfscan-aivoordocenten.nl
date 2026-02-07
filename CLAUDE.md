# AI-geletterdheid Zelfscan - aivoordocenten.nl

## Project overview
Een interactieve zelfscan waarmee docenten hun AI-geletterdheid meten. Gebruikers beantwoorden 10 Ja/Nee-stellingen over 5 AI-thema's in het onderwijs en krijgen een niveau-inschatting: **Nog niet op basisniveau** (0-6 Ja) of **Basisniveau bereikt** (7-10 Ja). Het is een losstaand instrument zonder verwijzingen naar specifieke cursussen.

## Tech stack
- **Framework**: React 18 + TypeScript
- **Build tool**: Vite 5
- **Styling**: Tailwind CSS 3 met custom design tokens
- **Package manager**: npm

## Commando's
- `npm run dev` — Start dev server (Vite)
- `npm run build` — TypeScript check + productie build
- `npm run preview` — Preview productie build

## Projectstructuur
```
src/
├── App.tsx                    # Hoofdcomponent met state management en flow (welcome → selfscan → results)
├── main.tsx                   # Entry point
├── index.css                  # Tailwind directives + custom utilities (glass-card, dotted-pattern)
├── components/
│   ├── Button.tsx             # Herbruikbare button (primary/ghost, button/link)
│   ├── ProgressBar.tsx        # Voortgangsbalk voor de zelfscan
│   ├── SelfScanFlow.tsx       # Vraagweergave met Ja/Nee knoppen
│   └── ResultsScreen.tsx      # Resultaatpagina met score en advies
└── data/
    └── selfScan.ts            # 10 zelfscan-items over 5 thema's (2 per thema)
```

## Design tokens (Tailwind)
- `primaryPurple`: #a15df5
- `lightPurpleBg`: #ebdfff
- `darkPurple`: #7947ba
- `grayText`: #4a5568
- `ink`: #000000
- `shadow-card`: paarse schaduw

## App flow
1. **Welcome** — Startpagina met uitleg en "Start zelfscan" knop
2. **Selfscan** — 10 stellingen, één per keer, Ja/Nee antwoord, met voortgangsbalk
3. **Results** — Score (X/10), niveau badge, generiek advies, en overzicht per stelling:
   - Nog niet op basisniveau (0-6 Ja) → bemoedigend advies om kennis te verdiepen
   - Basisniveau bereikt (7-10 Ja) → compliment en aanmoediging om bij te blijven

## Conventies
- Taal in UI: Nederlands
- Commit messages: Nederlands
- Componenten: functionele React componenten met TypeScript interfaces
- Styling: Tailwind utility classes, custom utilities in index.css
