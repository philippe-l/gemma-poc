#!/bin/bash
set -e

echo "🤖 Gemma 4 POC — Installation"
echo "═══════════════════════════════"

# Node.js
if ! command -v node &>/dev/null; then
  echo "❌ Node.js requis → https://nodejs.org/"; exit 1
fi
echo "✅ Node.js $(node --version)"

# Ollama
if ! command -v ollama &>/dev/null; then
  echo "⏳ Installation d'Ollama..."
  curl -fsSL https://ollama.com/install.sh | sh
else
  echo "✅ Ollama installé"
fi

# Démarrer Ollama
if ! curl -s http://localhost:11434/api/tags >/dev/null 2>&1; then
  echo "⏳ Démarrage d'Ollama..."
  ollama serve &
  sleep 3
fi
echo "✅ Ollama actif"

# Gemma 4
echo "⏳ Téléchargement de Gemma 4..."
ollama pull gemma4

# npm
echo "⏳ Installation des dépendances..."
npm install

echo ""
echo "✅ Prêt !"
echo "  npm run demo  → 6 démos en CLI"
echo "  npm run web   → Interface web (http://localhost:3000)"
