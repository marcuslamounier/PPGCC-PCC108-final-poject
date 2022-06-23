import { Box, Text } from "@chakra-ui/react"
import { ReleaseEnum } from "../../../interfaces/TransactionInterface"
import { formatCurrency } from "../../../util/stringFunctions"

type Props = {
  value: number
  release: ReleaseEnum
}

const ReleaseSummary = ({ value, release }: Props) => {
  return (
    <Box textAlign="center" w="100%">
      {'Você'}
      <Text
        as="span"
        fontWeight="bold"
        color={(release === 1) ? 'blue' : 'red'}
      >
        {(release === 1) && ' ganhou '}
        {!(release === 1) && ' gastou '}
      </Text>
      <Text w="100%" fontWeight="900" fontSize="2xl">
        {formatCurrency(value)}
      </Text>
      {'reais'}
    </Box>
  )
}

export default ReleaseSummary
