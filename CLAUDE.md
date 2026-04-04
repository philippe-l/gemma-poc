# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Educational POC demonstrating 6 core capabilities of Google's Gemma 4 LLM running locally via Ollama. Written in French. No cloud dependencies — all inference runs on the local machine through Ollama's HTTP API.

## Commands

```bash
npm install                    # Install dependencies
npm run demo                   # Run all 6 demos sequentially (CLI)
npm run demo:generation        # Run a single demo (also: summary, extraction, classification, translation, function-calling)
npm run web                    # Start Express web UI on http://localhost:3000
```

Docker alternative:
```bash
docker compose up -d
docker compose exec ollama ollama pull gemma4
```

**Prerequisites:** Node.js >= 18, Ollama running with `gemma4` model pulled (`ollama pull gemma4`).

## Environment Variables

| Variable | Default | Purpose |
|---|---|---|
| `OLLAMA_HOST` | `http://localhost:11434` | Ollama server URL |
| `GEMMA_MODEL` | `gemma4` | Model name (can swap to any Ollama model) |
| `PORT` | `3000` | Web server port |

## Architecture

- **`src/client.js`** — `GemmaClient` class: the central abstraction. Wraps Ollama's `/api/generate` and `/api/chat` endpoints with high-level methods (`generate`, `summarize`, `extract`, `classify`, `translate`, `functionCall`). Also exports `printResult` for formatted console output.
- **`src/demos/*.js`** — Six standalone demo scripts, each importing `GemmaClient` and demonstrating one capability. They can run independently or together via `run-all.js`.
- **`src/run-all.js`** — Orchestrator that pings Ollama, then dynamically imports each demo in sequence.
- **`src/web/server.js`** — Express server that proxies `/api/generate` and `/api/chat` to Ollama and serves static files from `src/web/public/`.

## Key Patterns

- ESM modules throughout (`"type": "module"` in package.json) — use `import`/`export`, not `require`.
- No test framework or linter is configured.
- The only runtime dependency is `express` (for the web UI). The Ollama client uses native `fetch`.
- All LLM prompts and system messages are in French.
