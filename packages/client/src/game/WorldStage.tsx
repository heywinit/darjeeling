import { extend } from '@pixi/react'
import { Container, Graphics } from 'pixi.js'
import { useCallback } from 'react'
import { TILE_SIZE, CHUNK_SIZE } from '@darjeeling/shared'

extend({ Container, Graphics })

const VISIBLE_COLS = Math.ceil(window.innerWidth / TILE_SIZE) + 2
const VISIBLE_ROWS = Math.ceil(window.innerHeight / TILE_SIZE) + 2

/**
 * The main world scene rendered by PixiJS.
 * Currently draws a placeholder checkerboard grid.
 * Will be replaced with chunk-loaded tile sprites.
 */
export default function WorldStage() {
  const drawGrid = useCallback((g: Graphics) => {
    g.clear()
    for (let row = 0; row < VISIBLE_ROWS; row++) {
      for (let col = 0; col < VISIBLE_COLS; col++) {
        const isEven = (row + col) % 2 === 0
        g.rect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE)
        g.fill(isEven ? 0x3a7d44 : 0x2d6435)
      }
    }
    // Chunk boundary lines (every CHUNK_SIZE tiles)
    g.setStrokeStyle({ width: 1, color: 0x1a3d22, alpha: 0.4 })
    for (let col = 0; col <= VISIBLE_COLS; col += CHUNK_SIZE) {
      g.moveTo(col * TILE_SIZE, 0)
      g.lineTo(col * TILE_SIZE, VISIBLE_ROWS * TILE_SIZE)
    }
    for (let row = 0; row <= VISIBLE_ROWS; row += CHUNK_SIZE) {
      g.moveTo(0, row * TILE_SIZE)
      g.lineTo(VISIBLE_COLS * TILE_SIZE, row * TILE_SIZE)
    }
    g.stroke()
  }, [])

  return (
    <pixiContainer>
      <pixiGraphics draw={drawGrid} />
      {/* PlayerLayer, FlowerLayer, PetLayer will be added here */}
    </pixiContainer>
  )
}
