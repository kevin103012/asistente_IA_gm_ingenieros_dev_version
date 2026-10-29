import { useState } from 'react'
import type { FormEvent } from 'react'
import { Mail, MailCheck } from 'lucide-react'
import AuthButton from './AuthButton'
import AuthField from './AuthField'
import AuthHeader from './AuthHeader'
import AuthNotice from './AuthNotice'
import { useAuthFlow } from '@renderer/context/AuthFlowContext'
import { recoverPassword } from '@renderer/services/authService'
import { validateEmail } from '@renderer/utils/validation'

export default function FormularioRecuperacion(): React.JSX.Element {
  const { goTo } = useAuthFlow()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | undefined>()
  const [submitting, setSubmitting] = useState(false)
  const [sentEmail, setSentEmail] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    if (submitting) return

    const validationError = validateEmail(email)
    if (validationError) {
      setError(validationError)
      return
    }

    setError(undefined)
    setSubmitting(true)

    try {
      await recoverPassword(email)
      setSentEmail(email)
    } finally {
      setSubmitting(false)
    }
  }

  if (sentEmail) {
    return (
      <div>
        <AuthHeader title="Revisa tu correo" subtitle="Te enviamos el enlace de recuperación" />

        <div className="mt-9 flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-brand/25 bg-brand/10">
            <MailCheck size={34} strokeWidth={1.8} className="text-brand" aria-hidden="true" />
          </div>

          <p className="mt-6 max-w-[380px] text-[14px] leading-relaxed text-muted">
            Si el correo <span className="font-semibold text-ink">{sentEmail}</span> está registrado,
            recibirás un enlace para restablecer tu contraseña. Si no lo encuentras, revisa tu
            carpeta de spam.
          </p>

          <div className="mt-6 w-full">
            <AuthNotice tone="info">
              Demo: todavía no se envía un correo real hasta conectar el backend.
            </AuthNotice>
          </div>
        </div>

        <div className="mt-8">
          <AuthButton type="button" onClick={() => goTo('login')}>
            Volver a iniciar sesión
          </AuthButton>
        </div>
      </div>
    )
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit} noValidate>
      <AuthHeader
        title="Recuperar contraseña"
        subtitle="Ingresa tu correo y te enviaremos un enlace para restablecerla"
      />

      <div className="mt-7 flex flex-col gap-5">
        <AuthField
          id="recover-email"
          label="Correo electrónico"
          type="email"
          icon={Mail}
          placeholder="correo@gmingineiros.com"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(value) => {
            setEmail(value)
            setError(undefined)
          }}
          disabled={submitting}
          error={error}
        />

        <AuthButton loading={submitting} withArrow>
          Enviar enlace de recuperación
        </AuthButton>
      </div>
    </form>
  )
}
