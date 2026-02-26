# Darjeeling

Two-player online co-op garden simulation game.

## Overview

A persistent shared world for two players to grow flowers, keep pets, build structures, and compete in flower shows. The core mechanic is a Mendelian genetics system where flowers can be cross-bred to discover rare color combinations and traits.

## Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React 19, TypeScript, PixiJS v8 |
| State | Zustand |
| Multiplayer | Socket.io |
| Backend | Node.js, Fastify |
| Database | PostgreSQL, Redis |
| Build | Vite, pnpm workspaces |

## Project Structure

```
darjeeling/
├── packages/
│   ├── client/       # React + PixiJS game client
│   ├── server/       # Node.js backend
│   └── shared/       # Types + genetics engine
├── pnpm-workspace.yaml
└── package.json
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development servers (client + server)
pnpm dev

# Build all packages
pnpm build

# Type check
pnpm typecheck
```

## Core Systems

### Flower Genetics

Flowers have 5 gene loci (R, Y, W, S, G), diploid (2 alleles each). Cross-breeding follows standard Mendelian segregation. Each species has its own color expression table.

### World

- 1024x1024 tiles, 16px per tile
- Chunk-based loading (16x16 tiles per chunk)
- Procedurally generated from a stored seed
- Layers: terrain, decoration, structures, entities

### Pets

Cosmetic companions (snakes, spiders, owls, eagles) with personality-driven idle behaviors. Each player has personal pets plus shared pets.

### Building

Structure placement system with tile-based building. Structures include house, greenhouse, garden beds, terrariums, aviaries, and utility furniture.

### Competition

Flower Show challenges where players compete to breed the best specimen in a category. Automated judging scores based on genetic rarity, color purity, scent, size, and shimmer bonus.

## Architecture

React handles all UI (inventory, HUD, menus). PixiJS handles the game canvas (tiles, sprites, animations). React never renders game tiles to maintain 60fps performance.

Server-authoritative multiplayer with client prediction. Player positions broadcast via Socket.io at 20Hz. Tile changes, inventory, and structure placements persisted to PostgreSQL.

## Package Details

### packages/shared

Contains all TypeScript types and the genetics engine. The genetics engine runs on both client and server to validate breeding results.

### packages/client

React application with PixiJS canvas. Zustand stores manage game state. Socket.io client handles real-time sync.

### packages/server

Fastify HTTP server and Socket.io WebSocket host. Handles world generation, event processing, and database operations.
