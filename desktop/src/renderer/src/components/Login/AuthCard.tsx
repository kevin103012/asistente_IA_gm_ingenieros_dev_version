import type { ReactNode } from 'react'
import { ChevronLeft } from 'lucide-react'
import logoVertical from '@renderer/img/vertical_logo_sin_fondo.png'
import DecorLines from './DecorLines'

interface AuthCardProps {
  children: ReactNode
  onBack?: () => void
}

export default function AuthCard({ children, onBack }: AuthCardProps): React.JSX.Element {
  return (
    <div
      className="h-[calc(100vh-80px)] max-h-[860px] w-full max-w-[520px] overflow-hidden rounded-[28px] border border-white/10 shadow-[0_35px_90px_-25px_rgba(0,0,0,0.75)] backdrop-blur-2xl"
      style={{
        background:
          'radial-gradient(120% 80% at 90% 0%, rgba(30, 215, 96, 0.10) 0%, transparent 55%), linear-gradient(160deg, rgba(17, 36, 29, 0.93) 0%, rgba(8, 19, 15, 0.96) 48%, rgba(5, 14, 11, 0.97) 100%)'
      }}
    >
      <DecorLines variant="card" />

      <div className="auth-scroll relative z-10 h-full overflow-y-auto px-12 pb-10 pt-6">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Volver al inicio de sesión"
            className="flex items-center gap-1 rounded-lg py-1.5 pl-1 pr-2.5 text-[13px] font-medium text-white/60 transition hover:bg-white/[0.06] hover:text-white"
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
            Volver
          </button>
        )}

        <div className="flex justify-center">
          <img
            src={logoVertical}
            alt="GM Ingenieros y Consultores"
            draggable={false}
            className="w-[300px]"
          />
        </div>

        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}
