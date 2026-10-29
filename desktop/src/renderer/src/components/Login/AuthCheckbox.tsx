import { Check } from 'lucide-react'

interface AuthCheckboxProps {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  error?: string
}

export default function AuthCheckbox({
  id,
  label,
  checked,
  onChange,
  disabled,
  error
}: AuthCheckboxProps): React.JSX.Element {
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="flex w-fit cursor-pointer items-start gap-2.5 text-[13.5px] leading-snug text-white/75"
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className="peer sr-only"
        />

        <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border border-white/25 bg-white/[0.04] transition peer-checked:border-brand peer-checked:bg-brand peer-focus-visible:ring-2 peer-focus-visible:ring-brand/40 peer-checked:[&>svg]:opacity-100">
          <Check size={12} strokeWidth={3.5} aria-hidden="true" className="text-white opacity-0 transition-opacity" />
        </span>

        <span>{label}</span>
      </label>

      {error && (
        <p id={errorId} className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
