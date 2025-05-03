// Tipos e interfaces para o componente EsportsLinkValidator

export interface UserProfile {
    interests: string[];
    events: string[];
    purchases: string[];
  }
  
  export interface EsportsLinkValidatorProps {
    userProfile: UserProfile;
    onValidationComplete?: (result: LinkValidationResult) => void;
  }
  
  export interface LinkValidationResult {
    success: boolean;
    message?: string;
    analysis?: LinkAnalysis;
  }
  
  export interface LinkAnalysis {
    relevante: boolean;
    pontuacao: number;
    elementosCorrespondentes: string[];
    explicacao: string;
    recomendacao: string;
    conteudoDetectado: {
      jogos: string[];
      times: string[];
      eventos: string[];
      outros: string[];
    };
  }
  
  export interface SavedLink {
    url: string;
    relevante: boolean;
    pontuacao: number;
  }