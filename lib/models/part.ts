export interface Part {
  timelineId: string;
  episodeIndex: number;
  partIndex: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePartInput {
  timelineId: string;
  episodeIndex: number;
  partIndex: number;
  name: string;
  description?: string;
}

export interface UpdatePartInput {
  name?: string;
  description?: string;
}
