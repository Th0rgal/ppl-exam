# PPL Portugal Exam Prep

Local-first web application for PPL exam preparation, focused on NAV Portugal (AIS/AIP) and IPMA (weather) official sources.

## Features

- **Dashboard** - Daily drill plan, streak tracking, progress stats
- **Learn** - Study modules (GEN 2.2, 2.3, ENR 1.2, METAR/TAF, etc.)
- **Decode** - METAR/TAF decoder with step-by-step explanation + VMC check
- **Drills** - Timed exercises (symbols, weather, abbreviations)
- **Tests** - Exam mode with immediate feedback and explanations
- **Library** - Links to official PDFs (eAIP, VAC, IPMA)
- **Settings** - Configure aircraft, aerodrome, units, export data

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Lucide React (icons)
- IndexedDB (offline storage via idb)
- FlexSearch (offline search)

## Getting Started

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Build for production
bun run build

# Serve static export
bun run start
```

## Data Structure

Content is organized in `src/data/`:

- `abbreviations.json` - AIP abbreviations (GEN 2.2)
- `symbols.json` - Chart symbols (GEN 2.3)
- `exercises.json` - Practice exercises
- `glossary.json` - Term definitions
- `settings.json` - Default settings

## Adding Content

### Add new exercise

Edit `src/data/exercises.json`:

```json
{
  "id": "ex-xxx",
  "type": "multiple-choice|flashcard|decode|triage",
  "prompt": "Question or prompt",
  "category": "Topic",
  "solution": "Answer",
  "hints": ["Hint 1"],
  "references": [{ "source": "NAV Portugal", "doc": "GEN 2.2", "section": "Abbrev" }]
}
```

### Add abbreviation/symbol

Edit `src/data/abbreviations.json` or `src/data/symbols.json`.

## Official Sources

- [NAV Portugal eAIP](https://ais.nav.pt/aip/)
- [IPMA Aviation](https://www.ipma.pt/pt/aviation/)
- [eVFR Manual Portugal](https://ais.nav.pt/)

## License

Educational use only. Content references official NAV Portugal and IPMA publications.
