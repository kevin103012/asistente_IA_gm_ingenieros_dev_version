import type { AuthDemoResult, LoginPayload, RegisterPayload } from '@renderer/types/auth'

const AUTH_DEMO_DELAY = 700

// TODO(backend): reemplazar las funciones de este archivo por llamadas reales a la API
// cuando esté disponible (por ejemplo, POST /auth/login, POST /auth/register,
// POST /auth/recover-password). La firma de las funciones ya está lista para eso.

function sleep(delayMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayMs))
}

function logDemoAttempt(source: string, data: Record<string, unknown>): void {
  if (import.meta.env.DEV) {
    console.info(`[auth-demo] ${source}`, data)
  }
}

function demoResult(message: string): Promise<AuthDemoResult> {
  return sleep(AUTH_DEMO_DELAY).then(() => ({ success: true, message }))
}

export async function login(payload: LoginPayload): Promise<AuthDemoResult> {
  logDemoAttempt('login', { email: payload.email, remember: payload.remember })
  return demoResult('Formulario validado. La conexión con el backend está pendiente.')
}

export async function register(payload: RegisterPayload): Promise<AuthDemoResult> {
  logDemoAttempt('register', { name: payload.name, email: payload.email })
  return demoResult('Datos validados. El registro se conectará al backend próximamente.')
}

export async function recoverPassword(email: string): Promise<AuthDemoResult> {
  logDemoAttempt('recover-password', { email })
  return demoResult('Demo: el envío de correos se conectará al backend.')
}
