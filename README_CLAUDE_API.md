# Guide de Configuration : API Anthropic Claude

Ce document explique comment le backend Spring Boot communique avec l'intelligence artificielle Claude (Anthropic) pour générer des contenus de remédiation.

## 1. Objectif de l'Intégration IA
Si un étudiant échoue à une question ou au quiz global, l'IA génère en temps réel :
- **Des questions supplémentaires ciblées** sur les erreurs spécifiques commises.
- **Un grain alternatif** (nouvelle explication du cours) reformulé selon le profil VARK dominant de l'étudiant.

## 2. Configuration (Backend)
Dans le fichier `platform/src/main/resources/application.properties`, vous trouverez cette ligne :
`claude.api.key=${CLAUDE_API_KEY:sk-ant-your-key-here}`

**Pour utiliser la VRAIE API Claude :**
1. Allez sur le site de la console Anthropic et créez une clé API.
2. Remplacez `sk-ant-your-key-here` par votre vraie clé dans le fichier `application.properties`.
3. Redémarrez Spring Boot.

**Mode Fallback (Sécurité / Démo) :**
Si la clé n'est pas valide ou si l'API est injoignable (erreur réseau, limite de coût atteinte), le `ClaudeAIService.java` utilise automatiquement des méthodes `createFallbackQuestions()`. 
Cela permet de **ne jamais bloquer l'application** lors de votre présentation devant le jury, même sans connexion internet !

## 3. Flux des Données
1. React (Frontend) appelle `submitQuiz`.
2. Si des erreurs sont détectées, React appelle `POST /api/ai/questions-supplementaires` en passant le contexte (le cours, les erreurs de l'étudiant, son profil VARK).
3. Le controller Java transfère l'appel au `ClaudeAIService`.
4. Le service formate un prompt strict (exigeant une réponse JSON pure) et l'envoie à l'API Anthropic via `RestTemplate`.
5. Le JSON est parsé via Jackson (`ObjectMapper`) et renvoyé au frontend sous forme d'objet structuré DTO.
6. React affiche les nouvelles questions à l'étudiant.
