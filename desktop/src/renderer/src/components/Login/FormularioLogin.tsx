import { useState } from 'react'
import type { FormEvent } from 'react'
import { Lock, Mail } from 'lucide-react'
import AuthButton from './AuthButton'
import AuthCheckbox from './AuthCheckbox'
import AuthField from './AuthField'
import AuthFooter from './AuthFooter'
import AuthHeader from './AuthHeader'
import AuthNotice from './AuthNotice'
import type { AuthNoticeTone } from './AuthNotice'
import GoogleButton from './GoogleButton'
import { useAuthFlow } from '@renderer/context/AuthFlowContext'
import { login } from '@renderer/services/authService'
import { validateEmail, validateRequired } from '@renderer/utils/validation'

interface LoginFormValues {
  email: string
  password: string
  remember: boolean
}

type LoginErrors = Partial<Record<'email' | 'password', string>>
type LoginStatus = { tone: AuthNoticeTone; message: string } | null

export default function FormularioLogin(): React.JSX.Element {
  const { goTo } = useAuthFlow()
  const [values, setValues] = useState<LoginFormValues>({ email: '', password: '', remember: true })
  const [errors, setErrors] = useState<LoginErrors>({})
  const [status, setStatus] = useState<LoginStatus>(null)
  const [submitting, setSubmitting] = useState(false)

  function handleChange(field: 'email' | 'password', value: string): void {
    setValues((previous) => ({ ...previous, [field]: value }))
    setErrors((previous) => ({ ...previous, [field]: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    if (submitting) return

    const nextErrors: LoginErrors = {
      email: validateEmail(values.email),
      password: validateRequired(values.password, 'Ingresa tu contraseña')
    }

    if (nextErrors.email || nextErrors.password) {
      setErrors(nextErrors)
      setStatus(null)
      return
    }

    setErrors({})
    setStatus(null)
    setSubmitting(true)

    try {
      const result = await login({
        email: values.email,
        password: values.password,
        remember: values.remember
      })
      setStatus({ tone: 'info', message: result.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit} noValidate>
      <AuthHeader title="Bienvenido" subtitle="Inicia sesión para continuar" />

      <div className="mt-7 flex flex-col gap-5">
        <AuthField
          id="login-email"
          label="Correo electrónico"
          type="email"
          icon={Mail}
          placeholder="correo@gmingineiros.com"
          autoComplete="email"
          autoFocus
          value={values.email}
          onChange={(value) => handleChange('email', value)}
          disabled={submitting}
          error={errors.email}
        />

        <AuthField
          id="login-password"
          label="Contraseña"
          type="password"
          icon={Lock}
          placeholder="Contraseña"
          autoComplete="current-password"
          value={values.password}
          onChange={(value) => handleChange('password', value)}
          disabled={submitting}
          error={errors.password}
        />

        <div className="flex items-center justify-between pt-0.5">
          <AuthCheckbox
            id="login-remember"
            label="Recuerda mi sesión"
            checked={values.remember}
            onChange={(remember) => setValues((previous) => ({ ...previous, remember }))}
            disabled={submitting}
          />

          <button
            type="button"
            onClick={() => goTo('recuperacion')}
            className="text-[13px] font-medium text-brand transition hover:text-brand-hover"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <AuthButton loading={submitting} withArrow>
          Iniciar sesión
        </AuthButton>

        {status && <AuthNotice tone={status.tone}>{status.message}</AuthNotice>}

        <div className="flex items-center gap-4 py-1.5">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-white/40">o</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <GoogleButton
          onClick={() =>
            setStatus({ tone: 'info', message: 'El inicio de sesión con Google estará disponible próximamente.' })
          }
          disabled={submitting}
        />

        <AuthFooter
          question="¿No tienes una cuenta?"
          actionLabel="Regístrate"
          onAction={() => goTo('registro')}
        />
      </div>
    </form>
  )
}
