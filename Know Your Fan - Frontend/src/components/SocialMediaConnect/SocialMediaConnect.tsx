import React from 'react';
import { useSocialMedia } from '../SocialMediaConnect/hooks/useSocialMedia';
import TwitterConnection from './TwitterConnection';
import InstagramConnection from './InstagramConnection';
import AnalysisResults from './AnalysisResults';
import { Container, Title, AnalyzeButton } from './SocialMediaConnect.styles';

const SocialMediaConnect: React.FC = () => {
  const {
    twitterUsername,
    setTwitterUsername,
    instagramUsername,
    setInstagramUsername,
    isLoading,
    socialProfiles,
    analysisResults,
    showAnalysisSection,
    connectTwitter,
    connectInstagram,
    analyzeProfiles
  } = useSocialMedia();

  return (
    <Container>
      <Title>
        Conectar Redes Sociais
      </Title>
      
      <TwitterConnection
        twitterUsername={twitterUsername}
        setTwitterUsername={setTwitterUsername}
        connectTwitter={connectTwitter}
        isLoading={isLoading}
        socialProfiles={socialProfiles}
      />

      <InstagramConnection
        instagramUsername={instagramUsername}
        setInstagramUsername={setInstagramUsername}
        connectInstagram={connectInstagram}
        isLoading={isLoading}
        socialProfiles={socialProfiles}
      />

      {socialProfiles.length > 0 && !showAnalysisSection && (
        <AnalyzeButton 
          onClick={analyzeProfiles} 
          disabled={isLoading}
          color="#8e44ad"
          fullWidth
        >
          Analisar Perfil de E-Sports
        </AnalyzeButton>
      )}

      <AnalysisResults 
        analysisResults={analysisResults} 
        showAnalysisSection={showAnalysisSection} 
      />
    </Container>
  );
};

export default SocialMediaConnect;