export type { Arc, CreateArcInput, UpdateArcInput } from './arc';
export type { Chapter, CreateChapterInput, UpdateChapterInput } from './chapter';
export type { CreateEpisodeInput, Episode, UpdateEpisodeInput } from './episode';
export type { CreatePartInput, Part, UpdatePartInput } from './part';
export type { CreatePovInput, Pov } from './pov';
export type { CreateTimelineInput, Timeline, UpdateTimelineInput } from './timeline';

// Database type for Kysely
export interface Database {
  timelines: Timeline;
  arcs: Arc;
  episodes: Episode;
  parts: Part;
  chapters: Chapter;
  povs: Pov;
}

import type { Arc } from './arc';
import type { Chapter } from './chapter';
import type { Episode } from './episode';
import type { Part } from './part';
import type { Pov } from './pov';
import type { Timeline } from './timeline';
