import { GemmaClient, printResult } from '../client.js';

const gemma = new GemmaClient();

console.log('🏷️  DÉMO 4 — Classification');
console.log('   Le LLM attribue automatiquement une catégorie à chaque texte.\n');

const samples = [
  { text: "Le produit est arrivé cassé, l'emballage était complètement écrasé. Je demande un remboursement.", expected: 'négatif' },
  { text: "Livraison rapide, qualité impeccable. Je recommande vivement ce vendeur !", expected: 'positif' },
  { text: "Est-ce que ce modèle est compatible avec les accessoires de la version précédente ?", expected: 'question' },
  { text: "FÉLICITATIONS !!! Vous avez gagné un iPhone 16 !!! Cliquez ici pour réclamer votre prix !!!", expected: 'spam' },
  { text: "J'ai reçu ma commande hier. Le produit correspond à la description.", expected: 'neutre' },
];

for (const sample of samples) {
  console.log(`\n📝 "${sample.text.slice(0, 70)}..."`);
  console.log(`   Catégorie attendue : ${sample.expected}`);
  const result = await gemma.classify(sample.text);
  printResult('🏷️  Classification', result);
}
