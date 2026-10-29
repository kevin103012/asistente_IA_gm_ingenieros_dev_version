import { useState } from 'react'
import type { FormEvent } from 'react'
import { Lock, Mail, User } from 'lucide-react'
import AuthButton from './AuthButton'
import AuthCheckbox from './AuthCheckbox'
import AuthField from './AuthField'
import AuthFooter from './AuthFooter'
import AuthHeader from './AuthHeader'
import AuthNotice from './AuthNotice'
import type { AuthNoticeTone } from './AuthNotice'
import { useAuthFlow } from '@renderer/context/AuthFlowContext'
import { register } from '@renderer/services/authService'
import {
  validateEmail,
  validateNewPassword,
  validatePasswordMatch,
  validateRequired
} from '@renderer/utils/validation'

interface RegisterFormValues {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

type RegisterField = 'name' | 'email' | 'password' | 'confirmPassword' | 'acceptTerms'
type RegisterErrors = Partial<Record<RegisterField, string>>
type RegisterStatus = { tone: AuthNoticeTone; message: string } | null

export default function FormularioRegistro(): React.JSX.Element {
  const { goTo } = useAuthFlow()
  const [values, setValues] = useState<RegisterFormValues>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  })
  const [errors, setErrors] = useState<RegisterErrors>({})
  const [status, setStatus] = useState<RegisterStatus>(null)
  const [submitting, setSubmitting] = useState(false)

  function handleChange(field: 'name' | 'email' | 'password' | 'confirmPassword', value: string): void {
    setValues((previous) => ({ ...previous, [field]: value }))
    setErrors((previous) => ({ ...previous, [field]: undefined }))
  }

  function handleAcceptTerms(acceptTerms: boolean): void {
    setValues((previous) => ({ ...previous, acceptTerms }))
    setErrors((previous) => ({ ...previous, acceptTerms: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    if (submitting) return

    const nextErrors: RegisterErrors = {
      name: validateRequired(values.name, 'Ingresa tu nombre completo'),
      email: validateEmail(values.email),
      password: validateNewPassword(values.password),
      confirmPassword: validatePasswordMatch(values.confirmPassword, values.password),
      acceptTerms: values.acceptTerms
        ? undefined
        : 'Debes aceptar los términos y la política de privacidad'
    }

    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors)
      setStatus(null)
      return
    }

    setErrors({})
    setStatus(null)
    setSubmitting(true)

    try {
      const result = await register({
        name: values.name,
        email: values.email,
        password: values.password
      })
      setStatus({ tone: 'info', message: result.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit} noValidate>
      <AuthHeader title="Crear cuenta" subtitle="Completa tus datos para registrarte" />

      <div className="mt-6 flex flex-col gap-4">
        <AuthField
          id="register-name"
          label="Nombre completo"
          type="text"
          icon={User}
          placeholder="Nombres y apellidos"
          autoComplete="name"
          autoFocus
          value={values.name}
          onChange={(value) => handleChange('name', value)}
          disabled={submitting}
          error={errors.name}
        />

        <AuthField
          id="register-email"
          label="Correo electrónico"
          type="email"
          icon={Mail}
          placeholder="correo@gmingineiros.com"
          autoComplete="email"
          value={values.email}
          onChange={(value) => handleChange('email', value)}
          disabled={submitting}
          error={errors.email}
        />

        <AuthField
          id="register-password"
          label="Contraseña"
          type="password"
          icon={Lock}
          placeholder="Contraseña"
          autoComplete="new-password"
          value={values.password}
          onChange={(value) => handleChange('password', value)}
          disabled={submitting}
          error={errors.password}
        />

        <AuthField
          id="register-confirm"
          label="Confirmar contraseña"
          type="password"
          icon={Lock}
          placeholder="Repite la contraseña"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={(value) => handleChange('confirmPassword', value)}
          disabled={submitting}
          error={errors.confirmPassword}
        />

        <AuthCheckbox
          id="register-terms"
          label="Acepto los términos y la política de privacidad"
          checked={values.acceptTerms}
          onChange={handleAcceptTerms}
          disabled={submitting}
          error={errors.acceptTerms}
        />

        {status && <AuthNotice tone={status.tone}>{status.message}</AuthNotice>}

        <div className="pt-1">
          <AuthButton loading={submitting} withArrow>
            Crear cuenta
          </AuthButton>
        </div>

        <AuthFooter
          question="¿Ya tienes una cuenta?"
          actionLabel="Inicia sesión"
          onAction={() => goTo('login')}
        />
      </div>
    </form>
  )
}
