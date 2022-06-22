import { StackDivider, Stack, StackDirection } from "@chakra-ui/react"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
  direction?: StackDirection
}

const MvList = ({ children, direction = 'column' }: Props) => {
  return (
    <Stack
      divider={<StackDivider borderColor='gray.700' />}
      direction={direction}
      spacing={2}
      justifyContent="space-between"
      align='stretch'
    >
      {children}
    </Stack>
  )
}

export default MvList
