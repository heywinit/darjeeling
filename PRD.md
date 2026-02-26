# Darjeeling — Product Requirements Document

**Project:** Darjeeling
**Type:** Two-player online co-op nursery/garden sim
**Platform:** Web app (React)
**Status:** Pre-development — design phase
**Last updated:** 2026-02-26

---

## Vision

A cozy, persistent two-player garden sim for a couple. No combat. No time pressure. Just a shared world to grow flowers, keep pets, build a home, and occasionally compete over who bred the most beautiful rose. Think Stardew Valley in spirit but narrowly focused on flowers, pets, and exploration.

---

## Core Pillars

1. **Persistent shared world** — one world per couple, kept indefinitely. Your garden is always there.
2. **Flower genetics** — Mendelian breeding system. Cross flowers to discover rare colors. The genetics are real, the results are surprising.
3. **Cozy pets** — snakes, spiders, owls, eagles. Cosmetic companions with personality and variety.
4. **Build your home** — a base with a house you can decorate, terrariums, aviaries, garden beds.
5. **Friendly competition** — occasional flower show challenges where each player hunts their best specimen.

---

## Players

- Exactly two players (a couple)
- Online co-op, real-time, separate devices
- Both players share the same world instance
- Each player has personal ownership of some things (own pets, own trophies) and shared ownership of others (the house, the garden, the world)

---

## Gameplay Loop

### Day-to-Day
- Log in, see your partner's position in the world
- Water flowers, check cross-breeding results from the night before
- Explore undiscovered parts of the map
- Find wild flowers with interesting genetics, harvest seeds
- Tend to pets, move them between structures
- Build or decorate

### Long-Term
- Discover rare genetic combinations through cross-breeding
- Collect all pet varieties
- Unlock all interior rooms and decorate the house
- Explore the full map
- Complete couple milestones together

### Competitive Moments
- One player challenges the other to a Flower Show
- Both go off independently to find/breed the best specimen for a category
- Submit specimens, automated judging system scores them
- Trophy awarded, bragging rights enshrined

---

## World

### Scale
- **1024 × 1024 tiles** (configurable — may start at 512×512 for performance testing)
- 16px per tile
- Chunk-based loading: 16×16 tile chunks, ~9×9 chunk active zone per player

### Generation
- One-time procedural generation at world creation using a stored seed
- World is permanent — never regenerated
- Biomes: meadow, forest edge, rocky outcrops, wetlands, dense woodland
- Points of interest: starting home plot, rare wild flower patches, nesting sites

### Layers
1. **Terrain** — grass, dirt, stone, water, sand, path
2. **Decoration** — trees, rocks, wild flowers (with random genetics), mushrooms
3. **Structures** — player-placed buildings
4. **Entities** — players, pets, grown flowers

### Seasons (planned, not v1)
- Spring → Summer → Autumn → Winter
- Real calendar: ~1 real month per in-game year (configurable)
- Affects which flowers bloom, ambient visuals, some pet behaviors

---

## Flower Genetics System

The heart of the game. Based on Mendelian genetics (similar to Animal Crossing: New Horizons roses but richer).

### Gene Model
Each flower has **5 gene loci**, diploid (2 alleles each). Alleles are binary: `0` (recessive) or `1` (dominant).

```
R — Red pigment
Y — Yellow pigment
W — White / brightness
S — Scent intensity
G — Growth speed
```

Full genotype = 10 alleles stored per flower instance.

### Color Expression (example: Roses)

| R | Y | W | Color |
|---|---|---|-------|
| 2 | 0 | 0 | Red |
| 2 | 2 | 0 | Orange |
| 0 | 2 | 0 | Yellow |
| 0 | 0 | 2 | White |
| 2 | 0 | 2 | Pink |
| 1 | 0 | 0 | Light Red |
| 2 | 2 | 2 | Gold (rare) |
| 0 | 0 | 0 | Green (ultra rare) |

Each species has its own expression table. Different rules for tulips, pansies, hyacinths, cosmos, lilies, etc.

### Cross-Breeding Rules
- Two flowers of the same species **adjacent** on the grid have a daily chance to produce a seed
- Each parent contributes one random allele per locus (standard Mendelian segregation)
- Offspring genotype assembled, phenotype computed
- Seed appears on an adjacent empty tile
- Players can pick up seeds or let them grow in place

### Traits
| Trait | Gene(s) | Effect |
|-------|---------|--------|
| Color | R, Y, W | Visual appearance, competition scoring |
| Scent | S | Pet interaction frequency, competition scoring |
| Growth speed | G | Days from seed to mature |
| Size | R + Y combined value | Visual scale, competition scoring |
| Shimmer | All 5 loci homozygous recessive | Rare visual sparkle — ultra rare |

### Flower Species (initial list)
Rose, Tulip, Pansy, Hyacinth, Cosmos, Lily, Windflower, Mum
- Each has a unique color expression table
- Each has a unique sprite set per phenotype

---

## Pets

Cosmetic companions with personality-driven idle behavior. No stat effects on gameplay.

### Ownership
- Each player has personal pets
- Some pets can be marked as "shared" (both players are owners)
- Pets have a home structure they live in when not following a player

### Species & Varieties

**Snakes**
- Corn Snake — warm coloring, docile, follows owner closely
- Ball Python — patterned, coils near flower beds
- Milk Snake — banded, fast movement
- King Snake — large, territorial of home plot
- Hognose — small, plays dead animation easter egg

**Spiders**
- Mexican Red Knee Tarantula — large, slow, imposing presence
- Jumping Spider — tiny, bouncy, very expressive face animations
- Orb Weaver — builds visible web decorations on structures
- Golden Silk — spins yellow web, drops silk crafting material (rare)

**Owls**
- Barn Owl — nocturnal, perches on roof at night
- Great Horned Owl — large, guards aviary
- Snowy Owl — white, rare, associated with winter
- Burrowing Owl — small, digs entrance holes near garden beds

**Eagles**
- Bald Eagle — soars in large circles overhead
- Golden Eagle — perches on high rocks
- Harpy Eagle — largest, ultra rare to find in the wild

### Pet Data Model
```
Pet {
  id
  species
  variety
  name (player-given)
  owner: "player_a" | "player_b" | "shared"
  personality_seed       // determines idle behavior variance
  home_structure_id      // which terrarium/aviary they live in
  follow_player_id       // null = free-roaming
}
```

### Pet Behaviors
- Free-roam around home structure when not following
- Follow owner on command (toggle)
- Species-appropriate idles: snakes bask, spiders groom, owls head-rotate, eagles preen
- React to high-scent flowers (S gene = 2,2) with sniff/interest animation

---

## Building System

Stardew-style structure placement: open build menu, select structure, choose tile location, confirm. Structures appear after a short in-game delay (or instantly — sandbox preference).

### Structures

**Home**
| Structure | Description |
|-----------|-------------|
| House | Main home. Upgradeable. Has an enterable interior. |
| Greenhouse | Year-round growing, faster cross-breeding tick |
| Garden Bed | Raised planting zone, increased yield |
| Fence / Gate | Boundary markers, aesthetic |
| Path tiles | Decorative ground cover (stone, wood, mossy, gravel) |

**Pet Housing**
| Structure | Capacity | Notes |
|-----------|----------|-------|
| Terrarium (Small) | 1 snake or spider | Visible interior through glass |
| Terrarium (Large) | 3 snakes/spiders | Larger glass window |
| Aviary (Small) | 1 owl | Mesh walls |
| Aviary (Large) | 2 eagles or owls | Larger mesh structure |
| Burrow | 1 burrowing owl | Underground entrance tile |

**Utility**
| Structure | Function |
|-----------|----------|
| Seed Cabinet | Stores seeds, displays full genetic info on hover |
| Flower Press | Converts flowers to pressed specimens for competition |
| Crafting Table | Combine materials |

### Interiors
- Houses have enterable interiors — walk through door, camera transitions to interior scene
- Interior is a separate tilemap (same tile system)
- Placeable items: furniture, small terrariums, flower pots, shelves, rugs, wallpaper
- Multiple rooms unlockable via house upgrade

---

## Competition System

### Flower Show

Either player initiates a **Flower Show Challenge** with a category (e.g., "Best Red Rose", "Rarest Tulip", "Most Scented Cosmos").

**Flow:**
1. Challenge issued → both players notified
2. Each player hunts/breeds independently over N in-game days
3. At deadline, each submits one specimen
4. Automated judging computes scores
5. Results displayed side-by-side
6. Winner receives a Trophy item

**Judging Criteria (each 0–100):**
| Criterion | Description |
|-----------|-------------|
| Genetic Rarity | Rarer allele combinations score higher |
| Color Purity | How close to a "maxed" phenotype expression |
| Scent | S gene value |
| Size | Computed size trait |
| Shimmer Bonus | Flat bonus if shimmer trait present |

**Trophies:** Physical inventory items. Can be placed in house as decoration.

### Future Competitions (not v1)
- Bouquet arrangement judging (aesthetic scoring)
- Pet variety showcase
- Garden design contest

---

## Progression

### Shared Milestones (couple achievements)
- First Rare Flower — breed a non-starter color variant
- Full House — all interior rooms unlocked
- Menagerie — one of every pet species owned
- Gold Rose — breed the rarest rose genotype
- Half the Map — uncover 50% of the world
- Flower Show Champions — win 5 shows combined

### Individual Progression
- Trophy collection (flower show wins)
- Personal pet collection (own pets by variety)
- Flower species catalogue (% of genetic combos discovered per species)
- Competition record (wins / losses / ties)

---

## Tech Stack

### Frontend
| Tool | Role |
|------|------|
| React 19 + TypeScript | App shell, all UI layers |
| PixiJS v8 (`@pixi/react`) | WebGL game canvas — tiles, sprites, animations |
| Zustand | Client game state (world, player, inventory, UI slices) |
| Socket.io-client | Real-time multiplayer sync |
| Vite | Build tooling |

**Architecture note:** React DOM owns UI (inventory, HUD, menus, dialogs). PixiJS owns the game canvas. React never renders tiles — this is how we hit 60fps on a large map.

### Backend
| Tool | Role |
|------|------|
| Node.js + Fastify | HTTP API + WebSocket host |
| Socket.io | Real-time event bus |
| PostgreSQL | World persistence, genetics data, player state |
| Redis | Live player positions, ephemeral session state |

### Monorepo
- **pnpm workspaces**
- `packages/client` — React + Pixi frontend
- `packages/server` — Node.js backend
- `packages/shared` — TypeScript types + genetics engine (runs on both client and server)

### Deployment targets
- Frontend: Vercel or Cloudflare Pages
- Backend: Fly.io or Railway
- Database: Supabase (managed Postgres)

---

## Multiplayer Sync Model

**Server-authoritative with client prediction.**

| Data type | Transport | Storage |
|-----------|-----------|---------|
| Player positions | Redis (20x/sec via Socket.io) | Ephemeral |
| Tile changes (plant, remove) | Socket.io event → Postgres write | Persistent |
| Inventory changes | Socket.io event → Postgres write | Persistent |
| Structure placed/demolished | Socket.io event → Postgres write | Persistent |
| Pet relocations | Socket.io event → Postgres write | Persistent |
| Competition events | Socket.io event → Postgres write | Persistent |

**Conflict resolution:** Server processes first-in wins. Loser receives a correction event.

---

## Project Structure

```
darjeeling/
├── packages/
│   ├── client/
│   │   └── src/
│   │       ├── game/        # PixiJS scene, chunk renderer, camera
│   │       ├── ui/          # React overlays (inventory, HUD, menus)
│   │       ├── store/       # Zustand slices
│   │       ├── net/         # Socket.io client, sync logic
│   │       └── systems/     # Flower tick, pet AI, building
│   ├── server/
│   │   └── src/
│   │       ├── world/       # Chunk management, world generation
│   │       ├── sync/        # Socket.io event handlers
│   │       ├── api/         # REST endpoints
│   │       └── db/          # Postgres queries / migrations
│   └── shared/
│       └── src/
│           ├── types/       # All shared TypeScript types
│           ├── genetics/    # Mendelian engine (used by both sides)
│           └── constants/   # Tile IDs, species tables, gene tables
├── PRD.md                   # This file
└── pnpm-workspace.yaml
```

---

## Build Order

System dependencies enforced — don't skip ahead.

1. **Monorepo scaffold** — pnpm workspaces, Vite, TypeScript configs
2. **Shared types** — Tile, Chunk, Player, Flower, Pet, Structure interfaces
3. **PixiJS canvas** — rendering loop, chunk loader, camera pan/zoom (static data)
4. **Player movement** — local player + networked second player visible
5. **Genetics engine** — pure TypeScript, unit tested before any UI touches it
6. **Tile interaction** — click to plant a flower, genetics applied to sprite
7. **Inventory system** — item slots, pickup, use
8. **Building placement** — structure menu, tile placement, exterior visuals
9. **Pet system** — adopt, name, home structure, follow toggle
10. **Interiors** — door transition, interior tilemap, furniture placement
11. **Cross-breeding tick** — daily server-side breeding pass, seed generation
12. **Competition system** — challenge flow, judging, trophies
13. **Progression / milestones** — shared goals, individual catalogues
14. **World generation** — replace static test data with full proc-gen
15. **Seasons** — calendar system, seasonal tile/flower/pet overlays

---

## Open Questions / Decisions Deferred

- **Authentication:** Simple invite-code pair (just for two people) vs. full auth? Lean toward invite-code for simplicity.
- **Mobile support:** Keyboard + mouse first. Touch later or never.
- **Wild pet encounters:** Do eagles/owls spawn in the world to be "found and tamed"? How does first acquisition work?
- **Crafting depth:** How many craftable items? Keep it shallow to avoid scope creep.
- **Music/audio:** Placeholder or custom? At minimum ambient audio layer per biome.
- **Map edge:** Hard wall, ocean border, or "more world to unlock"?
- **Starting flowers:** What genotypes do players begin with? Need starter seeds that allow diverse breeding from day one.
