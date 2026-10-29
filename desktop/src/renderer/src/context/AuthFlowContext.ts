import { createContext, useContext } from 'react'
import type { AuthStage } from '@renderer/types/auth'

export interface AuthFlowContextValue {
  stage: AuthStage
  goTo: (stage: AuthStage) => void
}

export const AuthFlowContext = createContext<AuthFlowContextValue | null>(null)

export function useAuthFlow(): AuthFlowContextValue {
  const context = useContext(AuthFlowContext)

  if (!context) {
    throw new Error('useAuthFlow debe usarse dentro de <AuthFlowProvider>')
  }

  return context
}
