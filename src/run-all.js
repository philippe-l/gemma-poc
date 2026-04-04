import { GemmaClient } from './client.js';

const gemma = new GemmaClient();

console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║       🤖 GEMMA 4 — POC : 6 CAPACITÉS D\'UN LLM         ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

// Vérifier la connexion
console.log('⏳ Connexion à Ollama...');
const status = await gemma.ping();

if (!status.ok) {
  console.error(`\n❌ Ollama non disponible (${gemma.host})`);
  console.error(`   ${status.error}\n`);
  console.error('💡 Pour installer :');
  console.error('   curl -fsSL https://ollama.com/install.sh | sh');
  console.error('   ollama serve');
  console.error('   ollama pull gemma4');
  process.exit(1);
}

console.log(`✅ Ollama OK — modèles : ${status.models.join(', ')}\n`);

if (!status.models.some((m) => m.includes('gemma'))) {
  console.warn('⚠️  Pas de modèle Gemma détecté. Lance : ollama pull gemma4\n');
}

const demos = [
  'generation',
  'summary',
  'extraction',
  'classification',
  'translation',
  'function-calling',
];

for (const name of demos) {
  try {
    console.log(`\n${'▓'.repeat(60)}`);
    await import(`./demos/${name}.js`);
  } catch (err) {
    console.error(`❌ Erreur (${name}) :`, err.message);
  }
}

console.log('\n\n✅ Terminé. Lance npm run web pour l\'interface graphique.');
