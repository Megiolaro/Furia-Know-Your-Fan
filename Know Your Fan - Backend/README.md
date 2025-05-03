# Furia - Know Your Fan (Back-end)


## 📋 Sobre o Projeto

API backend para validação de documentos e análise de perfis em redes sociais com foco em e-sports. Este serviço utiliza inteligência artificial (Google Gemini) para analisar documentos e perfis sociais, além de validar a relevância de links para usuários do setor de e-sports.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web para Node.js
- **Google Generative AI** - API Gemini para análise de imagens e textos
- **CORS** - Middleware para habilitação de Cross-Origin Resource Sharing

## ⚙️ Funcionalidades

### 1. Validação de Documentos
- Extração de dados de documentos usando OCR
- Validação de nome e CPF
- Verificação de autenticidade

### 2. Integração com Redes Sociais
- Conexão com perfis do Twitter
- Conexão com perfis do Instagram
- Análise de perfis sociais com foco em e-sports

### 3. Análise de Links de E-Sports
- Validação de relevância de links com base no perfil do usuário
- Pontuação de compatibilidade entre conteúdo e interesses
- Recomendações personalizadas

## 🔧 Instalação

```bash
# Clone o repositório
git clone https://github.com/Megiolaro/Furia-Know-Your-Fan.git

# Entre na pasta do projeto
cd "Know Your Fan - Backend"

# Instale as dependências
npm install

# Inicie o servidor
node server.js
```

## 🔌 Endpoints da API

### Validação de Documentos
```
POST /validate-document
```
Parâmetros:
- `image` (Base64): Imagem do documento
- `name` (String): Nome informado pelo usuário
- `cpf` (String): CPF informado pelo usuário

Resposta:
```json
{
  "result": "✅ Documento válido! Nome e CPF conferem."
}
```

### Conexão com Twitter
```
POST /connect-twitter
```
Parâmetros:
- `username` (String): Nome de usuário do Twitter

Resposta:
```json
{
  "success": true,
  "username": "exemplo",
  "followingCount": 250,
  "followersCount": 500,
  "relevantTeams": ["FURIA", "LOUD"],
  "relevantGames": ["CS2", "Valorant"],
  "relevantInteractions": 25
}
```

### Conexão com Instagram
```
POST /connect-instagram
```
Parâmetros:
- `username` (String): Nome de usuário do Instagram

Resposta:
```json
{
  "success": true,
  "username": "exemplo",
  "followingCount": 250,
  "followersCount": 500,
  "relevantTeams": ["FURIA", "LOUD"],
  "relevantGames": ["CS2", "Valorant"],
  "relevantInteractions": 25
}
```

### Análise de Perfis Sociais
```
POST /analyze-social-profiles
```
Parâmetros:
- `profiles` (Array): Lista de perfis de redes sociais

Resposta:
```json
{
  "success": true,
  "analysis": "Análise detalhada dos perfis sociais..."
}
```

### Validação de Links de E-Sports
```
POST /validate-esports-link
```
Parâmetros:
- `link` (String): URL a ser analisada
- `userProfile` (Object): Perfil do usuário contendo interesses, eventos e compras

Resposta:
```json
{
  "success": true,
  "analysis": {
    "relevante": true,
    "pontuacao": 85,
    "elementosCorrespondentes": ["CS2", "FURIA"],
    "explicacao": "O link contém informações sobre CS2 e o time FURIA, que fazem parte dos interesses do usuário.",
    "recomendacao": "Este conteúdo é altamente relevante para você.",
    "conteudoDetectado": {
      "jogos": ["CS2"],
      "times": ["FURIA"],
      "eventos": ["Major"],
      "outros": []
    }
  }
}
```


## 👨‍💻 Autor

Desenvolvido por [Gian Carlos Megiolaro](https://github.com/Megiolaro)

---

⭐️ Projeto desenvolvido para integração entre serviços de e-sports e validação de identidades digitais.