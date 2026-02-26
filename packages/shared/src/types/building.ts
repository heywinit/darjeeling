// ─── Building / Structure types ───────────────────────────────────────────────

export enum StructureType {
  // Home
  House = 'house',
  Greenhouse = 'greenhouse',
  GardenBed = 'garden_bed',
  Fence = 'fence',
  Gate = 'gate',
  PathTile = 'path_tile',
  // Pet housing
  TerrariumSmall = 'terrarium_small',
  TerrariumLarge = 'terrarium_large',
  AviarySmall = 'aviary_small',
  AviaryLarge = 'aviary_large',
  Burrow = 'burrow',
  // Utility
  SeedCabinet = 'seed_cabinet',
  FlowerPress = 'flower_press',
  CraftingTable = 'crafting_table',
}

export enum PathVariant {
  Stone = 'stone',
  Wood = 'wood',
  Gravel = 'gravel',
  Mossy = 'mossy',
}

/** Footprint of a structure in tiles */
export interface StructureFootprint {
  width: number   // tiles
  height: number  // tiles
}

export const STRUCTURE_FOOTPRINT: Record<StructureType, StructureFootprint> = {
  [StructureType.House]:          { width: 5, height: 4 },
  [StructureType.Greenhouse]:     { width: 4, height: 3 },
  [StructureType.GardenBed]:      { width: 3, height: 2 },
  [StructureType.Fence]:          { width: 1, height: 1 },
  [StructureType.Gate]:           { width: 1, height: 1 },
  [StructureType.PathTile]:       { width: 1, height: 1 },
  [StructureType.TerrariumSmall]: { width: 2, height: 2 },
  [StructureType.TerrariumLarge]: { width: 3, height: 2 },
  [StructureType.AviarySmall]:    { width: 3, height: 3 },
  [StructureType.AviaryLarge]:    { width: 5, height: 4 },
  [StructureType.Burrow]:         { width: 1, height: 1 },
  [StructureType.SeedCabinet]:    { width: 1, height: 1 },
  [StructureType.FlowerPress]:    { width: 2, height: 1 },
  [StructureType.CraftingTable]:  { width: 2, height: 1 },
}

export interface StructureInstance {
  id: string
  type: StructureType
  /** Top-left tile coord */
  tx: number
  ty: number
  /** Variant for path tiles */
  variant?: string
  /** Interior scene id for House/Greenhouse */
  interiorId?: string
  /** Days until construction complete, 0 = done */
  constructionDaysLeft: number
  placedBy: string
}
