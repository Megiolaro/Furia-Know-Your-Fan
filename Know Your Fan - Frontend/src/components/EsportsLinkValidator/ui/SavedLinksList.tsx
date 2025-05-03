import React from 'react';
import { SavedLink } from '../types';

interface SavedLinksListProps {
  links: SavedLink[];
  onRemove: (index: number) => void;
}

/**
 * Componente para exibir a lista de links salvos
 */
export const SavedLinksList: React.FC<SavedLinksListProps> = ({ links, onRemove }) => {
  if (links.length === 0) return null;
  
  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Meus Links de e-Sports</h3>
      <ul style={{ 
        listStyle: 'none', 
        padding: 0,
        margin: 0
      }}>
        {links.map((savedLink, index) => (
          <li key={index} style={{
            padding: '0.75rem',
            backgroundColor: '#f5f5f5',
            marginBottom: '0.5rem',
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ maxWidth: '80%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <a href={savedLink.url} target="_blank" rel="noopener noreferrer">
                {savedLink.url}
              </a>
            </div>
            <div>
              <span style={{ 
                backgroundColor: savedLink.relevante ? '#e8f5e9' : '#fff3e0',
                padding: '0.25rem 0.5rem',
                borderRadius: '12px',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                color: savedLink.relevante ? 'green' : 'orange'
              }}>
                {savedLink.pontuacao}%
              </span>
              <button 
                onClick={() => onRemove(index)}
                style={{
                  marginLeft: '0.5rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#f44336'
                }}
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};