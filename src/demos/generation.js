import { GemmaClient, printResult } from '../client.js';

const gemma = new GemmaClient();

console.log('✍️  DÉMO 1 — Génération de texte');
console.log('   Le LLM crée du contenu original à partir d\'une consigne.\n');

// Exemple 1 : écriture créative
console.log('📝 Exemple 1 : Écriture créative');
const r1 = await gemma.generate(
  'Écris un court paragraphe décrivant une ville futuriste sous-marine.',
  { system: 'Tu es un écrivain créatif. 3-4 phrases max, style évocateur.', temperature: 0.8 }
);
printResult('Écriture créative', r1);

// Exemple 2 : email professionnel
console.log('\n📝 Exemple 2 : Email professionnel');
const r2 = await gemma.generate(
  'Rédige un email de relance poli pour un client qui n\'a pas répondu à un devis envoyé il y a 10 jours.',
  { system: 'Tu rédiges des emails professionnels. Ton cordial mais direct. Format email complet.', temperature: 0.5 }
);
printResult('Email professionnel', r2);

// Exemple 3 : explication technique
console.log('\n📝 Exemple 3 : Explication technique');
const r3 = await gemma.generate(
  'Explique le concept de conteneurisation Docker à un développeur junior.',
  { system: 'Tu es un formateur technique. Utilise une analogie simple, puis les détails techniques. 4-5 phrases.', temperature: 0.4 }
);
printResult('Explication technique', r3);
