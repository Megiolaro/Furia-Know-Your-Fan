import React from 'react';
import { SocialProfile } from '../../components/SocialMediaConnect/types/index';
import Button from '../SocialMediaConnect/ui/Button';
import { Label, Input, InputGroup, ProfileDetails } from './SocialMediaConnect.styles';

interface TwitterConnectionProps {
  twitterUsername: string;
  setTwitterUsername: (username: string) => void;
  connectTwitter: () => void;
  isLoading: boolean;
  socialProfiles: SocialProfile[];
}

const TwitterConnection: React.FC<TwitterConnectionProps> = ({
  twitterUsername,
  setTwitterUsername,
  connectTwitter,
  isLoading,
  socialProfiles
}) => {
  const isConnected = socialProfiles.some(p => p.platform === "Twitter" && p.connected);
  const twitterProfile = socialProfiles.find(p => p.platform === "Twitter");

  return (
    <>
      <Label>
        Usuário do Twitter/X:
      </Label>
      <InputGroup>
        <Input 
          type="text" 
          value={twitterUsername} 
          onChange={(e) => setTwitterUsername(e.target.value)} 
          placeholder="@usuario" 
          disabled={isConnected}
        />
        <Button 
          onClick={connectTwitter}
          disabled={isLoading || !twitterUsername}
          color="#1da1f2"
          isConnected={isConnected}
        >
          {isConnected ? "Conectado" : "Conectar"}
        </Button>
      </InputGroup>
      
      {twitterProfile && twitterProfile.connected && (
        <ProfileDetails>
          <p>@{twitterProfile.username}</p>
          <p>Seguindo: {twitterProfile.followingCount} contas</p>
          <p>Times de e-Sports seguidos: {twitterProfile.relevantTeams?.join(', ')}</p>
          <p>Interações com conteúdo de e-Sports: {twitterProfile.relevantInteractions}</p>
        </ProfileDetails>
      )}
    </>
  );
};

export default TwitterConnection;