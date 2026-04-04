# 🤖 Gemma 4 — POC Capabilities

Projet pédagogique pour **découvrir et comprendre** les capacités de [Gemma 4](https://ai.google.dev/gemma) (Google DeepMind) en local via [Ollama](https://ollama.com).

6 démos interactives, des exemples concrets, zéro dépendance cloud.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Ollama](https://img.shields.io/badge/Ollama-required-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🎯 Qu'est-ce que Gemma ?

Gemma est un **modèle de langage open source** de Google, basé sur la même technologie que Gemini. Contrairement aux API cloud (ChatGPT, Claude...), Gemma tourne **sur votre machine** : vos données ne sortent jamais.

Ce POC démontre **6 capacités fondamentales** d'un LLM local :

| # | Capacité | Ce que ça fait | Exemple concret |
|---|----------|----------------|-----------------|
| 1 | **Génération** | Créer du texte à partir d'une consigne | Rédiger un email, un article, une description |
| 2 | **Résumé** | Condenser un texte long | Résumer un rapport, un article, un contrat |
| 3 | **Extraction** | Transformer du texte libre en données structurées | Extraire des dates, noms, montants → JSON |
| 4 | **Classification** | Catégoriser automatiquement du contenu | Trier des avis clients, détecter du spam |
| 5 | **Traduction** | Traduire entre 140+ langues | Localiser une app, traduire un document |
| 6 | **Function Calling** | Décomposer une demande en actions | Construire un agent / assistant autonome |

---

## 🚀 Démarrage rapide

### Prérequis

- [Node.js](https://nodejs.org/) >= 18
- [Ollama](https://ollama.com/)

### Installation

```bash
git clone https://github.com/VOTRE_USER/gemma-poc.git
cd gemma-poc

# Tout installer (Ollama + Gemma + dépendances)
bash scripts/setup.sh

# Lancer les démos en CLI
npm run demo

# Ou lancer l'interface web → http://localhost:3000
npm run web
```

### Avec Docker

```bash
docker compose up -d
docker compose exec ollama ollama pull gemma4
# → http://localhost:3000
```

---

## 📁 Structure

```
gemma-poc/
├── src/
│   ├── client.js              # Client Ollama réutilisable
│   ├── run-all.js             # Lance toutes les démos
│   ├── demos/                 # 6 démos indépendantes
│   └── web/                   # Interface web (Express)
├── docker-compose.yml
└── package.json
```

---

## 🔧 Configuration

| Variable | Défaut | Description |
|----------|--------|-------------|
| `OLLAMA_HOST` | `http://localhost:11434` | URL d'Ollama |
| `GEMMA_MODEL` | `gemma4` | Modèle à utiliser |
| `PORT` | `3000` | Port du serveur web |

> 💡 Compatible avec tout modèle Ollama : `GEMMA_MODEL=llama3 npm run demo`

---

## 🧠 Modèles Gemma 4

| Modèle | Taille (Q4) | RAM GPU | Usage |
|--------|-------------|---------|-------|
| 31B Dense | ~16 Go | 24 Go | Qualité maximale |
| 26B MoE | ~14 Go | 24 Go | Compromis vitesse/qualité |
| E4B Edge | ~2.5 Go | CPU ok | Mobile, Raspberry Pi |
| E2B Edge | ~1.3 Go | CPU ok | IoT, embarqué |

---

## 📖 Utilisation comme librairie

```javascript
import { GemmaClient } from './src/client.js';
const llm = new GemmaClient();

const text    = await llm.generate('Explique la photosynthèse simplement');
const summary = await llm.summarize(longArticle, { maxSentences: 3 });
const data    = await llm.extract('Marie Curie, née en 1867 à Varsovie...');
const label   = await llm.classify('Ce produit est nul !');
const en      = await llm.translate('Bonjour le monde', 'anglais');
const plan    = await llm.functionCall('Météo à Paris demain ?', tools);
```

---

## 📝 License

MIT
