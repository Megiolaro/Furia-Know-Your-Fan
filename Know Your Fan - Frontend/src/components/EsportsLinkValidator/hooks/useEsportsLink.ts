import { useState } from 'react';
import { LinkValidationResult, SavedLink, UserProfile } from '../types';
import { esportsLinkService } from '../services/esportsLinkService';

/**
 * Hook para gerenciar a validação de links de e-sports
 */
export const useEsportsLink = (
  userProfile: UserProfile,
  onValidationComplete?: (result: LinkValidationResult) => void
) => {
  const [link, setLink] = useState('');
  const [validationResult, setValidationResult] = useState<LinkValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [savedLinks, setSavedLinks] = useState<SavedLink[]>([]);

  /**
   * Valida o link atual
   */
  const validateLink = async () => {
    if (!link) {
      alert('Por favor, insira um link para validar.');
      return;
    }

    setIsValidating(true);
    
    try {
      const result = await esportsLinkService.validateLink(link, userProfile);
      
      setValidationResult(result);
      
      // Notificar o componente pai, se houver callback
      if (onValidationComplete) {
        onValidationComplete(result);
      }
      
      // Se for bem sucedido e relevante, salvar na lista
      if (result.success && result.analysis?.relevante) {
        addSavedLink({
          url: link, 
          relevante: result.analysis.relevante,
          pontuacao: result.analysis.pontuacao
        });
      }
    } finally {
      setIsValidating(false);
    }
  };

  /**
   * Adiciona um link à lista de links salvos
   */
  const addSavedLink = (newLink: SavedLink) => {
    setSavedLinks(prev => [...prev, newLink]);
  };

  /**
   * Remove um link da lista de links salvos
   */
  const removeSavedLink = (index: number) => {
    setSavedLinks(prev => prev.filter((_, i) => i !== index));
  };

  return {
    link,
    setLink,
    validationResult,
    isValidating,
    savedLinks,
    validateLink,
    removeSavedLink
  };
};