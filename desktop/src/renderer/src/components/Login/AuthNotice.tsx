import { CircleAlert, CircleCheck, Info } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

export type AuthNoticeTone = 'info' | 'success' | 'error'

const TONES: Record<AuthNoticeTone, { icon: LucideIcon; wrapper: string; iconClass: string }> = {
  info: {
    icon: Info,
    wrapper: 'border-brand/25 bg-brand/[0.08] text-emerald-50/90',
    iconClass: 'text-brand'
  },
  success: {
    icon: CircleCheck,
    wrapper: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100',
    iconClass: 'text-emerald-400'
  },
  error: {
    icon: CircleAlert,
    wrapper: 'border-red-500/30 bg-red-500/10 text-red-200',
    iconClass: 'text-red-400'
  }
}

interface AuthNoticeProps {
  tone: AuthNoticeTone
  children: ReactNode
}

export default function AuthNotice({ tone, children }: AuthNoticeProps): React.JSX.Element {
  const { icon: Icon, wrapper, iconClass } = TONES[tone]

  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      aria-live={tone === 'error' ? 'assertive' : 'polite'}
      className={`flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-[13px] ${wrapper}`}
    >
      <Icon size={16} className={`mt-0.5 shrink-0 ${iconClass}`} aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
}
