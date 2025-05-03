// Interfaces compartilhadas entre componentes

export interface SocialProfile {
    platform: string;
    username: string;
    connected: boolean;
    followingCount?: number;
    relevantTeams?: string[];
    relevantInteractions?: number;
  }
  
  export interface ConnectResponse {
    success: boolean;
    message?: string;
    followingCount?: number;
    relevantTeams?: string[];
    relevantInteractions?: number;
  }
  
  export interface AnalysisResponse {
    success: boolean;
    message?: string;
    analysis?: string;
  }