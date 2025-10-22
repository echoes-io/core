import matter from 'gray-matter';
import removeMd from 'remove-markdown';

import type { ChapterMetadata, ParsedMarkdown } from './types.js';

export function parseMarkdown(markdown: string): ParsedMarkdown {
  const { data, content } = matter(markdown);

  return {
    metadata: data as ChapterMetadata,
    content: content.trim(),
  };
}

export function stripMarkdown(markdown: string): string {
  return removeMd(markdown);
}
