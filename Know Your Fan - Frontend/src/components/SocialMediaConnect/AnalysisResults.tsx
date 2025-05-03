import React from 'react';
import { AnalysisContainer, AnalysisHeader } from './SocialMediaConnect.styles';

interface AnalysisResultsProps {
  analysisResults: string | null;
  showAnalysisSection: boolean;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  analysisResults,
  showAnalysisSection
}) => {
  if (!showAnalysisSection || !analysisResults) {
    return null;
  }

  return (
    <AnalysisContainer>
      <AnalysisHeader>Análise do Perfil de Fã</AnalysisHeader>
      <p>{analysisResults}</p>
    </AnalysisContainer>
  );
};

export default AnalysisResults;