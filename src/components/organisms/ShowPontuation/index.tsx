import { Box, HStack } from "@chakra-ui/react"
import {
  TransactionInterface
} from "../../../interfaces/TransactionInterface"
import { UserInterface } from "../../../interfaces/UserInterface"
import PontuationProgress from "./PontuationProgress"
import ReleaseSummary from "./ReleaseSummary"

type TransactionProp = Pick<TransactionInterface, 'value' | 'release'>[]

type Props = {
  transactions: TransactionProp
  goal: UserInterface['goal']
}

const getSum = (transactions: TransactionProp) => {
  return transactions.reduce((sum, transaction) => {
    return sum + transaction.value
  }, 0)
}

const ShowPontuation = ({ transactions, goal }: Props) => {
  const expenses = transactions.filter(
    transaction => transaction.release === -1
  )
  const revenues = transactions.filter(
    transaction => transaction.release === 1
  )

  const sumExpenses = getSum(expenses)
  const sumRevenues = getSum(revenues)
  const points = (goal !== 0)
    ? Math.min(Math.max(0, ((sumRevenues - sumExpenses) / goal)), 1)
    : 0

  return (
    <Box as="div" w={['100%', '100%']}>
      <PontuationProgress points={points} showPontuation={goal !== 0} />
      <HStack
        w="100%"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Box as="div" w="50%">
          <ReleaseSummary release={1} value={sumRevenues} />
        </Box>
        <Box as="div" w="50%">
          <ReleaseSummary release={-1} value={sumExpenses} />
        </Box>
      </HStack>
    </Box>
  )
}

export default ShowPontuation
