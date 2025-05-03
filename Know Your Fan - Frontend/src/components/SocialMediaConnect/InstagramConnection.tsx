import React from 'react';
import { SocialProfile } from '../SocialMediaConnect/types/index';
import Button from '../SocialMediaConnect/ui/Button';
import { Label, Input, InputGroup, ProfileDetails } from './SocialMediaConnect.styles';

interface InstagramConnectionProps {
  instagramUsername: string;
  setInstagramUsername: (username: string) => void;
  connectInstagram: () => void;
  isLoading: boolean;
  socialProfiles: SocialProfile[];
}

const InstagramConnection: React.FC<InstagramConnectionProps> = ({
  instagramUsername,
  setInstagramUsername,
  connectInstagram,
  isLoading,
  socialProfiles
}) => {
  const isConnected = socialProfiles.some(p => p.platform === "Instagram" && p.connected);
  const instagramProfile = socialProfiles.find(p => p.platform === "Instagram");

  return (
    <>
      <Label>
        Usuário do Instagram:
      </Label>
      <InputGroup>
        <Input 
          type="text" 
          value={instagramUsername} 
          onChange={(e) => setInstagramUsername(e.target.value)} 
          placeholder="@usuario" 
          disabled={isConnected}
        />
        <Button 
          onClick={connectInstagram}
          disabled={isLoading || !instagramUsername}
          color="#c13584"
          isConnected={isConnected}
        >
          {isConnected ? "Conectado" : "Conectar"}
        </Button>
      </InputGroup>
      
      {instagramProfile && instagramProfile.connected && (
        <ProfileDetails>
          <p>@{instagramProfile.username}</p>
          <p>Seguindo: {instagramProfile.followingCount} contas</p>
          <p>Times de e-Sports seguidos: {instagramProfile.relevantTeams?.join(', ')}</p>
          <p>Interações com conteúdo de e-Sports: {instagramProfile.relevantInteractions}</p>
        </ProfileDetails>
      )}
    </>
  );
};

export default InstagramConnection;