import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next'
import { Box, Button, Grid, Heading, HStack, Stack, StackDivider, useDisclosure } from '@chakra-ui/react'
import { parseCookies } from 'nookies'
import { UserService } from '../services/UserService'
import { useAuthContext } from '../services/AuthService/AuthContext'
import LoggedTemplate from '../templates/loggedTemplate'
import { checkAtStart } from '../services/AuthService/CheckLogin'
import MvList from '../components/molecules/List/MvList'
import FinancesRender from '../components/molecules/FinancesRender'
import { ReleaseEnum, TransactionInterface } from '../interfaces/TransactionInterface'
import { createRef, useEffect, useState } from 'react'
import { TransactionService } from '../services/TransactionService'
import { GrAddCircle } from "react-icons/gr"
import { MvInputProps } from '../components/organisms/MvForm/InputText'
import MvForm from '../components/organisms/MvForm'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return await checkAtStart(ctx)
    .then((props) => { return props })
    .catch((error) => { throw error })
}

const Extrato = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const authContext = useAuthContext()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [state, setState] = useState<{
    dataIsLoading: boolean,
    dataChanged: boolean,
    transactionsData: TransactionInterface[]
  }>({
    dataIsLoading: true,
    dataChanged: false,
    transactionsData: []
  })

  useEffect(() => {
    const fetchData = async () => {
      if (props.user) authContext.setUser(props.user)
      if (props.token) authContext.setToken(props.token)
      if (props.user.id) {
        try {
          const { data } = await TransactionService.getTransactionsByUser(
            props.token, props.user?.id
          )
          setState(prevState => ({
            ...prevState,
            transactionsData: data,
            dataChanged: false,
            dataIsLoading: false
          }))
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchData()
  }, [state.dataChanged, authContext, props])

  const formFields: Omit<MvInputProps, "handleInput">[] = [
    { name: 'name', label: 'Nome' },
    { name: 'job', label: 'Profissão' },
    { name: 'email', label: 'Email' },
    { name: 'pass', label: 'Senha Provisória' }
  ]
  const formRef = createRef<MvForm>()

  return (
    <LoggedTemplate userDetails={props.user}>
      <Heading as="h2">Extrato</Heading>
      <MvList direction="row">
        <Box as="div" w="60%">
          {!state.dataIsLoading && (
            <MvList>
              {state.transactionsData.length > 0 && state.transactionsData.map(transaction => (
                <FinancesRender key={transaction.id} transaction={transaction} />
              ))}
            </MvList>
          )}
        </Box>
        <HStack
          as="div"
          w="40%"
          spacing={2}
          justifyContent="center"
        >
          <Button
            onClick={onOpen}
            leftIcon={<GrAddCircle />}
            variant='solid'
            colorScheme="blue"
          >
            Adicionar RECEITA
          </Button>
          <Button
            onClick={onOpen}
            leftIcon={<GrAddCircle />}
            variant='solid'
            colorScheme="red"
          >
            Adicionar DESPESA
          </Button>
        </HStack>
      </MvList>
    </LoggedTemplate>
  )
}

export default Extrato
