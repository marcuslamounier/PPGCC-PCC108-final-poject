import { StackDivider, VStack } from "@chakra-ui/react"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const MvList = ({ children }: Props) => {
  return (
    <VStack
      divider={<StackDivider borderColor='gray.700' />}
      spacing={2}
      align='stretch'
      py={4}
    >
      {children}
    </VStack>
  )
}

export default MvList
