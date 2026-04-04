import { GemmaClient, printResult } from '../client.js';

const gemma = new GemmaClient();

console.log('⚡  DÉMO 6 — Function Calling (Agent)');
console.log('   Le LLM analyse une demande et décide quelles fonctions appeler.\n');

// Définition des outils que l'agent peut utiliser
const tools = [
  {
    type: 'function',
    function: {
      name: 'getWeather',
      description: 'Obtient la météo actuelle pour une ville',
      parameters: {
        type: 'object',
        required: ['city'],
        properties: {
          city: { type: 'string', description: 'Nom de la ville' },
          unit: { type: 'string', enum: ['celsius', 'fahrenheit'], description: 'Unité de température' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'searchWeb',
      description: 'Recherche des informations sur le web',
      parameters: {
        type: 'object',
        required: ['query'],
        properties: {
          query: { type: 'string', description: 'Requête de recherche' },
          maxResults: { type: 'number', description: 'Nombre max de résultats' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'sendEmail',
      description: 'Envoie un email',
      parameters: {
        type: 'object',
        required: ['to', 'subject', 'body'],
        properties: {
          to: { type: 'string', description: 'Adresse email du destinataire' },
          subject: { type: 'string', description: 'Objet de l\'email' },
          body: { type: 'string', description: 'Corps de l\'email' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'createCalendarEvent',
      description: 'Crée un événement dans l\'agenda',
      parameters: {
        type: 'object',
        required: ['title', 'date', 'time'],
        properties: {
          title: { type: 'string', description: 'Titre de l\'événement' },
          date: { type: 'string', description: 'Date (YYYY-MM-DD)' },
          time: { type: 'string', description: 'Heure (HH:MM)' },
          duration: { type: 'number', description: 'Durée en minutes' },
        },
      },
    },
  },
];

const scenarios = [
  'Quel temps fait-il à Tokyo en ce moment ?',
  'Envoie un email à alice@example.com pour lui proposer un café mardi prochain à 14h, et ajoute-le à mon agenda.',
  'Cherche les dernières nouvelles sur l\'intelligence artificielle et dis-moi s\'il va pleuvoir à Paris demain.',
];

for (const scenario of scenarios) {
  console.log(`\n💬 "${scenario}"\n`);
  const result = await gemma.functionCall(scenario, tools);
  printResult('⚡  FUNCTION CALLING', result);
}
