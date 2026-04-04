import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
const GEMMA_MODEL = process.env.GEMMA_MODEL || 'gemma4';

app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

app.get('/api/status', async (_req, res) => {
  try {
    const r = await fetch(`${OLLAMA_HOST}/api/tags`);
    const data = await r.json();
    res.json({ ok: true, models: data.models?.map((m) => m.name) || [], defaultModel: GEMMA_MODEL });
  } catch (err) {
    res.json({ ok: false, error: err.message });
  }
});

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, system, format, temperature } = req.body;
    const start = performance.now();
    const r = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: req.body.model || GEMMA_MODEL,
        prompt, stream: false,
        ...(system && { system }),
        ...(format && { format }),
        ...(temperature !== undefined && { options: { temperature } }),
      }),
    });
    const data = await r.json();
    res.json({
      text: data.response,
      stats: {
        time: Math.round(performance.now() - start),
        tokens: data.eval_count || 0,
        tokensPerSecond: data.eval_count && data.eval_duration
          ? Math.round((data.eval_count / data.eval_duration) * 1e9) : 0,
        model: data.model,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, tools, format } = req.body;
    const start = performance.now();
    const r = await fetch(`${OLLAMA_HOST}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: req.body.model || GEMMA_MODEL,
        messages, stream: false,
        ...(tools && { tools }),
        ...(format && { format }),
      }),
    });
    const data = await r.json();
    res.json({
      message: data.message,
      stats: { time: Math.round(performance.now() - start), tokens: data.eval_count || 0, model: data.model },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n🤖 Gemma POC → http://localhost:${PORT}`);
  console.log(`   Ollama : ${OLLAMA_HOST} | Modèle : ${GEMMA_MODEL}\n`);
});
