import { useState } from 'react';
import { LinkValidationResult, UserProfile } from '../types/index';

export const useLinkValidation = () => {
  const [linkValidationResult, setLinkValidationResult] = useState<LinkValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const validateEsportsLink = async (esportsLink: string, userProfile: UserProfile) => {
    if (!esportsLink) {
      alert("Por favor, insira um link para validar.");
      return;
    }

    setIsValidating(true);
    
    try {
      // Fazer a chamada para a API de validação de links
      const response = await fetch('http://localhost:5000/validate-esports-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          link: esportsLink,
          userProfile
        }),
      });

      const data = await response.json();
      console.log('Resposta da validação do link:', data);
      setLinkValidationResult(data);
      return data;
    } catch (error) {
      console.error('Erro ao validar link:', error);
      const errorResult = {
        success: false,
        message: 'Erro ao comunicar com o servidor. Verifique se o backend está rodando.'
      };
      setLinkValidationResult(errorResult);
      return errorResult;
    } finally {
      setIsValidating(false);
    }
  };

  return {
    linkValidationResult,
    isValidating,
    validateEsportsLink
  };
};

export default useLinkValidation;