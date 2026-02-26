// ─── Network / Socket.io event types ─────────────────────────────────────────
// Shared between client and server for type-safe event handling.

import type { PlayerState } from './player.js'
import type { Chunk } from './world.js'
import type { FlowerInstance } from './flower.js'
import type { PetInstance } from './pet.js'
import type { StructureInstance } from './building.js'

// ── Server → Client events ────────────────────────────────────────────────────

export interface S2C_WorldInit {
  worldId: string
  seed: number
  yourPlayerId: string
  players: PlayerState[]
  flowers: FlowerInstance[]
  pets: PetInstance[]
  structures: StructureInstance[]
}

export interface S2C_ChunkData {
  chunk: Chunk
}

export interface S2C_PlayerMoved {
  playerId: string
  x: number
  y: number
  direction: string
  isMoving: boolean
}

export interface S2C_FlowerPlanted {
  flower: FlowerInstance
}

export interface S2C_FlowerRemoved {
  flowerId: string
}

export interface S2C_SeedDropped {
  flower: FlowerInstance // newly grown offspring
}

export interface S2C_StructurePlaced {
  structure: StructureInstance
}

export interface S2C_StructureRemoved {
  structureId: string
}

export interface S2C_PetUpdated {
  pet: PetInstance
}

// ── Client → Server events ────────────────────────────────────────────────────

export interface C2S_Move {
  x: number
  y: number
  direction: string
  isMoving: boolean
}

export interface C2S_RequestChunk {
  cx: number
  cy: number
}

export interface C2S_PlantFlower {
  tx: number
  ty: number
  seedItemId: string // inventory item id
}

export interface C2S_RemoveFlower {
  flowerId: string
}

export interface C2S_PlaceStructure {
  type: string
  tx: number
  ty: number
  blueprintItemId: string
}

export interface C2S_RemoveStructure {
  structureId: string
}

// ── Socket.io event map (for typed emit/on) ───────────────────────────────────

export interface ServerToClientEvents {
  world_init: (data: S2C_WorldInit) => void
  chunk_data: (data: S2C_ChunkData) => void
  player_moved: (data: S2C_PlayerMoved) => void
  flower_planted: (data: S2C_FlowerPlanted) => void
  flower_removed: (data: S2C_FlowerRemoved) => void
  seed_dropped: (data: S2C_SeedDropped) => void
  structure_placed: (data: S2C_StructurePlaced) => void
  structure_removed: (data: S2C_StructureRemoved) => void
  pet_updated: (data: S2C_PetUpdated) => void
}

export interface ClientToServerEvents {
  move: (data: C2S_Move) => void
  request_chunk: (data: C2S_RequestChunk) => void
  plant_flower: (data: C2S_PlantFlower) => void
  remove_flower: (data: C2S_RemoveFlower) => void
  place_structure: (data: C2S_PlaceStructure) => void
  remove_structure: (data: C2S_RemoveStructure) => void
}
