import React from 'react';
import { EsportsLinkValidatorProps } from './types';
import { useEsportsLink } from './hooks/useEsportsLink';
import { ValidationResult, SavedLinksList } from './ui';

/**
 * Componente principal para validação de links relacionados a e-Sports
 */
const EsportsLinkValidator: React.FC<EsportsLinkValidatorProps> = ({ 
  userProfile, 
  onValidationComplete 
}) => {
  const {
    link,
    setLink,
    validationResult,
    isValidating,
    savedLinks,
    validateLink,
    removeSavedLink
  } = useEsportsLink(userProfile, onValidationComplete);

  return (
    <div style={{ marginTop: '1rem' }}>
      <h2>Validador de Links de e-Sports</h2>
      
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Cole aqui o link de um site de e-Sports"
          style={{
            padding: '0.75rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            flex: 1
          }}
        />
        <button
          onClick={validateLink}
          disabled={isValidating}
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isValidating ? 'not-allowed' : 'pointer',
            opacity: isValidating ? 0.7 : 1
          }}
        >
          {isValidating ? 'Validando...' : 'Validar'}
        </button>
      </div>
      
      <ValidationResult result={validationResult} />
      <SavedLinksList links={savedLinks} onRemove={removeSavedLink} />
    </div>
  );
};

export default EsportsLinkValidator;