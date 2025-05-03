const express = require('express');
const cors = require('cors');
const { analyzeDocument } = require('./services/geminiService'); // importa a função IA Gemini
const { getTwitterProfile, getInstagramProfile, analyzeSocialProfiles } = require('./services/socialMediaService');
const { validateLinkRelevance } = require('./services/esportsLinkService'); // importa o novo serviço

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: '20mb' }));

app.post('/validate-document', async (req, res) => {
  try {
    const { image, name, cpf } = req.body;
    if (!image || !name || !cpf) {
      return res.status(400).json({ result: 'Imagem, nome ou CPF não enviados.' });
    }

    const validationResult = await analyzeDocument(image, name, cpf);
    
    return res.json({ result: validationResult });

  } catch (error) {
    console.error('Erro ao validar documento:', error);
    return res.status(500).json({ result: 'Erro interno ao validar documento.' });
  }
});

// Novos endpoints para integração de redes sociais
app.post('/connect-twitter', async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ 
        success: false, 
        message: 'Nome de usuário não fornecido' 
      });
    }

    const profileData = await getTwitterProfile(username);
    return res.json(profileData);
  } catch (error) {
    console.error('Erro ao conectar com Twitter:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Erro interno ao conectar com Twitter' 
    });
  }
});

app.post('/connect-instagram', async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ 
        success: false, 
        message: 'Nome de usuário não fornecido' 
      });
    }

    const profileData = await getInstagramProfile(username);
    return res.json(profileData);
  } catch (error) {
    console.error('Erro ao conectar com Instagram:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Erro interno ao conectar com Instagram' 
    });
  }
});

app.post('/analyze-social-profiles', async (req, res) => {
  try {
    const { profiles } = req.body;
    if (!profiles || !Array.isArray(profiles) || profiles.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Perfis não fornecidos ou em formato inválido' 
      });
    }

    const analysisResult = await analyzeSocialProfiles(profiles);
    return res.json(analysisResult);
  } catch (error) {
    console.error('Erro ao analisar perfis sociais:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Erro interno ao analisar perfis sociais' 
    });
  }
});

// NOVO ENDPOINT: Validação de links de e-sports
app.post('/validate-esports-link', async (req, res) => {
  try {
    const { link, userProfile } = req.body;
    
    if (!link) {
      return res.status(400).json({ 
        success: false, 
        message: 'Link não fornecido' 
      });
    }
    
    if (!userProfile) {
      return res.status(400).json({ 
        success: false, 
        message: 'Perfil do usuário não fornecido' 
      });
    }
    
    // Verificar se o perfil do usuário contém os campos necessários
    if (!userProfile.interests && !userProfile.events && !userProfile.purchases) {
      return res.status(400).json({
        success: false,
        message: 'O perfil do usuário deve conter pelo menos um dos campos: interests, events ou purchases'
      });
    }
    
    // Chamar o serviço de validação
    const validationResult = await validateLinkRelevance(link, userProfile);
    return res.json(validationResult);
    
  } catch (error) {
    console.error('Erro ao validar link de e-sports:', error);
    return res.status(500).json({ 
      success: false, 
      message: `Erro interno ao validar link: ${error.message}` 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});