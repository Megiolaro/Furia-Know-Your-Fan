import React from 'react';
import { LinkValidationResult } from '../types';

interface ValidationResultProps {
  result: LinkValidationResult | null;
}

/**
 * Componente para exibir o resultado da validação
 */
export const ValidationResult: React.FC<ValidationResultProps> = ({ result }) => {
  if (!result) return null;
  
  if (!result.success) {
    return (
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#ffebee', 
        borderRadius: '5px', 
        marginTop: '1rem' 
      }}>
        <p>❌ {result.message || 'Erro ao validar o link.'}</p>
      </div>
    );
  }
  
  const { analysis } = result;
  
  if (!analysis) {
    return (
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#e8f5e9', 
        borderRadius: '5px', 
        marginTop: '1rem' 
      }}>
        <p>✅ Link processado com sucesso, mas sem análise detalhada.</p>
      </div>
    );
  }
  
  return (
    <div style={{ 
      padding: '1rem', 
      backgroundColor: analysis.relevante ? '#e8f5e9' : '#fff3e0', 
      borderRadius: '5px', 
      marginTop: '1rem',
      border: `1px solid ${analysis.relevante ? '#c8e6c9' : '#ffe0b2'}`
    }}>
      <h3 style={{ marginTop: 0 }}>Resultado da Análise</h3>
      
      <p>
        <span style={{ 
          color: analysis.relevante ? 'green' : 'orange',
          fontWeight: 'bold' 
        }}>
          {analysis.relevante ? '✅ RELEVANTE' : '⚠️ NÃO RELEVANTE'}
        </span>
        {' '}- Pontuação: <strong>{analysis.pontuacao}%</strong>
      </p>
      
      <p><strong>Explicação:</strong> {analysis.explicacao}</p>
      
      {analysis.recomendacao && (
        <p><strong>Recomendação:</strong> {analysis.recomendacao}</p>
      )}
      
      {analysis.elementosCorrespondentes?.length > 0 && (
        <div>
          <p><strong>Correspondências com seu perfil:</strong></p>
          <ul>
            {analysis.elementosCorrespondentes.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div style={{ marginTop: '1rem' }}>
        <p><strong>Conteúdo detectado:</strong></p>
        
        {analysis.conteudoDetectado.jogos.length > 0 && (
          <p>🎮 <strong>Jogos:</strong> {analysis.conteudoDetectado.jogos.join(', ')}</p>
        )}
        
        {analysis.conteudoDetectado.times.length > 0 && (
          <p>👥 <strong>Times:</strong> {analysis.conteudoDetectado.times.join(', ')}</p>
        )}
        
        {analysis.conteudoDetectado.eventos.length > 0 && (
          <p>🏆 <strong>Eventos:</strong> {analysis.conteudoDetectado.eventos.join(', ')}</p>
        )}
        
        {analysis.conteudoDetectado.outros.length > 0 && (
          <p>📌 <strong>Outros:</strong> {analysis.conteudoDetectado.outros.join(', ')}</p>
        )}
      </div>
    </div>
  );
};