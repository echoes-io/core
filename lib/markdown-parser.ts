import matter from 'gray-matter';

import type { ChapterMetadata, ParsedMarkdown } from './types.js';

export function parseMarkdown(markdown: string): ParsedMarkdown {
  const { data, content } = matter(markdown);

  return {
    metadata: data as ChapterMetadata,
    content: content.trim(),
  };
}
