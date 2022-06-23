import React, { createRef } from 'react'
import type { NextPage } from 'next'
import {
  Box,
  Button,
  Center,
  Heading,
  VStack,
  useToast
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { AuthService } from '../services/AuthService/AuthService'
import { UserService } from '../services/UserService'
import { UserInterface } from '../interfaces/UserInterface'
import MvForm, { MvFormProps } from '../components/organisms/MvForm'
import { Session } from '../classes/Session'

const Home: NextPage = () => {
  const router = useRouter()
  const toast = useToast()

  const authenthicate = async (email: string, pass: string) => {
    try {
      const { data, status } = await AuthService.login(email, pass)
      if (status === 200) {
        const token = data.access_token
        const { data: userData } = await UserService.getUsers(token)
        const userDetails: UserInterface = userData.find(
          (user: any) => user.email === email
        )

        const session = new Session({
          token: token,
          user_id: userDetails.id
        })

        try {
          await session.createSession()
        } catch (error) {
          console.error(error)
        }

        toast({
          title: 'Login successfully.',
          description: "Loading . . .",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })

        const role = userDetails?.role || "student"
        switch (role) {
          case 'admin':
            router.push('usuarios')
            break;
          case 'manager':
            // router.push('dashboard')
            router.push('extrato')
            break;
          default:
            router.push('extrato')
            break;
        }
      }
    } catch (error: any) {
      toast({
        title: 'Something wrong.',
        description: error.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const formFields: MvFormProps['fields'] = [
    { name: 'email', label: 'Email' },
    { name: 'pass', label: 'Senha', isPass: true }
  ]
  const formRef = createRef<MvForm>()

  const onSubmit = () => {
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
      authenthicate(String(formData.email), String(formData.pass))
    }
  }

  return (
    <Center minH="100vh" bg="brand.lighter">
      <VStack as="div" bg="brand.main" borderRadius="md" p={4}>
        <Heading as="h1" color="white">Bolso no Azul</Heading>
        <Box w="100%" bg="white" borderRadius="md" p={4}>
          <MvForm ref={formRef} fields={formFields} />
        </Box>
        <Button
          data-testid="test-submit"
          onClick={onSubmit}
        >
          Autenticar-se
        </Button>
      </VStack>
    </Center>
  )
}

export default Home
