import removeMd from 'remove-markdown';

export interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  paragraphs: number;
  sentences: number;
  readingTimeMinutes: number;
}

export function getTextStats(markdown: string): TextStats {
  const plainText = removeMd(markdown);

  const words = plainText
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
  const characters = plainText.length;
  const charactersNoSpaces = plainText.replace(/\s/g, '').length;
  const paragraphs = plainText.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
  const sentences = plainText.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const readingTimeMinutes = Math.ceil(words / 200);

  return {
    words,
    characters,
    charactersNoSpaces,
    paragraphs,
    sentences,
    readingTimeMinutes,
  };
}
