import { describe, expect, test } from 'vitest';

import type {
  ChapterMetadata,
  GeneratedChapterFile,
  ParsedMarkdown,
  TextStats,
} from '../lib/index.js';
import { generateChapterFile, getTextStats, parseMarkdown, stripMarkdown } from '../lib/index.js';

describe('index exports', () => {
  test('exports all functions', () => {
    expect(typeof parseMarkdown).toBe('function');
    expect(typeof stripMarkdown).toBe('function');
    expect(typeof getTextStats).toBe('function');
    expect(typeof generateChapterFile).toBe('function');
  });

  test('exports all types', () => {
    // Type-only test - if this compiles, types are exported correctly
    const metadata: ChapterMetadata = {
      pov: 'test',
      title: 'test',
      date: '2024-01-01',
      timeline: 'main',
      arc: 'test',
      episode: 1,
      part: 1,
      chapter: 1,
      summary: 'test',
      location: 'test',
    };

    const parsed: ParsedMarkdown = {
      metadata,
      content: 'test',
    };

    const stats: TextStats = {
      words: 1,
      characters: 4,
      charactersNoSpaces: 4,
      paragraphs: 1,
      sentences: 1,
      readingTimeMinutes: 1,
    };

    const file: GeneratedChapterFile = {
      path: 'test.md',
      content: 'test content',
    };

    expect(metadata.pov).toBe('test');
    expect(parsed.content).toBe('test');
    expect(stats.words).toBe(1);
    expect(file.path).toBe('test.md');
  });
});
