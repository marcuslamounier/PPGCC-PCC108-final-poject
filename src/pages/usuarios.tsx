import { Button, Flex, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, StackDivider, Text, useDisclosure, useToast, VStack } from "@chakra-ui/react"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { checkAtStart } from "../services/AuthService/CheckLogin"
import LoggedTemplate from "../templates/loggedTemplate"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { UserService } from "../services/UserService"
import { RoleEnum, UserInterface } from "../interfaces/UserInterface"
import { IoMdPersonAdd } from "react-icons/io"
import MvList from "../components/molecules/List/MvList"
import UserRender from "../components/molecules/UserRender"
import { useAuthContext } from "../services/AuthService/AuthContext"
import MvModal from "../components/organisms/Modal"
import MvModalHeader from "../components/organisms/Modal/MvModalHeader"

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return await checkAtStart(ctx)
    .then((props) => { return props })
    .catch((error) => { throw error })
}

const ManageUsers = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const toast = useToast()
  const authContext = useAuthContext()
  const myId = authContext.user.id

  const [state, setState] = useState<{
    dataIsLoading: boolean,
    dataChanged: boolean,
    userData: UserInterface[],
    me?: UserInterface
  }>({
    dataIsLoading: true,
    dataChanged: false,
    userData: [],
    me: undefined
  })

  const [formData, setFormData] = useState<{
    name: string,
    job: string,
    email: string,
    pass: string
  }>({
    name: "",
    job: "",
    email: "",
    pass: ""
  })

  useEffect(() => {
    const fetchData = async () => {
      if (props.user) authContext.setUser(props.user)
      if (props.token) authContext.setToken(props.token)
      try {
        const { data } = await UserService.getUsers(props.token)
        setState(prevState => ({
          ...prevState,
          userData: data,
          me: data.find((user: UserInterface) => user.id === authContext.user.id),
          dataChanged: false,
          dataIsLoading: false
        }))
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [state.dataChanged, authContext, props])

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  const onSubmit = async () => {
    if (!formData) return
    for (const field in formData) {
      if ((formData as any)[field] === '') {
        toast({
          title: 'Form incomplete',
          description: "You should fill the form.",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        return
      }
    }
    try {
      setState(prevState => ({ ...prevState, dataIsLoading: true }))
      const { status } = await UserService.addUser(props.token, {
        email: formData.email,
        job: formData.job,
        name: formData.name,
        password: formData.pass,
        goal: 0,
        role: RoleEnum.student
      })
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

  return (
    <LoggedTemplate userDetails={props.user}>
      <Heading as="h2">Gestão de Usuários</Heading>
      <Flex justifyContent="flex-end">
        <Button onClick={onOpen} leftIcon={<IoMdPersonAdd />} variant='solid' colorScheme="green">
          Adicionar usuário
        </Button>
        <MvModal isOpen={isOpen} onClose={onClose}>
          <MvModalHeader title="Registrar usuário" />
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel htmlFor='input-name'>Nome</FormLabel>
              <Input
                id='input-name'
                placeholder='Nome'
                name='name'
                onChange={handleInput}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor='input-job'>Profissão</FormLabel>
              <Input
                id='input-job'
                placeholder='Profissão'
                name='job'
                onChange={handleInput}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor='input-email'>Email</FormLabel>
              <Input
                id='input-email'
                placeholder='Email'
                name='email'
                onChange={handleInput}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor='input-pass'>Senha provisória</FormLabel>
              <Input
                placeholder='Senha provisória'
                id='input-pass'
                name='pass'
                onChange={handleInput}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onSubmit}>
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </MvModal>
      </Flex>
      {!state.dataIsLoading && (
        <MvList>
          {state?.me && (
            <UserRender
              user={state.me}
              viewerRole={state.me.role}
              me
            />
          )}
          {state.userData.length > 1 && state.userData.filter(user => user.id !== myId).map(user => (
            <UserRender
              key={user.id}
              user={user}
              viewerRole={state.me?.role || RoleEnum.student}
            />
          ))}
        </MvList>
      )}

    </LoggedTemplate>
  )
}

export default ManageUsers
