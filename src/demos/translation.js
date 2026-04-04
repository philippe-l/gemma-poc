import { GemmaClient, printResult } from '../client.js';

const gemma = new GemmaClient();

console.log('🌍  DÉMO 5 — Traduction multilingue');
console.log('   Gemma 4 supporte plus de 140 langues.\n');

const text = `L'open source transforme l'industrie du logiciel. En partageant le code librement, les développeurs du monde entier collaborent pour créer des outils plus fiables, plus sûrs et plus innovants que ce qu'une seule entreprise pourrait produire.`;

console.log(`📄 Texte source (FR) : "${text.slice(0, 80)}..."\n`);

const targets = [
  { lang: 'anglais', flag: '🇬🇧' },
  { lang: 'espagnol', flag: '🇪🇸' },
  { lang: 'japonais', flag: '🇯🇵' },
  { lang: 'arabe', flag: '🇸🇦' },
  { lang: 'portugais brésilien', flag: '🇧🇷' },
];

for (const { lang, flag } of targets) {
  const result = await gemma.translate(text, lang);
  printResult(`${flag}  FR → ${lang.toUpperCase()}`, result);
}
