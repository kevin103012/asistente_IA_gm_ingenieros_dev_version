import { ArrowRight, LoaderCircle } from 'lucide-react'
import type { ReactNode } from 'react'

interface AuthButtonProps {
  children: ReactNode
  type?: 'button' | 'submit'
  onClick?: () => void
  loading?: boolean
  disabled?: boolean
  withArrow?: boolean
}

export default function AuthButton({
  children,
  type = 'submit',
  onClick,
  loading = false,
  disabled = false,
  withArrow = false
}: AuthButtonProps): React.JSX.Element {
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className="flex h-14 w-full items-center justify-center rounded-xl bg-brand text-[16px] font-bold text-white shadow-[0_10px_25px_-10px_rgba(30,215,96,0.55)] transition hover:bg-brand-hover active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />
          Procesando...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {children}
          {withArrow && <ArrowRight size={19} strokeWidth={2.5} aria-hidden="true" />}
        </span>
      )}
    </button>
  )
}
