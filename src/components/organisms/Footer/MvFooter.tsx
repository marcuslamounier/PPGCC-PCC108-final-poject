import React from 'react'
import packageInfo from '../../../../package.json'
import { Box, Flex, HStack } from '@chakra-ui/react'
import NextLink from 'next/link'
const version = packageInfo.version

const MvFooter = () => {
  return (
    <Flex
      w="100%"
      display={['block', 'flex']}
      alignItems="center"
      position="fixed"
      bg="gray.300"
      h="60px"
      bottom={0}
    >
      <Box as="div" w={['100%', '50%']} textAlign="center" py={[3, 4]}>
        Copyright © {new Date().getFullYear()} | Bolso no Azul | v{version}
      </Box>
      <Box as="div" placeContent="center" w={['100%', '50%']} py={[3, 4]}>
        <HStack display="flex" placeContent={['center', 'auto']}>
          <Box as="span">Desenvolvido por </Box>
          <NextLink href="https://github.com/marcuslamounier">
            <a target="_blank">Marcus V. Lamounier Quadros</a>
          </NextLink>
        </HStack>
      </Box>
    </Flex>
  )
}

export default MvFooter
