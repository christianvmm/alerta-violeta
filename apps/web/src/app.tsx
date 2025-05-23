import { getStoredToken, useAuth } from './auth'
import { AppProvider } from '@/providers'
import { LoadingScreen } from '@/components/loading-screen'
import { axios } from '@/lib/axios'
import type { LoginResponse } from '@packages/auth-admin/types'
import { useEffect, useState } from 'react'
import { RouterProvider } from '@tanstack/react-router'
import { router } from '@/router'

function App() {
  const auth = useAuth()
  const { login } = auth
  const [loadingAuth, setLoadingAuth] = useState(() =>
    Boolean(getStoredToken())
  )

  useEffect(() => {
    if (!loadingAuth) return

    axios
      .post<LoginResponse>('/auth/verify')
      .then((result) => {
        login(result.data.data.user, result.data.data.token)
      })
      .finally(() => {
        setLoadingAuth(false)
      })
  }, [loadingAuth, login])

  if (loadingAuth) {
    return <LoadingScreen />
  }

  return (
    <AppProvider>
      <RouterProvider router={router} context={{ auth }} />
    </AppProvider>
  )
}

export default App
