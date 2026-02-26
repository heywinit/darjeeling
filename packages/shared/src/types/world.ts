// ─── World / Tile types ───────────────────────────────────────────────────────

export const TILE_SIZE = 16 // px per tile
export const CHUNK_SIZE = 16 // tiles per chunk side
export const WORLD_SIZE = 1024 // tiles per world side (1024×1024)

export type TileCoord = { tx: number; ty: number }
export type ChunkCoord = { cx: number; cy: number }
export type WorldPos = { x: number; y: number } // pixel position

export enum TileType {
  Grass = 'grass',
  DirtPath = 'dirt_path',
  Stone = 'stone',
  Water = 'water',
  Sand = 'sand',
  WetSoil = 'wet_soil',
  GardenBed = 'garden_bed',
}

export enum BiomeType {
  Meadow = 'meadow',
  ForestEdge = 'forest_edge',
  Rocky = 'rocky',
  Wetlands = 'wetlands',
  DenseWood = 'dense_wood',
}

export interface Tile {
  type: TileType
  biome: BiomeType
  /** decoration sprite id, null if bare tile */
  decoration: string | null
  /** passable by players */
  walkable: boolean
}

export interface Chunk {
  cx: number
  cy: number
  tiles: Tile[] // flat array, length CHUNK_SIZE * CHUNK_SIZE, row-major
  /** server-assigned revision number — increments on any change */
  revision: number
}

export interface WorldMeta {
  worldId: string
  seed: number
  width: number  // in tiles
  height: number // in tiles
  createdAt: string
}
