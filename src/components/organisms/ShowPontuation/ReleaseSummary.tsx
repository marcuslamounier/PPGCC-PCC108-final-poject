import { Text } from "@chakra-ui/react"
import { ReleaseEnum } from "../../../interfaces/TransactionInterface"
import { formatCurrency } from "../../../util/stringFunctions"

type Props = {
  value: number
  release: ReleaseEnum
}

const ReleaseSummary = ({ value, release }: Props) => {
  return (

    <Text textAlign="center">
      Você
      <Text
        as="span"
        fontWeight="bold"
        color={release === 1 ? 'blue' : 'red'}
      >
        {release === 1 ? ' ganhou ' : ' gastou '}
      </Text>
      <Text w="100%" fontWeight="900" fontSize="2xl">{formatCurrency(value)}</Text>
      reais
    </Text>
  )
}

export default ReleaseSummary
