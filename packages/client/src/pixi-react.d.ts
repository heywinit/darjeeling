// Augment React's JSX namespace with @pixi/react v8 custom elements.
// These are registered at runtime via extend() but TypeScript needs the types.
import type { ContainerProps, GraphicsProps } from '@pixi/react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      pixiContainer: ContainerProps
      pixiGraphics: GraphicsProps
    }
  }
}
