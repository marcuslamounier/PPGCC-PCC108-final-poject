import { Pontuation } from "../classes/Pontuation"
import { UserService } from "./UserService"

export const PontuationService = {
  async getMyGoal(token: string, myId: number) {
    try {
      const { data } = await UserService.getUserById(token, myId)
      return Number(data.goal)
    } catch (error) {
      console.error(error)
      return 0
    }
  }
}