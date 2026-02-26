import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type { PlayerState, FlowerInstance, PetInstance, StructureInstance } from '@darjeeling/shared'

interface GameStore {
  // World
  worldId: string | null
  // Players
  localPlayerId: string | null
  players: Record<string, PlayerState>
  // Entities
  flowers: Record<string, FlowerInstance>
  pets: Record<string, PetInstance>
  structures: Record<string, StructureInstance>
  // UI state
  isPaused: boolean

  // Actions
  setWorldId: (id: string) => void
  setLocalPlayerId: (id: string) => void
  upsertPlayer: (player: PlayerState) => void
  upsertFlower: (flower: FlowerInstance) => void
  removeFlower: (id: string) => void
  upsertPet: (pet: PetInstance) => void
  upsertStructure: (s: StructureInstance) => void
  removeStructure: (id: string) => void
}

export const useGameStore = create<GameStore>()(
  subscribeWithSelector((set) => ({
    worldId: null,
    localPlayerId: null,
    players: {},
    flowers: {},
    pets: {},
    structures: {},
    isPaused: false,

    setWorldId: (id) => set({ worldId: id }),
    setLocalPlayerId: (id) => set({ localPlayerId: id }),

    upsertPlayer: (player) =>
      set((s) => ({ players: { ...s.players, [player.id]: player } })),

    upsertFlower: (flower) =>
      set((s) => ({ flowers: { ...s.flowers, [flower.id]: flower } })),

    removeFlower: (id) =>
      set((s) => {
        const next = { ...s.flowers }
        delete next[id]
        return { flowers: next }
      }),

    upsertPet: (pet) =>
      set((s) => ({ pets: { ...s.pets, [pet.id]: pet } })),

    upsertStructure: (structure) =>
      set((s) => ({ structures: { ...s.structures, [structure.id]: structure } })),

    removeStructure: (id) =>
      set((s) => {
        const next = { ...s.structures }
        delete next[id]
        return { structures: next }
      }),
  })),
)
