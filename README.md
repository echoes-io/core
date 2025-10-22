# @echoes-io/utils

Utilities and types for **Echoes** - a multi-POV digital storytelling platform.

## Overview

This package provides shared utilities used across the Echoes ecosystem:
- Web application (Next.js)
- CLI tools
- MCP server
- LaTeX/PDF builder

## Installation

```bash
npm install @echoes-io/utils
```

## Features

### Markdown Parser

Parse markdown files with YAML frontmatter to extract chapter metadata and content.

```typescript
import { parseMarkdown, stripMarkdown } from '@echoes-io/utils';

const markdown = `---
pov: "alice"
title: "First Meeting"
date: "2024-01-01"
timeline: "main"
arc: "introduction"
episode: 1
part: 1
chapter: 1
excerpt: "Alice meets Bob for the first time"
location: "coffee shop"
outfit: "red dress"
kink: "slow burn"
---

# Chapter 1

Alice walked into the coffee shop...`;

const { metadata, content } = parseMarkdown(markdown);
console.log(metadata.pov); // "alice"
console.log(content); // "# Chapter 1\n\nAlice walked..."

// Remove markdown syntax
const plainText = stripMarkdown(content);
console.log(plainText); // "Chapter 1\n\nAlice walked..."
```

**Functions:**
- `parseMarkdown()` - Extract frontmatter and content from markdown
- `stripMarkdown()` - Remove markdown syntax from text

**Metadata Fields:**
- `pov` - Point of view character
- `title` - Chapter title
- `date` - Chapter date
- `timeline` - Timeline identifier
- `arc` - Story arc
- `episode`, `part`, `chapter` - Numeric identifiers
- `excerpt` - Brief description
- `location` - Setting location
- `outfit` - Character outfit (optional)
- `kink` - Content tags (optional)

### Text Statistics

Calculate word count and reading statistics from markdown content.

```typescript
import { getTextStats } from '@echoes-io/utils';

const markdown = `
# Chapter Title

This is **bold** and *italic* text with [a link](https://example.com).
`;

const stats = getTextStats(markdown);
console.log(stats);
// {
//   words: 9,
//   characters: 52,
//   charactersNoSpaces: 43,
//   paragraphs: 1,
//   sentences: 1,
//   readingTimeMinutes: 1
// }
```

**Features:**
- Automatically removes markdown syntax using `stripMarkdown()`
- Removes HTML tags and comments
- Removes frontmatter YAML
- Counts words, characters (with/without spaces), paragraphs, sentences
- Calculates reading time (based on 200 words/minute)

### Path Utilities

Generate chapter files following Echoes naming conventions.

```typescript
import { generateChapterFile } from '@echoes-io/utils';

const metadata = {
  pov: 'Alice',
  title: 'First Meeting',
  date: '2024-01-01',
  timeline: 'main',
  arc: 'Introduction Arc',
  episode: 1,
  part: 1,
  chapter: 5,
  excerpt: 'Alice meets Bob for the first time',
  location: 'Coffee Shop',
  outfit: 'Red dress',
  kink: 'Slow burn'
};

const file = generateChapterFile(metadata, 'Alice walked into the coffee shop...');

console.log(file.path);
// → content/introduction-arc/ep01-first-meeting/ep01-ch005-alice-first-meeting.md

console.log(file.content);
// → ---
//   pov: "Alice"
//   title: "First Meeting"
//   episode: 1
//   chapter: 5
//   ...
//   ---
//   
//   Alice walked into the coffee shop...
```

**File Structure Convention:**
```
content/
├── <arc-name>/
│   └── <ep01-episode-title>/
│       └── <ep01-ch001-pov-title>.md
```

**Features:**
- Automatic path generation from metadata
- Complete file with frontmatter and content
- Handles special characters in titles (slugification)
- Proper padding for episode (01) and chapter (001) numbers

## Content Publishing Workflow

This repository provides a reusable GitHub Actions workflow for processing and publishing timeline content.

### Usage in Timeline Repositories

1. **Create workflow file** in your timeline repo at `.github/workflows/publish.yml`:

```yaml
name: Publish Timeline Content

on:
  push:
    branches: [main]
    paths: ['content/**/*.md']
  workflow_dispatch:

jobs:
  publish:
    uses: echoes-io/utils/.github/workflows/publish-content.yml@main
    with:
      timeline-name: 'main'  # Change this for each timeline
      content-path: 'content/'
      web-app-url: 'https://your-web-app.com'
    secrets:
      WEB_APP_TOKEN: ${{ secrets.WEB_APP_TOKEN }}
```

2. **Add secret** in your timeline repo:
   - Go to Settings → Secrets and variables → Actions
   - Add `WEB_APP_TOKEN` with your web app authentication token

3. **Organize content** in your timeline repo:
```
timeline-repo/
├── content/
│   ├── arc1/
│   │   ├── chapter1.md
│   │   └── chapter2.md
│   └── arc2/
│       └── chapter3.md
└── .github/workflows/publish.yml
```

### What the Workflow Does

- **Processes** all `.md` files in the specified directory
- **Extracts** frontmatter metadata using `parseMarkdown()`
- **Calculates** text statistics using `getTextStats()`
- **Uploads** processed content to your web app via API
- **Triggers** automatically on content changes or manually

### API Payload Format

The workflow sends processed content as JSON:

```json
[
  {
    "file": "content/arc1/chapter1.md",
    "metadata": {
      "pov": "alice",
      "title": "First Meeting",
      "timeline": "main",
      "arc": "introduction",
      "episode": 1,
      "part": 1,
      "chapter": 1
    },
    "content": "# Chapter 1\n\nContent here...",
    "stats": {
      "words": 150,
      "readingTimeMinutes": 1
    },
    "lastModified": "2024-01-01T12:00:00.000Z"
  }
]
```

## Project Structure

```
utils/
├── lib/              # Source code
│   ├── index.ts      # Public API exports
│   ├── types.ts      # TypeScript interfaces
│   ├── markdown-parser.ts  # Markdown parsing & stripping
│   ├── text-stats.ts # Text statistics calculation
│   └── path-utils.ts # Chapter file generation
├── test/             # Tests
│   ├── index.test.ts
│   ├── markdown-parser.test.ts
│   ├── text-stats.test.ts
│   └── path-utils.test.ts
└── package.json
```

## Development

### Scripts

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Release (automated via GitHub Actions)
npm run release
```

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for automated versioning:

- `feat:` - New features (minor version bump)
- `fix:` - Bug fixes (patch version bump)  
- `feat!:` or `BREAKING CHANGE:` - Breaking changes (major version bump)
- `docs:`, `style:`, `refactor:`, `test:`, `chore:` - No version bump

Examples:
```bash
git commit -m "feat: add stripMarkdown function"
git commit -m "fix: handle empty frontmatter correctly"
git commit -m "feat!: change parseMarkdown return type"
```

### Tech Stack

- **Language**: TypeScript (strict mode)
- **Testing**: Vitest
- **Linting**: Biome
- **Git Hooks**: Husky + lint-staged

### Adding New Utilities

1. Create file in `lib/`
2. Create test in `test/`
3. Export from `index.ts`
4. Run tests: `npm test`
5. Lint: `npm run lint:fix`

## Dependencies

### Runtime
- `gray-matter` - Parse YAML frontmatter from markdown
- `remove-markdown` - Strip markdown syntax for text analysis

### Development
- `typescript` - Type checking and compilation
- `vitest` - Testing framework
- `@biomejs/biome` - Linting and formatting
- `husky` - Git hooks
- `lint-staged` - Pre-commit linting

## License

MIT
