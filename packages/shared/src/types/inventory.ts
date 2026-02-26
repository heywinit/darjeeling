// ─── Inventory types ──────────────────────────────────────────────────────────

import type { FlowerSeed } from './flower.js'
import type { StructureType } from './building.js'

export enum ItemType {
  FlowerSeed = 'flower_seed',
  PressedFlower = 'pressed_flower',
  StructureBlueprint = 'structure_blueprint',
  Trophy = 'trophy',
  Material = 'material',
}

export interface InventoryItem {
  id: string
  type: ItemType
  quantity: number
  /** Populated when type = FlowerSeed */
  seedData?: FlowerSeed
  /** Populated when type = StructureBlueprint */
  structureType?: StructureType
  /** Display label (for materials/trophies) */
  label?: string
  spriteId: string
}

export const INVENTORY_SLOTS = 36 // 6×6 grid

export interface Inventory {
  playerId: string
  slots: (InventoryItem | null)[] // length = INVENTORY_SLOTS
}
