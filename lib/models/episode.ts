export interface Episode {
  timelineId: string;
  episodeIndex: number;
  arcId: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEpisodeInput {
  timelineId: string;
  episodeIndex: number;
  arcId: string;
  name: string;
  description?: string;
}

export interface UpdateEpisodeInput {
  arcId?: string;
  name?: string;
  description?: string;
}
