import { Box, Button, Flex, Heading, HStack, ModalBody, ModalCloseButton, ModalFooter, useDisclosure, useToast } from "@chakra-ui/react"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { checkAtStart } from "../services/AuthService/CheckLogin"
import LoggedTemplate from "../templates/loggedTemplate"
import { createRef, useEffect, useState } from "react"
import { UserService } from "../services/UserService"
import { RoleEnum, UserInterface } from "../interfaces/UserInterface"
import { IoMdPersonAdd } from "react-icons/io"
import MvList from "../components/molecules/List/MvList"
import UserRender from "../components/molecules/UserRender"
import { useAuthContext } from "../services/AuthService/AuthContext"
import MvModal from "../components/organisms/MvModal"
import MvModalHeader from "../components/organisms/MvModal/MvModalHeader"
import { MvInputProps } from "../components/organisms/MvForm/InputText"
import MvForm from "../components/organisms/MvForm"

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
  const { isOpen, onOpen, onClose } = useDisclosure()

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
          dataChanged: false
        }))
      } catch (error) {
        console.log(error)
      } finally {
        setState(prevState => ({ ...prevState, dataIsLoading: false }))
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

  const onSubmit = async () => {
    const formData = formRef.current?.state
    if (!formData) return
    else {
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
  }

  const OpenModalteste = () => {
    return (
      <MvModal isOpen={isOpen} onClose={onClose}>
        <MvModalHeader title="Registrar usuário" />
        <ModalCloseButton />
        <ModalBody pb={6}>
          <MvForm ref={formRef} fields={formFields} />
          <HStack justifyContent="flex-end">
            <Button colorScheme='blue' mr={3} onClick={onSubmit}>
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </HStack>
        </ModalBody>
      </MvModal>

    )
  }

  return (
    <LoggedTemplate userDetails={props.user}>
      <Heading as="h2">Gestão de Usuários</Heading>
      <Flex justifyContent="flex-end">
        <Button onClick={onOpen} leftIcon={<IoMdPersonAdd />} variant='solid' colorScheme="green">
          Adicionar usuário
        </Button>
        <OpenModalteste />
        
        {/* <MvModal isOpen={isOpen} onClose={onClose}>
          <MvModalHeader title="Registrar usuário" />
          <ModalCloseButton />
          <ModalBody pb={6}>
            <MvForm ref={formRef} fields={formFields} />
            <Button colorScheme='blue' mr={3} onClick={onSubmit}>
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalBody>
        </MvModal> */}
      </Flex>
      <Box as="div" py={2}>
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
      </Box>
    </LoggedTemplate>
  )
}

export default ManageUsers
