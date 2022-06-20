import React from 'react'
import packageInfo from '../../../../package.json'
import { Box, Flex, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react'
import NextLink from 'next/link'
import MvBadge from '../../atoms/Badge/MvBadge'
const version = packageInfo.version

type Props = {
  username: string
  role: string
}

const TopMenu = ({ username, role }: Props) => {
  return (
    <Flex
      w="100%"
      display={['block', 'flex']}
      bg="brand.main"
      color="white"
      top={0}
    >
      <Heading as="h1" m="auto">$ Bolso no Azul</Heading>
      <VStack as="div" pr={4} alignItems="flex-end" w={['100%', '50%']} py={[3, 4]}>
        <Flex as="span">
          <HStack spacing={1} px={2}>
            {role === 'admin' && (
              <>
                <MvBadge badgeName='admin' />
                <MvBadge badgeName='teacher' />
              </>
            )}
            {role === 'teacher' && <MvBadge badgeName='teacher' />}
          </HStack>
          <Text alignSelf="center" fontWeight="bold">{username}</Text>
        </Flex>
        <Box as="span">
          <Box as="span" color="black"><NextLink href="#">meu perfil</NextLink></Box>
          {' | '}
          <Box as="span" color="red"><NextLink href="#">sair</NextLink></Box>
        </Box>
      </VStack>
    </Flex>
  )
}

export default TopMenu
