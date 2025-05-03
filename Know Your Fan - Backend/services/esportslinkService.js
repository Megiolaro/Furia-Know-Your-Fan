const { GoogleGenerativeAI } = require("@google/generative-ai");

// Usar a mesma API Key que você já está usando para o Gemini
const API_KEY = "AIzaSyBFaOJUmUgp7EUO8ttzjYdDVBDhlgWPjjk";
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Busca o conteúdo textual de um link externo
 * @param {string} url - URL do link a ser analisado
 * @returns {Promise<string>} - Conteúdo textual do link
 */
async function fetchLinkContent(url) {
  try {
    // Usar um serviço de proxy para evitar problemas de CORS
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar link: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Extrair apenas o texto do HTML, removendo tags
    const textOnly = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Limitar o tamanho para não exceder o limite da API
    return textOnly.slice(0, 10000);
  } catch (error) {
    console.error("Erro ao buscar conteúdo do link:", error);
    throw error;
  }
}

/**
 * Valida a relevância de um link para o perfil de um usuário usando IA
 * @param {string} link - URL do link a ser validado
 * @param {object} userProfile - Perfil do usuário com interesses, eventos e compras
 * @returns {Promise<object>} - Resultado da análise de relevância
 */
async function validateLinkRelevance(link, userProfile) {
  try {
    console.log(`Validando link: ${link}`);
    
    // Verificação básica se o link está em um formato válido
    if (!link.match(/^https?:\/\/.+/i)) {
      return {
        success: false,
        message: "Formato de URL inválido"
      };
    }
    
    // Buscar o conteúdo do link
    const linkContent = await fetchLinkContent(link);
    
    if (!linkContent || linkContent.length < 50) {
      return {
        success: false,
        message: "Não foi possível extrair conteúdo suficiente do link"
      };
    }
    
    // Criar uma descrição do perfil do usuário para a IA analisar
    const userProfileDescription = `
      Interesses em e-Sports: ${userProfile.interests?.join(', ') || 'Não informado'}
      Eventos que participou no último ano: ${userProfile.events?.join(', ') || 'Não informado'}
      Compras relacionadas a e-Sports no último ano: ${userProfile.purchases?.join(', ') || 'Não informado'}
    `;
    
    // Usar o Gemini para analisar a relevância
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const analysisPrompt = `
    Você é um especialista em análise de conteúdo de e-sports.
    
    TAREFA: Analisar se um link/conteúdo de e-sports é relevante para um determinado perfil de usuário.
    
    PERFIL DO USUÁRIO:
    ${userProfileDescription}
    
    CONTEÚDO DO LINK:
    ${linkContent.substring(0, 8000)} // Limitar para evitar exceder o tamanho máximo do prompt
    
    ANÁLISE SOLICITADA:
    1. Determine se o conteúdo do link é relevante para o perfil de e-sports do usuário.
    2. Identifique quais elementos do perfil do usuário correspondem ao conteúdo (jogos, times, eventos, etc).
    3. Calcule uma pontuação de relevância de 0 a 100%.
    4. Explique brevemente por que o link é ou não relevante.
    
    FORMATO DE RESPOSTA (estritamente JSON):
    {
      "relevante": true ou false,
      "pontuacao": número entre 0 e 100,
      "elementosCorrespondentes": ["elemento1", "elemento2", ...],
      "explicacao": "Explicação concisa da análise",
      "recomendacao": "Uma breve recomendação para o usuário",
      "conteudoDetectado": {
        "jogos": ["jogo1", "jogo2", ...],
        "times": ["time1", "time2", ...],
        "eventos": ["evento1", "evento2", ...],
        "outros": ["outro1", "outro2", ...]
      }
    }
    
    Responda ESTRITAMENTE no formato JSON solicitado, sem texto adicional.
    `;
    
    // Chamada para a API do Gemini
    const result = await model.generateContent(analysisPrompt);
    const resultText = await result.response.text();
    
    // Tentar extrair JSON da resposta
    try {
      // Procurar por um objeto JSON na resposta
      const jsonMatch = resultText.match(/\{[\s\S]*\}/);
      const jsonText = jsonMatch ? jsonMatch[0] : resultText;
      
      // Converter para objeto
      const analysis = JSON.parse(jsonText);
      
      return {
        success: true,
        analysis: analysis
      };
    } catch (parseError) {
      console.error("Erro ao processar resposta da IA:", parseError);
      console.log("Resposta recebida:", resultText);
      
      // Fallback se não conseguir extrair JSON válido
      return {
        success: true,
        analysis: {
          relevante: resultText.toLowerCase().includes("relevante") && !resultText.toLowerCase().includes("não relevante"),
          pontuacao: 50,
          elementosCorrespondentes: [],
          explicacao: "Não foi possível processar a análise detalhada.",
          conteudoDetectado: {
            jogos: [],
            times: [],
            eventos: [],
            outros: []
          }
        },
        rawResponse: resultText
      };
    }
  } catch (error) {
    console.error("Erro ao validar relevância do link:", error);
    return {
      success: false,
      message: `Erro ao validar relevância do link: ${error.message}`
    };
  }
}

module.exports = { validateLinkRelevance };