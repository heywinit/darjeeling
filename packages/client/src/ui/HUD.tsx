/**
 * React DOM overlay — always on top of the game canvas.
 * Inventory bar, player info, menus will live here.
 */
export default function HUD() {
  return (
    <>
      {/* Top-left: player info placeholder */}
      <div className="absolute top-3 left-3 bg-black/50 rounded-lg px-3 py-2 text-sm text-white/80 backdrop-blur-sm">
        🌸 Darjeeling
      </div>

      {/* Bottom-center: hotbar placeholder */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="w-10 h-10 bg-black/50 border border-white/20 rounded backdrop-blur-sm"
          />
        ))}
      </div>
    </>
  )
}
