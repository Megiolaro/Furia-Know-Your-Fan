const { GoogleGenerativeAI } = require("@google/generative-ai");

// Sua API Key
const API_KEY = "AIzaSyBFaOJUmUgp7EUO8ttzjYdDVBDhlgWPjjk";

const genAI = new GoogleGenerativeAI(API_KEY);

async function analyzeDocument(base64Image, inputName, inputCpf) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Primeiro prompt apenas para extrair os dados do documento
  const extractionPrompt = `
Você é um especialista em OCR de documentos brasileiros.

Analise a imagem de documento enviada abaixo e extraia APENAS as seguintes informações:
1. O nome completo da pessoa
2. O número do CPF

Responda APENAS no seguinte formato (substitua pelos valores encontrados):
NOME: [nome completo extraído]
CPF: [número de CPF extraído]

Se não conseguir identificar algum dos dados, indique com "NÃO IDENTIFICADO".
Não inclua nenhum texto adicional além do formato solicitado.
`;

  // Extrair os dados do documento
  const extractionResult = await model.generateContent({
    contents: [
      {
        parts: [
          { text: extractionPrompt },
          { inlineData: { mimeType: "image/jpeg", data: base64Image } },
        ],
      },
    ],
  });

  const extractionResponse = await extractionResult.response;
  const extractionText = (await extractionResponse.text()).trim();

  console.log('Dados extraídos do documento:', extractionText);

  // Extrair nome e CPF do texto retornado
  let extractedName = "NÃO IDENTIFICADO";
  let extractedCpf = "NÃO IDENTIFICADO";

  const nameMatch = extractionText.match(/NOME:\s*(.*)/i);
  if (nameMatch && nameMatch[1]) {
    extractedName = nameMatch[1].trim();
  }

  const cpfMatch = extractionText.match(/CPF:\s*(.*)/i);
  if (cpfMatch && cpfMatch[1]) {
    extractedCpf = cpfMatch[1].trim();
  }

  console.log('Nome extraído:', extractedName);
  console.log('CPF extraído:', extractedCpf);

  // Normalizar dados para comparação
  const normalizedExtractedName = normalizeText(extractedName);
  const normalizedInputName = normalizeText(inputName);
  
  const normalizedExtractedCpf = extractedCpf.replace(/\D/g, '');
  const normalizedInputCpf = inputCpf.replace(/\D/g, '');

  console.log('Nome normalizado do documento:', normalizedExtractedName);
  console.log('Nome normalizado do input:', normalizedInputName);
  console.log('CPF normalizado do documento:', normalizedExtractedCpf);
  console.log('CPF normalizado do input:', normalizedInputCpf);

  // Nova função para verificar semelhança entre nomes
  function areNamesSimilar(documentName, inputName) {
    if (documentName === "nao identificado") return false;
    
    // Se os nomes forem exatamente iguais após normalização
    if (documentName === inputName) return true;
    
    // Dividir os nomes em palavras
    const docNameWords = documentName.split(' ').filter(w => w.length > 1);
    const inputNameWords = inputName.split(' ').filter(w => w.length > 1);
    
    // Verificar se o nome é muito curto para comparação confiável
    if (docNameWords.length < 2 || inputNameWords.length < 2) {
      // Para nomes curtos, exigir correspondência exata
      return documentName === inputName;
    }
    
    // Para nomes completos, verificar se o primeiro e último nome coincidem
    const docFirstName = docNameWords[0];
    const docLastName = docNameWords[docNameWords.length - 1];
    
    const inputFirstName = inputNameWords[0];
    const inputLastName = inputNameWords[inputNameWords.length - 1];
    
    // Exigir que pelo menos o primeiro e o último nome correspondam
    const firstNameMatch = docFirstName === inputFirstName;
    const lastNameMatch = docLastName === inputLastName;
    
    // Se o primeiro e último nome correspondem, considera válido
    if (firstNameMatch && lastNameMatch) return true;
    
    // Calcular a correspondência de palavras
    let wordMatches = 0;
    let totalWords = Math.max(docNameWords.length, inputNameWords.length);
    
    // Verificar cada palavra do nome no documento
    for (const docWord of docNameWords) {
      if (inputNameWords.includes(docWord)) {
        wordMatches++;
      }
    }
    
    // Calcular a porcentagem de correspondência
    const matchPercentage = wordMatches / totalWords;
    
    // Exigir pelo menos 70% de correspondência para nomes longos
    return matchPercentage >= 0.7;
  }

  // Verificação e resultado
  let validationResult;

  if (normalizedExtractedName === "nao identificado" || normalizedExtractedCpf === "nao identificado") {
    validationResult = "❌ Não foi possível identificar todos os dados no documento.";
  } else {
    const nameMatches = areNamesSimilar(normalizedExtractedName, normalizedInputName);
    const cpfMatches = normalizedExtractedCpf === normalizedInputCpf;

    if (nameMatches && cpfMatches) {
      validationResult = "✅ Documento válido! Nome e CPF conferem.";
    } else if (nameMatches && !cpfMatches) {
      validationResult = "❌ CPF não confere.";
    } else if (!nameMatches && cpfMatches) {
      validationResult = "❌ Nome não confere.";
    } else {
      validationResult = "❌ Documento inválido! Nome e CPF não conferem.";
    }
  }

  console.log('Resultado da validação:', validationResult);
  return validationResult;
}

// Função para normalizar texto
function normalizeText(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/[^a-zA-Z0-9\s]/g, '') // remove pontuação exceto espaços
    .toLowerCase()
    .trim();
}

module.exports = { analyzeDocument };