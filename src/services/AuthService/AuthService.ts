import { UserInterface } from "../../interfaces/UserInterface"
import { UserService } from '../UserService'
import api from "../api"

const path = '/auth'

export const AuthService = {
  login(email: string, pass: string) {
    const body = {
      "email": email,
      "password": pass
    }
    return api.post(`${path}/login`, body)
  },
  async getMe(token: string, myId: string) {
    try {
      const { data } = await UserService.getUsers(token)
      const userData = data.find((user: any) => String(user.id) === myId)
      const me: UserInterface = {
        id: userData.id,
        email: userData.email,
        goal: userData.goal,
        job: userData.job,
        name: userData.name,
        role: userData.role
      }
      return me
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
