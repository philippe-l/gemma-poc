import { GemmaClient, printResult } from '../client.js';

const gemma = new GemmaClient();

console.log('🔍  DÉMO 3 — Extraction structurée');
console.log('   Le LLM transforme du texte libre en données JSON exploitables.\n');

// Exemple 1 : fiche d'identité
console.log('📝 Exemple 1 : Extraire une fiche d\'identité');
const r1 = await gemma.extract(
  `Marie Curie, physicienne et chimiste franco-polonaise, est née le 7 novembre 1867 à Varsovie. Elle a obtenu deux prix Nobel : physique en 1903 et chimie en 1911. Elle est décédée le 4 juillet 1934 à Passy, en France.`,
  { nom: 'string', nationalité: 'string', naissance: 'string', décès: 'string', distinctions: 'array' }
);
printResult('Fiche d\'identité → JSON', r1);

// Exemple 2 : facture
console.log('\n📝 Exemple 2 : Extraire les données d\'une facture');
const r2 = await gemma.extract(
  `Facture n° FA-2026-0847 du 28 mars 2026. Client : Dupont SARL, 12 rue des Lilas, 75011 Paris. Montant HT : 2 450,00 €. TVA 20% : 490,00 €. Total TTC : 2 940,00 €. Échéance : 30 avril 2026. Objet : Développement site web - phase 2.`,
  { numero: 'string', date: 'string', client: 'string', montant_ht: 'number', tva: 'number', total_ttc: 'number', echeance: 'string', objet: 'string' }
);
printResult('Facture → JSON', r2);

// Exemple 3 : offre d'emploi
console.log('\n📝 Exemple 3 : Extraire une offre d\'emploi');
const r3 = await gemma.extract(
  `Nous recherchons un développeur fullstack Node.js / React avec 3 ans d'expérience minimum. Poste basé à Lyon, télétravail 3j/semaine. CDI, salaire entre 42K et 55K selon profil. Stack : TypeScript, PostgreSQL, Docker, AWS. Démarrage souhaité : septembre 2026.`,
);
printResult('Offre d\'emploi → JSON', r3);
