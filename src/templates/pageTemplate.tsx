import React, { ReactNode, useContext } from 'react'
import Head from 'next/head'
import MvFooter from '../components/organisms/Footer/MvFooter'
import { Box } from '@chakra-ui/react'

type Props = {
  children: ReactNode
}

const PageTemplate = ({ children }: Props) => {
  return (
    <Box h="100vh" >
      <Head>
        <title>Bolso no Azul</title>
      </Head>
      <Box as="div" pb="60px">
        <main>
          {children}
        </main>
      </Box>
      <MvFooter />
    </Box>
  )
}

export default PageTemplate
