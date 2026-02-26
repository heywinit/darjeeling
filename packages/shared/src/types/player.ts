// ─── Player types ─────────────────────────────────────────────────────────────

export type PlayerId = 'player_a' | 'player_b'

export enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}

export interface PlayerState {
  id: PlayerId
  displayName: string
  /** Pixel position in the world */
  x: number
  y: number
  direction: Direction
  isMoving: boolean
  /** Which interior scene the player is in, null if in the overworld */
  interiorId: string | null
}

export interface PlayerProfile {
  id: PlayerId
  displayName: string
  joinedAt: string
}
