# @echoes-io/core

Core utilities and types for **Echoes** - a multi-POV digital storytelling platform.

## Overview

This package provides shared utilities used across the Echoes ecosystem:
- Web application (Next.js)
- CLI tools
- MCP server
- LaTeX/PDF builder

## Installation

```bash
npm install @echoes-io/core
```

## Features

### Text Statistics

Calculate word count and reading statistics from markdown content.

```typescript
import { getTextStats } from '@echoes-io/core';

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
- Removes markdown syntax (bold, italic, links, code blocks, etc.)
- Removes HTML tags and comments
- Removes frontmatter YAML
- Counts words, characters (with/without spaces), paragraphs, sentences
- Calculates reading time (based on 200 words/minute)

## Project Structure

```
core/
├── lib/              # Source code
│   └── text-stats.ts
├── test/             # Tests
│   └── text-stats.test.ts
├── index.ts          # Public API exports
└── package.json
```

## Development

### Scripts

```bash
# Run tests
npm test

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
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
- `remove-markdown` - Strip markdown syntax for text analysis

### Development
- `typescript` - Type checking and compilation
- `vitest` - Testing framework
- `@biomejs/biome` - Linting and formatting
- `husky` - Git hooks
- `lint-staged` - Pre-commit linting

## License

MIT