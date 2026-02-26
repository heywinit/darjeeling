// ─── Pet types ────────────────────────────────────────────────────────────────

export enum PetSpecies {
  // Snakes
  CornSnake = 'corn_snake',
  BallPython = 'ball_python',
  MilkSnake = 'milk_snake',
  KingSnake = 'king_snake',
  Hognose = 'hognose',
  // Spiders
  RedKneeTarantula = 'red_knee_tarantula',
  JumpingSpider = 'jumping_spider',
  OrbWeaver = 'orb_weaver',
  GoldenSilk = 'golden_silk',
  // Owls
  BarnOwl = 'barn_owl',
  GreatHornedOwl = 'great_horned_owl',
  SnowyOwl = 'snowy_owl',
  BurrowingOwl = 'burrowing_owl',
  // Eagles
  BaldEagle = 'bald_eagle',
  GoldenEagle = 'golden_eagle',
  HarpyEagle = 'harpy_eagle',
}

export enum PetFamily {
  Snake = 'snake',
  Spider = 'spider',
  Owl = 'owl',
  Eagle = 'eagle',
}

export const PET_FAMILY: Record<PetSpecies, PetFamily> = {
  [PetSpecies.CornSnake]: PetFamily.Snake,
  [PetSpecies.BallPython]: PetFamily.Snake,
  [PetSpecies.MilkSnake]: PetFamily.Snake,
  [PetSpecies.KingSnake]: PetFamily.Snake,
  [PetSpecies.Hognose]: PetFamily.Snake,
  [PetSpecies.RedKneeTarantula]: PetFamily.Spider,
  [PetSpecies.JumpingSpider]: PetFamily.Spider,
  [PetSpecies.OrbWeaver]: PetFamily.Spider,
  [PetSpecies.GoldenSilk]: PetFamily.Spider,
  [PetSpecies.BarnOwl]: PetFamily.Owl,
  [PetSpecies.GreatHornedOwl]: PetFamily.Owl,
  [PetSpecies.SnowyOwl]: PetFamily.Owl,
  [PetSpecies.BurrowingOwl]: PetFamily.Owl,
  [PetSpecies.BaldEagle]: PetFamily.Eagle,
  [PetSpecies.GoldenEagle]: PetFamily.Eagle,
  [PetSpecies.HarpyEagle]: PetFamily.Eagle,
}

export type PetOwnership = 'player_a' | 'player_b' | 'shared'

export interface PetInstance {
  id: string
  species: PetSpecies
  name: string
  ownership: PetOwnership
  /** Deterministic seed for idle behavior variance */
  personalitySeed: number
  /** Structure id this pet lives in when not following */
  homeStructureId: string | null
  /** Which player this pet is currently following, null = free-roam */
  followingPlayerId: string | null
  /** Current pixel position */
  x: number
  y: number
}
