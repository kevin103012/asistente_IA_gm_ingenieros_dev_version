// Tipos compartidos del flujo de autenticación (login / registro / recuperación).

export type AuthStage = 'login' | 'registro' | 'recuperacion'

export interface LoginPayload {
  email: string
  password: string
  remember: boolean
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface AuthDemoResult {
  success: boolean
  message: string
}
