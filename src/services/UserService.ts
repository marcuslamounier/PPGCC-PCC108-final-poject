import { UserInterface } from "../interfaces/UserInterface"
import api from "./api"

const path = '/users'

export const UserService = {
  getUsers(token: string) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    return api.get(path, config)
  },
  addUser(
    token: string,
    bodyReq: Omit<UserInterface, 'id'> & { password: string }
  ) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    return api.post(path, bodyReq, config)
  }
}