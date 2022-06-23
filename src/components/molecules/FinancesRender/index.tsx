import { Box, Flex, Text, HStack, VStack } from "@chakra-ui/react"
import {
  ReleaseEnum,
  TransactionInterface
} from "../../../interfaces/TransactionInterface"
import { formatCurrency } from "../../../util/stringFunctions"
import MvBadge from "../../atoms/Badge/MvBadge"

type Props = {
  transaction: TransactionInterface
}

const FinancesRender = ({ transaction }: Props) => {
  return (
    <Flex
      py={2}
      px={4}
      borderRadius={10}
      as="div"
      justifyContent="space-between"
    >
      <VStack alignItems="flex-start" spacing={1}>
        <Text fontSize="xs">
          {new Date(transaction.date).toLocaleDateString('pt-Br')}
        </Text>
        <Text fontWeight="bold" fontSize="lg">
          {transaction.description}
        </Text>
        <Text fontStyle="italic">
          {transaction.category}
        </Text>
      </VStack>
      <VStack alignItems="flex-end" spacing={1}>
        <Box
          as="div"
          px={4}
          py={2}
          bgColor={transaction.release === ReleaseEnum.expense
            ? 'red'
            : 'blue'
          }
          color="white"
          borderRadius={8}
          fontWeight="bold"
        >
          {transaction.release === ReleaseEnum.expense
            ? 'DESPESA'
            : 'RECEITA'
          }
        </Box>
        <HStack
          display="flex"
          spacing={1}
          bgColor="gray.100"
          borderRadius={5}
        >
          <HStack px={3} spacing={0}>
            <MvBadge badgeName='edit' />
            <MvBadge badgeName='delete' />
          </HStack>
          <Box
            as="div"
            fontSize="2xl"
            color="black"
            borderRadius={8}
            fontWeight="bold"
          >
            {formatCurrency(transaction.value)}
          </Box>
        </HStack>
      </VStack>
    </Flex>
  )
}

export default FinancesRender
