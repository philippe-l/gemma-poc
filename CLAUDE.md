# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

POC demonstrating 6 core capabilities of Google's Gemma 4 LLM running locally via Ollama: generation, summary, extraction, classification, translation, and function calling. Written in French. No cloud dependencies — all inference runs on the local machine.

## Commands

```bash
# Setup (installs Ollama, pulls Gemma 4, npm install)
bash scripts/setup.sh

# Run all 6 demos sequentially in CLI
npm run demo

# Run a single demo
npm run demo:generation
npm run demo:summary
npm run demo:extraction
npm run demo:classification
npm run demo:translation
npm run demo:function-calling

# Start web UI on http://localhost:3000
npm run web

# Docker alternative
docker compose up -d
docker compose exec ollama ollama pull gemma4
```

## Architecture

- **ES Modules** throughout (`"type": "module"` in package.json)
- **`src/client.js`** — `GemmaClient` class wrapping Ollama's HTTP API (`/api/generate` and `/api/chat`). All demos and the web server use this as the single interface to the LLM. High-level methods (`summarize`, `extract`, `classify`, `translate`, `functionCall`) build on the low-level `generate`/`chat` methods.
- **`src/demos/*.js`** — Each file is a standalone demo that imports `GemmaClient` and `printResult` from `client.js`. They run as top-level await scripts.
- **`src/run-all.js`** — Orchestrator that pings Ollama, then dynamically imports each demo in sequence.
- **`src/web/server.js`** — Express server that proxies requests to Ollama and serves `src/web/public/index.html`. Endpoints: `GET /api/status`, `POST /api/generate`, `POST /api/chat`.

## Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `OLLAMA_HOST` | `http://localhost:11434` | Ollama server URL |
| `GEMMA_MODEL` | `gemma4` | Model name (works with any Ollama model) |
| `PORT` | `3000` | Web server port |

## Prerequisites

- Node.js >= 18
- Ollama running locally (or via Docker) with the `gemma4` model pulled
