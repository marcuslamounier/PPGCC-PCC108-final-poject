import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next'
import { Button, Heading, Stack } from '@chakra-ui/react'
import { parseCookies } from 'nookies'
import { UserService } from '../services/UserService'
import { useAuthContext } from '../services/AuthService/AuthContext'
import LoggedTemplate from '../templates/loggedTemplate'
import { checkAtStart } from '../services/AuthService/CheckLogin'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return await checkAtStart(ctx)
    .then((props) => { return props })
    .catch((error) => { throw error })
}

const Extrato = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const authContext = useAuthContext()
  const cookies: any = parseCookies()

  return (
    <LoggedTemplate userDetails={props.user}>
      <Heading as="h2">Extrato</Heading>
      <Stack direction="column" >

      </Stack>
      <Button onClick={() => console.log(authContext)}>
        teste
      </Button>
    </LoggedTemplate>
  )
}

export default Extrato
