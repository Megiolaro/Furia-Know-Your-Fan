import React from 'react';
import { LinkValidationResult } from '../types/index';
import { ValidationResultContainer } from '../FanDataForm.styles';

interface ValidationResultProps {
  result: LinkValidationResult | null;
}

const ValidationResult: React.FC<ValidationResultProps> = ({ result }) => {
  if (!result) {
    return null;
  }

  if (!result.success) {
    return (
      <ValidationResultContainer success={false}>
        <p>❌ {result.message || "Erro na validação do link."}</p>
      </ValidationResultContainer>
    );
  }

  const { analysis } = result;
  
  if (!analysis) {
    return (
      <ValidationResultContainer success={true}>
        <p>✅ Link validado com sucesso, mas sem análise detalhada disponível.</p>
      </ValidationResultContainer>
    );
  }

  const relevanciaStyle = {
    color: analysis.relevante ? "green" : "red",
    fontWeight: "bold" as const
  };

  return (
    <ValidationResultContainer success={analysis.relevante}>
      <h3 style={{ marginTop: 0 }}>Resultado da Análise</h3>
      
      <p>
        <span style={relevanciaStyle}>
          {analysis.relevante ? "✅ RELEVANTE" : "⚠️ NÃO RELEVANTE"}
        </span>
        {" "}- Pontuação: <strong>{analysis.pontuacao}%</strong>
      </p>
      
      <p><strong>Explicação:</strong> {analysis.explicacao}</p>
      
      {analysis.recomendacao && (
        <p><strong>Recomendação:</strong> {analysis.recomendacao}</p>
      )}
      
      {analysis.elementosCorrespondentes && analysis.elementosCorrespondentes.length > 0 && (
        <div>
          <p><strong>Correspondências com seu perfil:</strong></p>
          <ul style={{ marginTop: "0.5rem" }}>
            {analysis.elementosCorrespondentes.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      
      {analysis.conteudoDetectado && (
        <div style={{ marginTop: "1rem" }}>
          <p><strong>Conteúdo detectado no link:</strong></p>
          
          {analysis.conteudoDetectado.jogos.length > 0 && (
            <p>🎮 <strong>Jogos:</strong> {analysis.conteudoDetectado.jogos.join(", ")}</p>
          )}
          
          {analysis.conteudoDetectado.times.length > 0 && (
            <p>👥 <strong>Times:</strong> {analysis.conteudoDetectado.times.join(", ")}</p>
          )}
          
          {analysis.conteudoDetectado.eventos.length > 0 && (
            <p>🏆 <strong>Eventos:</strong> {analysis.conteudoDetectado.eventos.join(", ")}</p>
          )}
          
          {analysis.conteudoDetectado.outros.length > 0 && (
            <p>📌 <strong>Outros:</strong> {analysis.conteudoDetectado.outros.join(", ")}</p>
          )}
        </div>
      )}
    </ValidationResultContainer>
  );
};

export default ValidationResult;