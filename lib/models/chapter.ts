export interface Chapter {
  timelineId: string;
  arcName: string;
  chapterIndex: number;
  pov: string;
  title: string;
  slug: string;
  content: string;
  wordCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateChapterInput {
  timelineId: string;
  arcName: string;
  chapterIndex: number;
  pov: string;
  title: string;
  slug: string;
  content: string;
  wordCount?: number;
}

export interface UpdateChapterInput {
  pov?: string;
  title?: string;
  slug?: string;
  content?: string;
  wordCount?: number;
}
