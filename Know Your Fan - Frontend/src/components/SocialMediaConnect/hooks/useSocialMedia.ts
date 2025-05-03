import { useState } from 'react';
import { SocialProfile } from '../types';
import { 
  connectTwitterAPI, 
  connectInstagramAPI, 
  analyzeSocialProfilesAPI 
} from '../services/socialMediaService';

export const useSocialMedia = () => {
  const [twitterUsername, setTwitterUsername] = useState("");
  const [instagramUsername, setInstagramUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [socialProfiles, setSocialProfiles] = useState<SocialProfile[]>([]);
  const [analysisResults, setAnalysisResults] = useState<string | null>(null);
  const [showAnalysisSection, setShowAnalysisSection] = useState(false);

  const connectTwitter = async () => {
    if (!twitterUsername) {
      alert("Por favor, insira seu nome de usuário do Twitter/X");
      return;
    }

    setIsLoading(true);
    try {
      const data = await connectTwitterAPI(twitterUsername);
      
      if (data.success) {
        setSocialProfiles(prevProfiles => {
          const filtered = prevProfiles.filter(p => p.platform !== "Twitter");
          return [...filtered, {
            platform: "Twitter",
            username: twitterUsername,
            connected: true,
            followingCount: data.followingCount,
            relevantTeams: data.relevantTeams,
            relevantInteractions: data.relevantInteractions
          }];
        });
      } else {
        alert(`Falha ao conectar Twitter: ${data.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const connectInstagram = async () => {
    if (!instagramUsername) {
      alert("Por favor, insira seu nome de usuário do Instagram");
      return;
    }

    setIsLoading(true);
    try {
      const data = await connectInstagramAPI(instagramUsername);
      
      if (data.success) {
        setSocialProfiles(prevProfiles => {
          const filtered = prevProfiles.filter(p => p.platform !== "Instagram");
          return [...filtered, {
            platform: "Instagram",
            username: instagramUsername,
            connected: true,
            followingCount: data.followingCount,
            relevantTeams: data.relevantTeams,
            relevantInteractions: data.relevantInteractions
          }];
        });
      } else {
        alert(`Falha ao conectar Instagram: ${data.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeProfiles = async () => {
    if (socialProfiles.length === 0) {
      alert("Por favor, conecte pelo menos uma rede social antes de analisar");
      return;
    }

    setIsLoading(true);
    try {
      const data = await analyzeSocialProfilesAPI(socialProfiles);
      
      if (data.success && data.analysis) {
        setAnalysisResults(data.analysis);
        setShowAnalysisSection(true);
      } else {
        alert(`Falha na análise: ${data.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
};