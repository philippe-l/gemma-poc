import { GemmaClient, printResult } from '../client.js';

const gemma = new GemmaClient();

console.log('📋  DÉMO 2 — Résumé automatique');
console.log('   Le LLM condense un texte long en conservant l\'essentiel.\n');

const article = `L'intelligence artificielle générative a connu une croissance explosive depuis 2022. Les modèles de langage comme GPT, Claude et Gemini sont désormais utilisés par des millions de personnes pour rédiger des textes, analyser des documents et automatiser des tâches. En parallèle, les modèles open source comme Llama, Mistral et Gemma permettent aux entreprises de déployer l'IA sur leurs propres serveurs, sans envoyer de données sensibles dans le cloud. Cette approche "on-premise" répond aux exigences de confidentialité de secteurs comme la santé, la finance et la défense. Cependant, faire tourner ces modèles en local nécessite des ressources matérielles importantes : un GPU avec au moins 8 Go de VRAM pour les petits modèles, et jusqu'à 80 Go pour les plus gros. Les techniques de quantification (réduction de la précision des poids) permettent de réduire ces besoins, au prix d'une légère baisse de qualité. Le marché évolue rapidement : tous les deux mois environ, un nouveau modèle repousse les limites de ce qui est possible en local.`;

console.log('📄 Texte original :', article.length, 'caractères\n');

const result = await gemma.summarize(article, { maxSentences: 3 });

printResult('📋  Résumé (3 phrases max)', result);
