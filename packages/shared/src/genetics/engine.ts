// ─── Mendelian Genetics Engine ────────────────────────────────────────────────
// Runs on both client (preview) and server (authoritative).

import type {
  Allele,
  GeneLocus,
  Genotype,
  FlowerPhenotype,
  LocusValue,
} from '../types/flower.js'
import { FlowerSpecies } from '../types/flower.js'

// ── Helpers ───────────────────────────────────────────────────────────────────

export function locusValue(locus: GeneLocus): LocusValue {
  return (locus[0] + locus[1]) as LocusValue
}

/**
 * Pick one allele from a locus at random (Mendelian segregation).
 * Pass a seeded RNG for deterministic results.
 */
export function segregate(locus: GeneLocus, random: () => number): Allele {
  return random() < 0.5 ? locus[0] : locus[1]
}

/**
 * Cross two parents to produce an offspring genotype.
 */
export function crossBreed(
  parentA: Genotype,
  parentB: Genotype,
  random: () => number,
): Genotype {
  return {
    R: [segregate(parentA.R, random), segregate(parentB.R, random)],
    Y: [segregate(parentA.Y, random), segregate(parentB.Y, random)],
    W: [segregate(parentA.W, random), segregate(parentB.W, random)],
    S: [segregate(parentA.S, random), segregate(parentB.S, random)],
    G: [segregate(parentA.G, random), segregate(parentB.G, random)],
  }
}

// ── Color expression tables ───────────────────────────────────────────────────
// Key format: `${R_value}-${Y_value}-${W_value}`

type ColorTable = Record<string, string>

const ROSE_COLORS: ColorTable = {
  '2-0-0': 'red',
  '1-0-0': 'light_red',
  '2-2-0': 'orange',
  '0-2-0': 'yellow',
  '1-2-0': 'yellow',
  '0-0-2': 'white',
  '1-0-2': 'pink',
  '2-0-2': 'pink',
  '0-1-2': 'white',
  '2-2-2': 'gold',
  '0-0-0': 'green',
  '1-1-0': 'orange',
  '0-2-2': 'white',
  '1-2-2': 'white',
  '2-1-0': 'red',
  '2-1-2': 'pink',
  '1-1-2': 'pink',
  '1-1-1': 'light_red',
  '2-2-1': 'orange',
}

const TULIP_COLORS: ColorTable = {
  '2-0-0': 'red',
  '1-0-0': 'pink',
  '0-0-0': 'white',
  '0-0-2': 'white',
  '2-2-0': 'orange',
  '0-2-0': 'yellow',
  '1-1-0': 'pink',
  '2-0-2': 'purple',
  '2-2-2': 'purple',
  '1-0-2': 'purple',
  '0-1-0': 'white',
  '1-2-0': 'yellow',
  '0-2-2': 'white',
  '0-1-2': 'white',
  '2-1-0': 'red',
  '1-1-2': 'purple',
}

const PANSY_COLORS: ColorTable = {
  '2-0-0': 'red',
  '0-2-0': 'yellow',
  '0-0-2': 'blue',
  '2-2-0': 'orange',
  '2-0-2': 'purple',
  '0-2-2': 'blue',
  '2-2-2': 'purple',
  '0-0-0': 'white',
  '1-1-1': 'orange',
  '1-0-2': 'blue',
  '1-2-0': 'yellow',
  '2-1-2': 'purple',
}

const COLOR_TABLES: Record<FlowerSpecies, ColorTable> = {
  [FlowerSpecies.Rose]:       ROSE_COLORS,
  [FlowerSpecies.Tulip]:      TULIP_COLORS,
  [FlowerSpecies.Pansy]:      PANSY_COLORS,
  // Remaining species inherit a simplified table for now
  [FlowerSpecies.Hyacinth]:   TULIP_COLORS,
  [FlowerSpecies.Cosmos]:     PANSY_COLORS,
  [FlowerSpecies.Lily]:       ROSE_COLORS,
  [FlowerSpecies.Windflower]: PANSY_COLORS,
  [FlowerSpecies.Mum]:        ROSE_COLORS,
}

function resolveColor(species: FlowerSpecies, g: Genotype): string {
  const key = `${locusValue(g.R)}-${locusValue(g.Y)}-${locusValue(g.W)}`
  return COLOR_TABLES[species][key] ?? 'white'
}

// ── Shimmer check ─────────────────────────────────────────────────────────────
// All 5 loci must be homozygous recessive (0,0)

function isShimmer(g: Genotype): boolean {
  return (
    locusValue(g.R) === 0 &&
    locusValue(g.Y) === 0 &&
    locusValue(g.W) === 0 &&
    locusValue(g.S) === 0 &&
    locusValue(g.G) === 0
  )
}

// ── Phenotype expression ──────────────────────────────────────────────────────

const GROWTH_DAYS_BY_G: Record<LocusValue, number> = { 0: 5, 1: 3, 2: 1 }
const SIZE_BY_RY: Record<string, FlowerPhenotype['size']> = {
  '0': 'small',
  '1': 'small',
  '2': 'medium',
  '3': 'medium',
  '4': 'large',
}

export function expressGenotype(
  species: FlowerSpecies,
  genotype: Genotype,
): FlowerPhenotype {
  const scentLevel = locusValue(genotype.S) as 0 | 1 | 2
  const growthDays = GROWTH_DAYS_BY_G[locusValue(genotype.G)]
  const rySum = locusValue(genotype.R) + locusValue(genotype.Y)
  const size = SIZE_BY_RY[String(rySum)] ?? 'medium'
  const shimmer = isShimmer(genotype)
  const color = shimmer ? 'rainbow' : resolveColor(species, genotype)

  return { color, scentLevel, growthDays, size, shimmer }
}

// ── Starter genotypes ─────────────────────────────────────────────────────────
// Both players begin with these seeds — chosen to allow diverse breeding.

export const STARTER_GENOTYPES: Record<FlowerSpecies, Genotype[]> = {
  [FlowerSpecies.Rose]: [
    { R: [1, 1], Y: [0, 0], W: [0, 0], S: [1, 0], G: [1, 0] }, // red
    { R: [0, 0], Y: [1, 1], W: [0, 0], S: [0, 1], G: [0, 1] }, // yellow
    { R: [0, 0], Y: [0, 0], W: [1, 1], S: [0, 0], G: [1, 1] }, // white
  ],
  [FlowerSpecies.Tulip]: [
    { R: [1, 1], Y: [0, 0], W: [0, 0], S: [0, 0], G: [1, 0] }, // red
    { R: [0, 0], Y: [1, 1], W: [0, 0], S: [1, 0], G: [0, 1] }, // yellow
    { R: [0, 0], Y: [0, 0], W: [0, 0], S: [0, 1], G: [1, 1] }, // white
  ],
  [FlowerSpecies.Pansy]: [
    { R: [1, 0], Y: [0, 0], W: [0, 0], S: [1, 0], G: [0, 1] }, // red
    { R: [0, 0], Y: [1, 0], W: [0, 0], S: [0, 0], G: [1, 0] }, // yellow
    { R: [0, 0], Y: [0, 0], W: [1, 0], S: [0, 1], G: [0, 0] }, // blue
  ],
  [FlowerSpecies.Hyacinth]:   [],
  [FlowerSpecies.Cosmos]:     [],
  [FlowerSpecies.Lily]:       [],
  [FlowerSpecies.Windflower]: [],
  [FlowerSpecies.Mum]:        [],
}
