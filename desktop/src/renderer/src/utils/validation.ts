// Validaciones compartidas de los formularios de autenticación.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim())
}

export function validateRequired(value: string, message: string): string | undefined {
  return value.trim() ? undefined : message
}

export function validateEmail(value: string): string | undefined {
  const trimmed = value.trim()

  if (!trimmed) return 'Ingresa tu correo electrónico'

  return isValidEmail(trimmed) ? undefined : 'Ingresa un correo electrónico válido'
}

export function validateNewPassword(value: string): string | undefined {
  if (!value) return 'Ingresa una contraseña'

  if (value.length < 8) return 'La contraseña debe tener al menos 8 caracteres'

  const hasLetter = /[a-zA-Z]/.test(value)
  const hasNumber = /\d/.test(value)

  if (!hasLetter || !hasNumber) return 'La contraseña debe combinar letras y números'

  return undefined
}

export function validatePasswordMatch(value: string, reference: string): string | undefined {
  if (!value) return 'Confirma tu contraseña'

  return value === reference ? undefined : 'Las contraseñas no coinciden'
}
