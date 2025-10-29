import type { ChapterMetadata } from './types.js';

export interface GeneratedChapterFile {
  path: string;
  content: string;
}

/**
 * Generate complete chapter file with frontmatter and basic content
 * Format: content/<arc-name>/<ep01-episode-title>/<ep01-ch001-pov-title>.md
 */
export function generateChapterFile(
  metadata: ChapterMetadata,
  content: string = '',
): GeneratedChapterFile {
  const episodeNum = String(metadata.episode).padStart(2, '0');
  const chapterNum = String(metadata.chapter).padStart(3, '0');

  const arcName = slugify(metadata.arc);
  const episodeTitle = slugify(metadata.title);
  const chapterTitle = slugify(metadata.title);
  const pov = slugify(metadata.pov);

  const episodeDir = `ep${episodeNum}-${episodeTitle}`;
  const filename = `ep${episodeNum}-ch${chapterNum}-${pov}-${chapterTitle}.md`;
  const path = `content/${arcName}/${episodeDir}/${filename}`;

  // Generate frontmatter
  const frontmatter = [
    '---',
    `pov: "${metadata.pov}"`,
    `title: "${metadata.title}"`,
    `date: "${metadata.date}"`,
    `timeline: "${metadata.timeline}"`,
    `arc: "${metadata.arc}"`,
    `episode: ${metadata.episode}`,
    `part: ${metadata.part}`,
    `chapter: ${metadata.chapter}`,
    `summary: "${metadata.summary}"`,
    `location: "${metadata.location}"`,
    metadata.outfit ? `outfit: "${metadata.outfit}"` : null,
    metadata.kink ? `kink: "${metadata.kink}"` : null,
    '---',
    '',
  ]
    .filter(Boolean)
    .join('\n');

  const fileContent =
    frontmatter + (content || `# ${metadata.title}\n\n<!-- Chapter content goes here -->`);

  return {
    path,
    content: fileContent,
  };
}

/**
 * Convert string to URL-friendly slug
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/[\s_-]+/g, '-') // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}
