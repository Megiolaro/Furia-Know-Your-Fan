import { LinkValidationResult, UserProfile } from '../types';

/**
 * Serviço para validação de links de e-sports
 */
export const esportsLinkService = {
  /**
   * Valida um link de e-sports no servidor
   * @param link URL a ser validada
   * @param userProfile Perfil do usuário
   * @returns Resultado da validação
   */
  async validateLink(
    link: string,
    userProfile: UserProfile
  ): Promise<LinkValidationResult> {
    try {
      const response = await fetch('http://localhost:5000/validate-esports-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          link,
          userProfile
        }),
      });

      const result = await response.json();
      console.log('Resultado da validação:', result);
      return result;
    } catch (error) {
      console.error('Erro ao validar link:', error);
      return {
        success: false,
        message: 'Erro ao comunicar com o servidor.'
      };
    }
  }
};