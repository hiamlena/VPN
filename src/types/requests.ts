export interface GenerationRequest {
  prompt: string;
  company?: string;
}

export interface GenerationResult {
  responseText: string;
  model: string;
}
