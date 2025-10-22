import { describe, expect, it } from 'vitest';

import { generateChapterFile } from '../lib/path-utils.js';
import type { ChapterMetadata } from '../lib/types.js';

describe('generateChapterFile', () => {
  it('generates complete chapter file with frontmatter', () => {
    const metadata: ChapterMetadata = {
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
      kink: 'Slow burn',
    };

    const result = generateChapterFile(metadata);

    expect(result.path).toBe(
      'content/introduction-arc/ep01-first-meeting/ep01-ch005-alice-first-meeting.md',
    );

    expect(result.content).toContain('---');
    expect(result.content).toContain('pov: "Alice"');
    expect(result.content).toContain('title: "First Meeting"');
    expect(result.content).toContain('episode: 1');
    expect(result.content).toContain('chapter: 5');
    expect(result.content).toContain('outfit: "Red dress"');
    expect(result.content).toContain('# First Meeting');
    expect(result.content).toContain('<!-- Chapter content goes here -->');
  });

  it('generates file with custom content', () => {
    const metadata: ChapterMetadata = {
      pov: 'Bob',
      title: 'Second Thoughts',
      date: '2024-01-02',
      timeline: 'main',
      arc: 'Development',
      episode: 2,
      part: 1,
      chapter: 1,
      excerpt: 'Bob reflects',
      location: 'Park',
    };

    const customContent = 'Bob sat on the bench and thought about yesterday.';
    const result = generateChapterFile(metadata, customContent);

    expect(result.content).toContain('---');
    expect(result.content).toContain('pov: "Bob"');
    expect(result.content).toContain(customContent);
    expect(result.content).not.toContain('outfit:');
    expect(result.content).not.toContain('kink:');
  });

  it('handles special characters in metadata', () => {
    const metadata: ChapterMetadata = {
      pov: "Bob's POV",
      title: 'Chapter: The End?!',
      date: '2024-01-01',
      timeline: 'main',
      arc: 'Final Arc',
      episode: 12,
      part: 2,
      chapter: 123,
      excerpt: 'The dramatic end',
      location: 'Nowhere',
    };

    const result = generateChapterFile(metadata);

    expect(result.path).toBe(
      'content/final-arc/ep12-chapter-the-end/ep12-ch123-bobs-pov-chapter-the-end.md',
    );
    expect(result.content).toContain('pov: "Bob\'s POV"');
    expect(result.content).toContain('title: "Chapter: The End?!"');
  });
});
