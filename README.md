# PPL Portugal Exam Prep

Local-first web application for PPL exam preparation, focused on NAV Portugal (AIS/AIP) and IPMA (weather) official sources.

## Features

- **Dashboard** - Daily drill plan (25-35 min), streak tracking, progress stats, 80/20 study plan
- **Learn** - Study modules (GEN 2.2, 2.3, ENR 1.2, METAR/TAF, etc.)
- **Glossary** - Quick reference for aviation terms (RMZ, TMZ, QDM, QDR, etc.)
- **Decode** - METAR/TAF decoder with step-by-step explanation + VMC check
- **Performance** - Density altitude calculator + weight & balance
- **Drills** - Timed exercises (symbols, weather, abbreviations, NOTAM triage)
- **Daily Drill** - 15 exercises in 25 minutes (flashcards + METAR decode)
- **Tests** - Exam mode with timed sessions and immediate feedback
- **Library** - Links to official PDFs (eAIP, VAC, IPMA)
- **Settings** - Configure aircraft (C152/PA28/DA40), aerodrome, units, export/import

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Lucide React (icons)
- IndexedDB (offline storage via idb)
- FlexSearch (offline search)
- Bun / pnpm

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

## Deployment

### Static Export (recommended for offline use)

```bash
bun run build
# Output is in ./out directory
# Can be served by any static host (Netlify, Vercel, GitHub Pages)
```

### Deploy to Netlify

```bash
# Build
bun run build

# Deploy the out/ folder to Netlify
netlify deploy --dir=out
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## Data Structure

Content is organized in `src/data/`:

| File | Description |
|------|-------------|
| `abbreviations.json` | 110+ AIP abbreviations (GEN 2.2) |
| `symbols.json` | 50+ chart symbols (GEN 2.3) |
| `exercises.json` | 30 practice exercises |
| `glossary.json` | 28 term definitions |
| `settings.json` | Default settings |

## Adding Content

### Add new exercise

Edit `src/data/exercises.json`:

```json
{
  "id": "ex-031",
  "type": "multiple-choice",
  "prompt": "Your question here",
  "category": "Topic",
  "solution": "Correct answer",
  "hints": ["Optional hint"],
  "references": [{ "source": "NAV Portugal", "doc": "GEN 2.2", "section": "Abbrev" }]
}
```

**Exercise types:**
- `flashcard` - Show prompt, reveal answer
- `multiple-choice` - 4 options
- `decode` - METAR/TAF parsing
- `triage` - NOTAM impact assessment
- `track-distance` - Route calculation
- `performance` - POH calculations

### Add abbreviation

Edit `src/data/abbreviations.json`:

```json
{
  "id": "abbr-111",
  "acronym": "NEW",
  "expansion": "New Abbreviation",
  "meaning": "Definition",
  "context": "Usage context",
  "references": [{ "source": "NAV Portugal", "doc": "GEN 2.2", "section": "Abbrev" }]
}
```

### Add symbol

Edit `src/data/symbols.json`:

```json
{
  "id": "sym-051",
  "name": "Symbol Name",
  "icon": "emoji",
  "meaning": "Description",
  "operationalImplication": "What to do",
  "references": [{ "source": "NAV Portugal", "doc": "GEN 2.3", "section": "Chart" }]
}
```

## Content Guidelines

All content should reference official sources:

- **NAV Portugal** - eAIP (GEN, ENR, AD sections)
- **IPMA** - METAR/TAF/SIGMET formats
- **POH** - Aircraft performance tables

Each reference should include:
- `source`: NAV Portugal / IPMA / POH
- `doc`: Document (e.g., GEN 2.2, METAR)
- `section`: Specific section

## Offline Use

The app works offline via:
- Static export (`bun run build`)
- IndexedDB for progress storage
- Local JSON data files

## Official Sources

- [NAV Portugal eAIP](https://ais.nav.pt/aip/)
- [IPMA Aviation](https://www.ipma.pt/pt/aviation/)
- [eVFR Manual Portugal](https://ais.nav.pt/)

## License

Educational use only. Content references official NAV Portugal and IPMA publications.
