// Interfaces e tipos compartilhados

// Resultado da validação do link
export interface LinkValidationResult {
    success: boolean;
    message?: string;
    analysis?: {
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
      }
    }
  }
  
  // Perfil do usuário para validação
  export interface UserProfile {
    interests: string[];
    events: string[];
    purchases: string[];
  }
  
  // Props do componente principal
  export interface FanDataFormProps {
    onClose?: () => void;
  }
  
  // Estado do formulário
  export interface FanFormData {
    name: string;
    cpf: string;
    address: string;
    interests: string;
    events: string;
    purchases: string;
    esportsLink: string;
    documentFile: File | null;
  }
  
  // Props compartilhados entre etapas do formulário
  export interface StepProps {
    data: FanFormData;
    updateData: (key: keyof FanFormData, value: string | File | null) => void;
    goToNextStep?: () => void;
    goToPreviousStep?: () => void;
  }