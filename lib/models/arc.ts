export interface Arc {
  timelineId: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateArcInput {
  timelineId: string;
  name: string;
  description?: string;
}

export interface UpdateArcInput {
  description?: string;
}
