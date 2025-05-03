const { GoogleGenerativeAI } = require("@google/generative-ai");

// Usar a mesma API Key que você já está usando para o Gemini
const API_KEY = "AIzaSyBFaOJUmUgp7EUO8ttzjYdDVBDhlgWPjjk";
const genAI = new GoogleGenerativeAI(API_KEY);

// Dados simulados para demonstração
// Em uma implementação real, isso seria substituído por chamadas às APIs do Twitter e Instagram
const mockEsportsTeams = ["FURIA", "LOUD", "paiN Gaming", "MIBR", "Team Liquid", "G2 Esports", "FaZe Clan", "Natus Vincere", "Astralis", "Fnatic"];
const mockGames = ["Counter-Strike", "CS2", "Valorant", "League of Legends", "Dota 2", "Rainbow Six Siege", "Free Fire", "Fortnite"];

// Simulação de API do Twitter
async function getTwitterProfile(username) {
  console.log(`Buscando perfil do Twitter para: ${username}`);
  
  // Simulando dados baseados no nome de usuário (para demonstração)
  const mockProfile = {
    success: true,
    username: username,
    followingCount: Math.floor(Math.random() * 500) + 100,
    followersCount: Math.floor(Math.random() * 1000) + 50,
    relevantTeams: [],
    relevantGames: [],
    relevantInteractions: Math.floor(Math.random() * 50)
  };
  
  // Adicionar alguns times aleatórios que o usuário segue
  const numberOfTeams = Math.floor(Math.random() * 5) + 1;
  for (let i = 0; i < numberOfTeams; i++) {
    const randomTeam = mockEsportsTeams[Math.floor(Math.random() * mockEsportsTeams.length)];
    if (!mockProfile.relevantTeams.includes(randomTeam)) {
      mockProfile.relevantTeams.push(randomTeam);
    }
  }
  
  // Adicionar alguns jogos aleatórios de interesse
  const numberOfGames = Math.floor(Math.random() * 4) + 1;
  for (let i = 0; i < numberOfGames; i++) {
    const randomGame = mockGames[Math.floor(Math.random() * mockGames.length)];
    if (!mockProfile.relevantGames.includes(randomGame)) {
      mockProfile.relevantGames.push(randomGame);
    }
  }
  
  return mockProfile;
}

// Simulação de API do Instagram
async function getInstagramProfile(username) {
  console.log(`Buscando perfil do Instagram para: ${username}`);
  
  // Simulando dados baseados no nome de usuário (para demonstração)
  const mockProfile = {
    success: true,
    username: username,
    followingCount: Math.floor(Math.random() * 500) + 100,
    followersCount: Math.floor(Math.random() * 1000) + 50,
    relevantTeams: [],
    relevantGames: [],
    relevantInteractions: Math.floor(Math.random() * 50)
  };
  
  // Adicionar alguns times aleatórios que o usuário segue
  const numberOfTeams = Math.floor(Math.random() * 5) + 1;
  for (let i = 0; i < numberOfTeams; i++) {
    const randomTeam = mockEsportsTeams[Math.floor(Math.random() * mockEsportsTeams.length)];
    if (!mockProfile.relevantTeams.includes(randomTeam)) {
      mockProfile.relevantTeams.push(randomTeam);
    }
  }
  
  // Adicionar alguns jogos aleatórios de interesse
  const numberOfGames = Math.floor(Math.random() * 4) + 1;
  for (let i = 0; i < numberOfGames; i++) {
    const randomGame = mockGames[Math.floor(Math.random() * mockGames.length)];
    if (!mockProfile.relevantGames.includes(randomGame)) {
      mockProfile.relevantGames.push(randomGame);
    }
  }
  
  return mockProfile;
}

// Análise de perfis de redes sociais usando IA
async function analyzeSocialProfiles(profiles) {
  if (!profiles || profiles.length === 0) {
    return {
      success: false,
      message: "Nenhum perfil fornecido para análise"
    };
  }

  try {
    // Preparar os dados dos perfis para a análise
    const profileData = profiles.map(profile => {
      return {
        platform: profile.platform,
        username: profile.username,
        followingCount: profile.followingCount || 0,
        relevantTeams: profile.relevantTeams || [],
        relevantInteractions: profile.relevantInteractions || 0
      };
    });

    // Usar o Gemini para analisar os perfis e gerar insights
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const analysisPrompt = `
    Você é um especialista em análise de perfis de fãs de e-sports.
    
    Com base nos dados de redes sociais fornecidos, faça uma análise do perfil deste fã de e-sports.
    Identifique padrões de interesse, times favoritos, e qual parece ser o nível de engajamento com conteúdo de e-sports.
    
    Dados dos perfis sociais:
    ${JSON.stringify(profileData, null, 2)}
    
    Por favor, forneça:
    1. Um resumo do perfil como fã de e-sports
    2. Times que parecem ser os favoritos
    3. Nível de engajamento (baixo, médio, alto)
    4. Sugestões de conteúdo/experiências que poderiam interessar este fã
    
    Apresente a análise em formato para consumo humano, organizada e com insights relevantes.
    `;

    const analysisResult = await model.generateContent(analysisPrompt);
    const analysisText = await analysisResult.response.text();

    return {
      success: true,
      analysis: analysisText
    };
  } catch (error) {
    console.error("Erro na análise de perfis sociais:", error);
    return {
      success: false,
      message: "Erro ao analisar os perfis de redes sociais"
    };
  }
}

module.exports = {
  getTwitterProfile,
  getInstagramProfile,
  analyzeSocialProfiles
};