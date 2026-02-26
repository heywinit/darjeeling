import { Application } from '@pixi/react'
import WorldStage from './WorldStage'

/**
 * Full-viewport PixiJS application.
 * React DOM never touches anything inside here — all rendering is WebGL.
 */
export default function GameCanvas() {
  return (
    <Application
      width={window.innerWidth}
      height={window.innerHeight}
      background={0x2d5a27}
      antialias={false}
      resolution={1}
      style={{ position: 'absolute', inset: 0 }}
    >
      <WorldStage />
    </Application>
  )
}
