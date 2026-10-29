import { Minus, Square, X } from 'lucide-react'

export default function WindowControls(): React.JSX.Element {
  return (
    <div
      className="fixed right-0 top-0 z-50 flex h-10"
      style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
    >
      <button
        type="button"
        className="flex h-10 w-14 items-center justify-center text-white hover:bg-white/10"
        onClick={() => window.windowControls.minimize()}
        aria-label="Minimizar"
        title="Minimizar"
      >
        <Minus size={16} />
      </button>

      <button
        type="button"
        className="flex h-10 w-14 items-center justify-center text-white hover:bg-white/10"
        onClick={() => window.windowControls.maximize()}
        aria-label="Maximizar o restaurar"
        title="Maximizar o restaurar"
      >
        <Square size={14} />
      </button>

      <button
        type="button"
        className="flex h-10 w-14 items-center justify-center text-white hover:bg-red-600"
        onClick={() => window.windowControls.close()}
        aria-label="Cerrar"
        title="Cerrar"
      >
        <X size={18} />
      </button>
    </div>
  )
}