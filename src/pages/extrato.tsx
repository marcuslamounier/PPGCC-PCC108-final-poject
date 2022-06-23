import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from 'next'
import {
  Box,
  Button,
  Heading,
  HStack,
  Text,
  useDisclosure,
  useToast,
  VStack
} from '@chakra-ui/react'
import { useAuthContext } from '../services/AuthService/AuthContext'
import LoggedTemplate from '../templates/loggedTemplate'
import { checkAtStart } from '../services/AuthService/CheckLogin'
import MvList from '../components/molecules/List/MvList'
import FinancesRender from '../components/molecules/FinancesRender'
import {
  ReleaseEnum,
  TransactionInterface
} from '../interfaces/TransactionInterface'
import { createRef, useEffect, useState } from 'react'
import { TransactionService } from '../services/TransactionService'
import { GrAddCircle } from "react-icons/gr"
import MvForm, { MvFormProps } from '../components/organisms/MvForm'
import { dateMask, moneyMask } from '../util/masks'
import MvModal from '../components/organisms/MvModal'
import { dateToUtc } from '../util/dateConverter'
import { getCurrencyVal, onlyNums } from '../util/stringFunctions'
import ShowPontuation from '../components/organisms/ShowPontuation'
import { PontuationService } from '../services/PontuationService'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return await checkAtStart(ctx)
    .then((props) => { return props })
    .catch((error) => { throw error })
}

const Extrato = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const authContext = useAuthContext()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const myId = authContext.user.id

  const [state, setState] = useState<{
    dataIsLoading: boolean,
    dataChanged: boolean,
    transactionsData: TransactionInterface[],
    myGoal: number
  }>({
    dataIsLoading: true,
    dataChanged: false,
    transactionsData: [],
    myGoal: 0
  })

  useEffect(() => {
    const fetchData = async () => {
      if (props.user) authContext.setUser(props.user)
      if (props.token) authContext.setToken(props.token)
      if (props.user.id) {
        try {
          const { data } = await TransactionService
            .getTransactionsByUser(props.token, props.user?.id)
          const myGoal = await PontuationService.getMyGoal(
            props.token, props.user?.id
          )
          setState(prevState => ({
            ...prevState,
            transactionsData: data,
            dataChanged: false,
            dataIsLoading: false,
            myGoal: myGoal
          }))
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchData()
  }, [state.dataChanged, authContext, props])

  const formFields: MvFormProps['fields'] = [
    { name: 'date', label: 'Data', mask: dateMask },
    { name: 'description', label: 'Descrição', },
    { name: 'category', label: 'Categoria' },
    { name: 'value', label: 'Valor', mask: moneyMask },
  ]
  const formRef = createRef<MvForm>()
  const [nextRelease, setNextRelease] = useState<ReleaseEnum>(1)

  const onSubmit = async () => {
    const formData = formRef.current?.state
    if (!formData) return
    else {
      for (const field in formData) {
        if ((formData as any)[field] === '') {
          toast({
            title: 'Formulário incompleto',
            description: "Você precisa preencher todos os campos.",
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
          return
        }
      }
      try {
        setState(prevState => ({ ...prevState, dataIsLoading: true }))
        const { status } = await TransactionService.addTransaction(
          props.token,
          {
            release: (nextRelease === 1)
              ? ReleaseEnum.revenue
              : ReleaseEnum.expense,
            category: String(formData.category),
            date: new Date(dateToUtc(String(formData.date))),
            description: String(formData.description),
            user_id: myId,
            value: getCurrencyVal(String(formData.value))
          }
        )
        if (status === 201) {
          toast({
            title: 'User added',
            description: "Loading . . .",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          setState(prevState => ({ ...prevState, dataChanged: true }))
        }
        onClose()
      } catch (error) {
        console.error(error)
      } finally {
        setState(prevState => ({ ...prevState, dataIsLoading: false }))
      }

    }
  }

  const modalActions = (
    <Button colorScheme='blue' mr={3} onClick={onSubmit}>
      Salvar
    </Button>
  )

  const ModalAddUser = () => {
    const title = `Adicionar ${nextRelease === 1 ? 'receita' : 'despesa'}`
    return (
      <MvModal
        title={title}
        isOpen={isOpen}
        onClose={onClose}
        modalActions={modalActions}
      >
        <MvForm ref={formRef} fields={formFields} />
      </MvModal>
    )
  }

  return (
    <LoggedTemplate userDetails={props.user}>
      <Heading as="h2">Extrato</Heading>
      <MvList direction="row">
        <Box as="div" w="60%">
          {!state.dataIsLoading && (
            <MvList>
              {state.transactionsData.length > 0 &&
                state.transactionsData.map(transaction => (
                  <FinancesRender
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
            </MvList>
          )}
        </Box>

        <VStack
          as="div"
          w="40%"
          spacing={2}
        >
          <ShowPontuation
            transactions={
              state.transactionsData.map(transaction => ({
                value: transaction.value,
                release: transaction.release
              }))
            }
            goal={state.myGoal}
          />
          <HStack
            w="100%"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Button
              onClick={() => {
                setNextRelease(1)
                onOpen()
              }}
              leftIcon={<GrAddCircle />}
              variant='solid'
              colorScheme="blue"
            >
              Adicionar RECEITA
            </Button>
            <Button
              onClick={() => {
                setNextRelease(-1)
                onOpen()
              }}
              leftIcon={<GrAddCircle />}
              variant='solid'
              colorScheme="red"
            >
              Adicionar DESPESA
            </Button>
          </HStack>
          <ModalAddUser />
        </VStack>
      </MvList>
    </LoggedTemplate>
  )
}

export default Extrato
