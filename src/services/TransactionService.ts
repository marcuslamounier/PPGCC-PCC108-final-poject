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
  }
}