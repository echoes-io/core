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

## Project Structure

```
utils/
├── lib/              # Source code
│   ├── index.ts      # Public API exports
│   ├── types.ts      # TypeScript interfaces
│   ├── markdown-parser.ts  # Markdown parsing & stripping
│   └── text-stats.ts # Text statistics calculation
├── test/             # Tests
│   ├── index.test.ts
│   ├── markdown-parser.test.ts
│   └── text-stats.test.ts
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
