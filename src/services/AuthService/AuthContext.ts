import { useContext, createContext, Dispatch, SetStateAction } from "react"
import { RoleEnum, UserAuthContextProps, UserInterface } from "../../interfaces/UserInterface"

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
