import { KindeProvider } from '@kinde-oss/kinde-auth-nextjs'
import { SessionProvider } from 'next-auth/react'

import type { Session } from 'next-auth'

type AuthProviderProps = {
  children: React.ReactNode,
  session: Session | null,
}

export const AuthProvider = (props: AuthProviderProps) => {
  const { children, session } = props

  if (process.env.AUTH_PROVIDER === 'kinde') {
    return (
      <KindeProvider>
        {children}
      </KindeProvider>
    )
  }

  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default AuthProvider
