import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface AuthFieldProps {
  id: string
  label: string
  type?: 'text' | 'email' | 'password'
  icon: LucideIcon
  placeholder?: string
  value: string
  onChange: (value: string) => void
  autoComplete?: string
  autoFocus?: boolean
  disabled?: boolean
  error?: string
}

export default function AuthField({
  id,
  label,
  type = 'text',
  icon: Icon,
  placeholder,
  value,
  onChange,
  autoComplete,
  autoFocus,
  disabled,
  error
}: AuthFieldProps): React.JSX.Element {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type
  const errorId = error ? `${id}-error` : undefined

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.target.value)
  }

  function togglePasswordVisibility(): void {
    setShowPassword((previous) => !previous)
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>

      <div className="relative">
        <Icon
          size={19}
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
        />

        <input
          id={id}
          name={id}
          type={inputType}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={`h-14 w-full rounded-xl border bg-[#0d1b16] pl-12 text-[15px] text-ink outline-none transition placeholder:text-white/40 ${
            error
              ? 'border-red-400/70 focus:border-red-400 focus:ring-2 focus:ring-red-400/15'
              : 'border-white/10 focus:border-brand/70 focus:ring-2 focus:ring-brand/20'
          } ${isPassword ? 'pr-12' : 'pr-4'}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/5 hover:text-white/90"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <p id={errorId} className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
