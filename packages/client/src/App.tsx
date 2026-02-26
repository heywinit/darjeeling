import GameCanvas from '@/game/GameCanvas'
import HUD from '@/ui/HUD'

export default function App() {
  return (
    <div className="relative w-full h-full">
      {/* PixiJS game canvas — owns the full viewport */}
      <GameCanvas />

      {/* React UI overlays — rendered on top of canvas via absolute positioning */}
      <HUD />
    </div>
  )
}
