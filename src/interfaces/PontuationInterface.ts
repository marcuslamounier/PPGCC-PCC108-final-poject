import { TransactionInterface } from "./TransactionInterface"
import { UserInterface } from "./UserInterface"

export interface PontuationInterface {
  transactions: Pick<TransactionInterface, 'value' | 'release'>[]
  goal: UserInterface['goal']
}
