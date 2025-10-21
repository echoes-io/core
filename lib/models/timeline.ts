export interface Timeline {
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTimelineInput {
  name: string;
  description?: string;
}

export interface UpdateTimelineInput {
  description?: string;
}
