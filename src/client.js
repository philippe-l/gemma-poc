/**
 * GemmaClient — Client Ollama réutilisable
 *
 * Wrapper pour interagir avec un LLM local via Ollama.
 * Aucune donnée ne quitte la machine.
 */

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
const GEMMA_MODEL = process.env.GEMMA_MODEL || 'gemma4';

export class GemmaClient {
  constructor(options = {}) {
    this.host = options.host || OLLAMA_HOST;
    this.model = options.model || GEMMA_MODEL;
  }

  // ── Génération (prompt simple) ─────────────────────────────────

  async generate(prompt, options = {}) {
    const body = {
      model: this.model,
      prompt,
      stream: false,
      ...(options.system && { system: options.system }),
      ...(options.format && { format: options.format }),
      ...(options.temperature !== undefined && {
        options: { temperature: options.temperature },
      }),
    };

    const start = performance.now();
    const res = await fetch(`${this.host}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`Ollama ${res.status}: ${await res.text()}`);

    const data = await res.json();
    return {
      text: data.response,
      stats: {
        time: Math.round(performance.now() - start),
        tokens: data.eval_count || 0,
        tokensPerSecond: data.eval_count && data.eval_duration
          ? Math.round((data.eval_count / data.eval_duration) * 1e9)
          : 0,
        model: data.model,
      },
    };
  }

  // ── Chat (multi-turn + tools) ──────────────────────────────────

  async chat(messages, options = {}) {
    const body = {
      model: this.model,
      messages,
      stream: false,
      ...(options.tools && { tools: options.tools }),
      ...(options.format && { format: options.format }),
    };

    const start = performance.now();
    const res = await fetch(`${this.host}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`Ollama ${res.status}: ${await res.text()}`);

    const data = await res.json();
    return {
      message: data.message,
      stats: {
        time: Math.round(performance.now() - start),
        tokens: data.eval_count || 0,
        model: data.model,
      },
    };
  }

  // ── Méthodes haut niveau ───────────────────────────────────────

  async summarize(text, options = {}) {
    const n = options.maxSentences || 3;
    return this.generate(
      `Résume le texte suivant en ${n} phrases maximum :\n\n${text}`,
      { system: 'Tu résumes fidèlement et de manière concise.', temperature: 0.3 }
    );
  }

  async extract(text, schema = null) {
    const hint = schema ? `\nFormat attendu : ${JSON.stringify(schema)}` : '';
    return this.generate(
      `Extrais les informations structurées en JSON :${hint}\n\n${text}`,
      { system: 'Réponds UNIQUEMENT en JSON valide.', format: 'json', temperature: 0.1 }
    );
  }

  async classify(text, categories = ['positif', 'négatif', 'neutre', 'question', 'spam']) {
    return this.generate(
      `Classifie ce texte parmi [${categories.join(', ')}] :\n\n${text}`,
      {
        system: 'Réponds en JSON : {"label": "...", "confidence": 0.XX, "reason": "..."}',
        format: 'json',
        temperature: 0.2,
      }
    );
  }

  async translate(text, targetLang = 'anglais') {
    return this.generate(
      `Traduis en ${targetLang} :\n\n${text}`,
      {
        system: 'Tu es traducteur. Retourne uniquement la traduction, sans commentaire.',
        temperature: 0.3,
      }
    );
  }

  async functionCall(prompt, tools) {
    return this.chat([{ role: 'user', content: prompt }], { tools });
  }

  // ── Utilitaires ────────────────────────────────────────────────

  async ping() {
    try {
      const res = await fetch(`${this.host}/api/tags`);
      if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
      const data = await res.json();
      return { ok: true, models: data.models?.map((m) => m.name) || [] };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }
}

// ── Affichage console ────────────────────────────────────────────

export function printResult(label, result) {
  console.log('\n' + '═'.repeat(60));
  console.log(`  ${label}`);
  console.log('─'.repeat(60));

  if (result.text) {
    try {
      console.log(JSON.stringify(JSON.parse(result.text), null, 2));
    } catch {
      console.log(result.text);
    }
  } else if (result.message) {
    if (result.message.tool_calls) {
      console.log('Appels de fonctions :');
      for (const call of result.message.tool_calls) {
        console.log(`  → ${call.function.name}(${JSON.stringify(call.function.arguments)})`);
      }
    }
    if (result.message.content) console.log(result.message.content);
  }

  console.log('─'.repeat(60));
  const s = result.stats;
  console.log(`  ⏱  ${s.time}ms | 📊 ${s.tokens} tokens | 🤖 ${s.model}`);
  console.log('═'.repeat(60));
}
