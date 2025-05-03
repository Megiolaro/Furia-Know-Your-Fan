# 🎮 Furia - Know Your Fan

<p align="center">
  <img src="./Know Your Fan - Frontend/src/assets/screenshot3.png" alt="Furia - Know Your Fan" width="100%">
</p>

## 📋 Sobre o Projeto

**Furia - Know Your Fan** é uma plataforma completa para validação de perfis de fãs de e-Sports, desenvolvida com o objetivo de identificar e autenticar fãs genuínos através de análise de dados, integração com redes sociais e validação de documentos. Utilizando tecnologias modernas e inteligência artificial, o sistema cria um perfil detalhado do fã.

### 🌟 Visão Geral

O projeto é dividido em duas partes principais:

1. **Frontend** - Interface de usuário desenvolvida em React e TypeScript
2. **Backend** - API em Node.js com integração de IA (Google Gemini) para análise de dados

Este sistema inovador permite que clubes e organizações de e-Sports possam conhecer melhor seus fãs, oferecer experiências personalizadas baseadas em dados reais de engajamento.

## ✨ Funcionalidades Principais

### Autenticação e Verificação
- Cadastro de dados pessoais (nome, CPF, endereço)
- Upload e validação de documentos oficiais via OCR e IA
- Verificação automática de informações fornecidas

### Análise de Perfil Social
- Conexão com perfis do Twitter/X e Instagram(Simulação)
- Detecção automática de interesses relacionados a e-Sports
- Identificação de times e jogos favoritos
- Análise de padrões de interação com conteúdo de e-Sports

### Validação de Conteúdo
- Verificação de relevância de links de e-Sports
- Pontuação de compatibilidade entre conteúdo e perfil do usuário
- Recomendações personalizadas baseadas nos interesses detectados


## 🛠️ Tecnologias Utilizadas

### Frontend
- **React** - Biblioteca para construção de interfaces
- **TypeScript** - Linguagem de programação tipada
- **Styled-Components** - Estilização de componentes
- **Fetch API** - Comunicação com o backend

### Backend
- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web para Node.js
- **Google Generative AI (Gemini)** - API para análise de imagens e textos
- **CORS** - Middleware para Cross-Origin Resource Sharing

## 🚀 Instalação e Configuração

### Requisitos de Sistema
- Node.js (v14 ou superior)
- NPM ou Yarn

### Instalação do Backend

```bash
# Clone o repositório
git clone https://github.com/Megiolaro/Furia-Know-Your-Fan.git

# Entre na pasta do backend
cd "Know Your Fan - Backend"

# Instale as dependências
npm install

# Inicie o servidor
node server.js
```

### Instalação do Frontend

```bash
# Entre na pasta do frontend
cd "../Know Your Fan - Frontend"

# Instale as dependências
npm install
# ou
yarn install

# Inicie o servidor de desenvolvimento
yarn dev
```

- Para iniciar o projeto completo, rode o front-end em um terminal e o back-end em outro

## 📊 Fluxo de Funcionamento

1. **Cadastro Inicial**: O usuário fornece dados pessoais básicos
2. **Verificação de Identidade**: Upload de documento para validação via OCR/IA
3. **Conexão de Redes Sociais**: Integração com Twitter e Instagram para análise de perfil(Simulação)
4. **Validação de Links**: O usuário compartilha links relacionados a e-Sports para análise
5. **Geração de Perfil**: O sistema compila os dados e gera uma pontuação e classificação
6. **Recomendações**: Com base no perfil, o sistema oferece recomendações personalizadas

## 🔌 API Backend

### Endpoints Principais

#### Validação de Documentos
```
POST /validate-document
```
Valida documentos de identidade usando OCR e IA para verificar autenticidade e correspondência de dados.

#### Conexão com Redes Sociais
```
POST /connect-twitter
POST /connect-instagram
```
Estabelece conexão com perfis sociais e extrai dados relevantes sobre interesses em e-Sports.

#### Análise de Perfil
```
POST /analyze-social-profiles
```
Realiza análise completa dos perfis sociais conectados, gerando pontuação e classificação.

#### Validação de Links
```
POST /validate-esports-link
```
Analisa URLs relacionadas a e-Sports para determinar relevância com base no perfil do usuário.

### Exemplo de Resposta da API

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

## 📦 Componentes Frontend

### Principais Módulos

#### 1. FanDataForm
Formulário principal para coleta e validação de dados pessoais do usuário.


#### 2. SocialMediaConnect
Componente para integração e análise de perfis sociais.

#### 3. EsportsLinkValidator
Sistema de validação de links relacionados a e-Sports.


## 📱 Screenshots

<p align="center">
  <img src="./Know Your Fan - Frontend/src/assets/screenshot3.png" alt="Tela Inicial" width="80%">
</p>

<p align="center">
  <img src="./Know Your Fan - Frontend/src/assets/screenshot8.png" alt="Formulário de Dados" width="30%">
  <img src="./Know Your Fan - Frontend/src/assets/screenshot7.png" alt="Conexão de Redes Sociais" width="30%">
  <img src="./Know Your Fan - Frontend/src/assets/screenshot9.png" alt="Validação de Links" width="30%">
</p>


## 🔄 Fluxo de Dados

```
┌─────────────┐     ┌────────────────┐     ┌───────────────┐
│ Entrada de  │     │  Processamento │     │  Resultado    │
│   Dados     │────▶│    e Análise   │────▶│ e Pontuação   │
└─────────────┘     └────────────────┘     └───────────────┘
       │                     │                    │
       ▼                     ▼                    ▼
┌─────────────┐     ┌────────────────┐     ┌───────────────┐
│  Dados      │     │   Google       │     │ Classificação │
│  Pessoais   │     │   Gemini AI    │     │   do Perfil   │
└─────────────┘     └────────────────┘     └───────────────┘
       │                     │                    │
       ▼                     ▼                    ▼
┌─────────────┐     ┌────────────────┐     ┌───────────────┐
│  Redes      │     │  Análise de    │     │ Recomendações │
│  Sociais    │     │  Relevância    │     │ Personalizadas│
└─────────────┘     └────────────────┘     └───────────────┘
```

## 🚧 Desenvolvimento Futuro

- **Redes Sociais**: Integração real com as redes sociais
- **Integração com Plataformas de Jogos**: Conexão direta com Steam, Epic Games, etc.
- **Aplicativo Mobile**: Versão para dispositivos móveis com funcionalidades adicionais
- **Análise Comportamental**: Detecção de padrões de comportamento para validação ainda mais precisa

## 👨‍💻 Autor

Desenvolvido por [Gian Carlos Megiolaro](https://github.com/Megiolaro)

### Contato
- **Email**: giancarlosmegiolaro@gmail.com
- **LinkedIn**: [giancarlosmegiolaro](https://www.linkedin.com/in/giancarlosmegiolaro/)
- **GitHub**: [Megiolaro](https://github.com/Megiolaro)


<p align="center">
  <img src="./Know Your Fan - Frontend/src/assets/Furia-icon.png" alt="Logo FURIA" width="150px">
  <br>
  <em>Conhecendo cada fã, valorizando cada torcida</em>
</p>
