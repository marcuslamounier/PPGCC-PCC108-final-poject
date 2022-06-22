import { RoleEnum, UserInterface } from "../interfaces/UserInterface"

export class User implements UserInterface {
  protected _id: UserInterface['id']
  protected _email: UserInterface['email']
  protected _name: UserInterface['name']
  protected _job: UserInterface['job']
  protected _goal: UserInterface['goal']
  protected _role: UserInterface['role']

  constructor(props: Partial<UserInterface>) {
    this._id = props.id || null
    this._email = props.email || ""
    this._name = props.name || ""
    this._job = props.job || ""
    this._goal = props.goal || 0
    this._role = props.role || RoleEnum.student
  }

  public get id() { return this._id }
  public get email() { return this._email }
  public get name() { return this._name }
  public get job() { return this._job }
  public get goal() { return this._goal }
  public get role() { return this._role }

  // protected set id (value: UserInterface['id']) {}
  public set email(value: UserInterface['email']) { this._email = value }
  public set name(value: UserInterface['name']) { this._name = value }
  public set job(value: UserInterface['job']) { this._job = value }
  public set goal(value: UserInterface['goal']) { this._goal = value }
  public set role(value: UserInterface['role']) { this._role = value }

  testar() {
    console.log(this._name)
  }
}