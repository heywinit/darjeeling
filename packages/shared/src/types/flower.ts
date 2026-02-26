// ─── Flower / Genetics types ──────────────────────────────────────────────────

/**
 * A single allele: 0 = recessive, 1 = dominant.
 */
export type Allele = 0 | 1

/**
 * A gene locus: pair of alleles from each parent.
 * Value = sum of alleles (0 | 1 | 2), used in expression tables.
 */
export type GeneLocus = [Allele, Allele]
export type LocusValue = 0 | 1 | 2 // sum of the pair

/**
 * Full genotype: 5 loci — R, Y, W, S, G
 *   R = Red pigment
 *   Y = Yellow pigment
 *   W = White / brightness
 *   S = Scent intensity
 *   G = Growth speed
 */
export interface Genotype {
  R: GeneLocus
  Y: GeneLocus
  W: GeneLocus
  S: GeneLocus
  G: GeneLocus
}

export enum FlowerSpecies {
  Rose = 'rose',
  Tulip = 'tulip',
  Pansy = 'pansy',
  Hyacinth = 'hyacinth',
  Cosmos = 'cosmos',
  Lily = 'lily',
  Windflower = 'windflower',
  Mum = 'mum',
}

/**
 * The visible result of gene expression.
 */
export interface FlowerPhenotype {
  color: string       // e.g. 'red', 'gold', 'white', 'green'
  scentLevel: 0 | 1 | 2
  growthDays: number  // days from seed to mature (1–5)
  size: 'small' | 'medium' | 'large'
  shimmer: boolean    // ultra-rare — all 5 loci homozygous recessive
}

export interface FlowerInstance {
  id: string
  species: FlowerSpecies
  genotype: Genotype
  phenotype: FlowerPhenotype
  /** Tile coord where this flower is planted */
  tx: number
  ty: number
  /** Days alive (incremented server-side each in-game day) */
  age: number
  mature: boolean
  /** null = wild/unclaimed, otherwise the player who planted it */
  plantedBy: string | null
}

/**
 * A harvested flower in inventory — no position, just genetics + appearance.
 */
export interface FlowerSeed {
  id: string
  species: FlowerSpecies
  genotype: Genotype
  phenotype: FlowerPhenotype
}
