import { SocialProfile, ConnectResponse, AnalysisResponse } from '../types';
import { API_BASE_URL } from '../../../config/api';

// Função para conectar ao Twitter
export const connectTwitterAPI = async (username: string): Promise<ConnectResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/connect-twitter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    return await response.json();
  } catch (error) {
    console.error("Erro ao conectar Twitter:", error);
    
    // Fallback em caso de erro (para desenvolvimento)
    return {
      success: true,
      followingCount: 342,
      relevantTeams: ["FURIA", "paiN Gaming", "LOUD"],
      relevantInteractions: 127
    };
  }
};

// Função para conectar ao Instagram
export const connectInstagramAPI = async (username: string): Promise<ConnectResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/connect-instagram`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    return await response.json();
  } catch (error) {
    console.error("Erro ao conectar Instagram:", error);
    
    // Fallback em caso de erro (para desenvolvimento)
    return {
      success: true,
      followingCount: 208,
      relevantTeams: ["FURIA", "MIBR", "Imperial"],
      relevantInteractions: 89
    };
  }
};

// Função para analisar perfis
export const analyzeSocialProfilesAPI = async (profiles: SocialProfile[]): Promise<AnalysisResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze-social-profiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ profiles }),
    });

    return await response.json();
  } catch (error) {
    console.error("Erro na análise de perfis:", error);
    
    // Fallback em caso de erro (para desenvolvimento)
    return {
      success: true,
      analysis: "Baseado em seus perfis de redes sociais, você é um fã de e-Sports de nível OURO. Sua preferência principal é pelo time FURIA, seguido por outros times brasileiros. Recomendamos eventos de CS2 e Valorant com base em seu histórico de interações. Sua pontuação de engajamento é 78/100."
    };
  }
};