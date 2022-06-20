export enum RoleEnum {
  admin = 'admin',
  student = 'student',
  manager = 'manager'
}

export interface UserInterface {
  id: number | null
  email: string
  name: string
  job: string
  goal: number
  role: RoleEnum
}

export type UserAuthContextProps = Pick<UserInterface,
  'name' | 'role' | 'id'
>