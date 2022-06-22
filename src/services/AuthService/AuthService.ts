import { UserInterface } from "../../interfaces/UserInterface"
import { UserService } from '../UserService'
import api from "../api"
import { User } from "../../classes/User"

const path = '/auth'

export const AuthService = {
  login(email: string, pass: string) {
    const body = {
      "email": email,
      "password": pass
    }
    return api.post(`${path}/login`, body)
  },
  async getMe(token: string, myId: number) {
    try {
      const { data } = await UserService.getUserById(token, myId)
      const me = new User({
        id: data.id as UserInterface['id'],
        email: data.email as UserInterface['email'],
        goal: data.goal as UserInterface['goal'],
        job: data.job as UserInterface['job'],
        name: data.name as UserInterface['name'],
        role: data.role as UserInterface['role']
      })
      return me
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
