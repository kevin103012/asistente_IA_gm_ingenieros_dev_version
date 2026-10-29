import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { AuthStage } from '@renderer/types/auth'
import { AuthFlowContext } from './AuthFlowContext'

interface AuthFlowProviderProps {
  children: ReactNode
}

export default function AuthFlowProvider({ children }: AuthFlowProviderProps): React.JSX.Element {
  const [stage, setStage] = useState<AuthStage>('login')

  const goTo = useCallback((nextStage: AuthStage) => setStage(nextStage), [])
  const value = useMemo(() => ({ stage, goTo }), [stage, goTo])

  return <AuthFlowContext.Provider value={value}>{children}</AuthFlowContext.Provider>
}
