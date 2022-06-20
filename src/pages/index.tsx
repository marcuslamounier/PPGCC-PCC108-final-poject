import type { NextPage } from 'next'
import {
  Box,
  Button,
  Center,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AuthService } from '../services/AuthService/AuthService'
import nookies from 'nookies'
import { UserService } from '../services/UserService'
import { UserInterface } from '../interfaces/UserInterface'

const Home: NextPage = () => {
  const router = useRouter()
  const toast = useToast()

  const [email, setEmail] = useState<string>("")
  const [pass, setPass] = useState<string>("")
  const [show, setShow] = useState<boolean>(false)
  const togglePassView = () => setShow(!show)

  const handleEmail = (event: any) => setEmail(event.target.value)
  const handlePass = (event: any) => setPass(event.target.value)

  const authenthicate = async (email: string, pass: string) => {
    try {
      const { data, status } = await AuthService.login(email, pass)
      if (status === 200) {
        const token = data.access_token
        nookies.destroy(null, 'token')
        nookies.set(null, 'token', token, { path: '/' })

        const { data: userData } = await UserService.getUsers(token)
        const userDetails: UserInterface = userData.find((user: any) => user.email === email)
        nookies.destroy(null, 'user_id')
        nookies.set(null, 'user_id', String(userDetails.id), { path: '/' })

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

  const onSubmit = () => {
    authenthicate(email, pass)
  }

  return (
    <Center minH="100vh" bg="brand.lighter">
      <VStack as="div" bg="brand.main" borderRadius="md" p={4}>
        <Heading as="h1" color="white">Bolso no Azul</Heading>
        <Box w="100%" bg="white" borderRadius="md" p={4}>
          <FormControl isRequired>
            <FormLabel htmlFor='input-email'>Email</FormLabel>
            <Input
              id='input-email'
              placeholder='Email'
              onChange={handleEmail}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='input-pass'>Senha</FormLabel>
            <InputGroup size='md'>
              <Input
                id="input-pass"
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                onChange={handlePass}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={togglePassView}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>
        <Button onClick={onSubmit}>Autenticar-se</Button>
      </VStack>
    </Center>
  )
}

export default Home
