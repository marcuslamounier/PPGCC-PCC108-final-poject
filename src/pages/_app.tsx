import React from "react"
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { defaultTheme } from '../theme'
import { AuthContext, initialUser, UserAuthContextProps } from '../services/AuthService/AuthContext'
import { useState } from 'react'
import '@fontsource/poppins'

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<UserAuthContextProps>(initialUser)
  const [token, setToken] = useState<string>('')
  const authContextValue = { user, setUser, token, setToken }
  return (
    <AuthContext.Provider value={authContextValue}>
      <ChakraProvider theme={defaultTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthContext.Provider>
  )
}

export default MyApp
