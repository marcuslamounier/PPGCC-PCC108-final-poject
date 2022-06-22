import { TransactionInterface } from "../interfaces/TransactionInterface"
import api from "./api"

const path = '/transactions'

export const TransactionService = {
  getTransactionsByUser(token: string, user_id: number) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    return api.get(`${path}?user_id=${user_id}`, config)
  },
  addTransaction(
    token: string,
    bodyReq: Partial<TransactionInterface>
  ) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    return api.post(path, bodyReq, config)
  },
}