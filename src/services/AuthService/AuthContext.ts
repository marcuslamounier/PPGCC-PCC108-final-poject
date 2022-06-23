import {
  useContext,
  createContext,
  Dispatch,
  SetStateAction
} from "react"
import { RoleEnum, UserInterface } from "../../interfaces/UserInterface"

export type UserAuthContextProps = Pick<UserInterface,
  'name' | 'role' | 'id'
>

export const initialUser: UserAuthContextProps = {
  id: null,
  name: '',
  role: RoleEnum.student
}

export const AuthContext = createContext<{
  user: UserAuthContextProps,
  setUser: Dispatch<SetStateAction<UserAuthContextProps>>,
  token: string,
  setToken: Dispatch<SetStateAction<string>>
}>({
  user: initialUser,
  setUser: () => { },
  token: '',
  setToken: () => { }
})

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) console.error('Undefined context')
  return context
}
