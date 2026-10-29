// Líneas onduladas decorativas: dentro de la tarjeta y encima del fondo de pantalla.

type DecorLinesVariant = 'card' | 'background'

interface DecorLinesProps {
  variant: DecorLinesVariant
}

// Ondas suaves apiladas en la parte inferior de la tarjeta
const CARD_WAVES = Array.from({ length: 10 }, (_, index) => ({
  d: `M0 ${86 + index * 13} Q 130 ${26 + index * 13} 260 ${86 + index * 13} T 520 ${78 + index * 13}`,
  opacity: 0.08 + index * 0.05
}))

// Curvas de gran tamaño que recorren el fondo de la ventana
const BACKGROUND_LINES: Array<{ d: string; color: string; opacity: number }> = [
  { d: 'M -120 520 C 340 200, 760 880, 1680 360', color: '#1ed760', opacity: 0.04 },
  { d: 'M -120 585 C 340 265, 760 945, 1680 425', color: '#1ed760', opacity: 0.05 },
  { d: 'M -120 650 C 340 330, 760 1010, 1680 490', color: '#1ed760', opacity: 0.04 },
  { d: 'M -120 300 C 500 120, 980 520, 1680 260', color: '#ffffff', opacity: 0.03 },
  { d: 'M -120 360 C 500 180, 980 580, 1680 320', color: '#ffffff', opacity: 0.03 },
  { d: 'M 240 -60 C 620 320, 1120 300, 1680 780', color: '#1ed760', opacity: 0.04 },
  { d: 'M 320 -60 C 700 360, 1200 360, 1680 860', color: '#1ed760', opacity: 0.03 },
  { d: 'M -120 170 C 420 40, 900 320, 1680 150', color: '#ffffff', opacity: 0.025 },
  { d: 'M 120 -40 C 460 240, 940 200, 1680 640', color: '#1ed760', opacity: 0.03 }
]

export default function DecorLines({ variant }: DecorLinesProps): React.JSX.Element {
  if (variant === 'card') {
    return (
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 w-full"
        preserveAspectRatio="none"
        viewBox="0 0 520 240"
      >
        <defs>
          <linearGradient id="gm-card-waves" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1ed760" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#1ed760" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1ed760" stopOpacity="0.03" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#gm-card-waves)" strokeWidth="1.1">
          {CARD_WAVES.map((wave) => (
            <path key={wave.d} d={wave.d} opacity={wave.opacity} />
          ))}
        </g>
      </svg>
    )
  }

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1536 1024"
    >
      <g fill="none" strokeLinecap="round" strokeWidth="1.2">
        {BACKGROUND_LINES.map((line) => (
          <path key={line.d} d={line.d} stroke={line.color} opacity={line.opacity} />
        ))}
      </g>
    </svg>
  )
}
