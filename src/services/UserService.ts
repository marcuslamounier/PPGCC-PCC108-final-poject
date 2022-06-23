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
  getUserById(token: string, id: number) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    return api.get(`${path}/${id}`, config)
  },
  addUser(
    token: string,
    bodyReq: Partial<UserInterface> & { password: string }
  ) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    return api.post(path, bodyReq, config)
  },
}