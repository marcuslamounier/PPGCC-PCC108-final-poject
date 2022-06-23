import {
  ReleaseEnum,
  TransactionInterface
} from "../interfaces/TransactionInterface"

export class Transaction implements TransactionInterface {
  protected _id: TransactionInterface['id']
  protected _user_id: TransactionInterface['user_id']
  protected _release: TransactionInterface['release']
  protected _date: TransactionInterface['date']
  protected _description: TransactionInterface['description']
  protected _value: TransactionInterface['value']
  protected _category: TransactionInterface['category']

  constructor(props: Partial<TransactionInterface>) {
    this._id = props.id || null
    this._user_id = props.user_id || null
    this._release = props.release || ReleaseEnum.expense
    this._date = props.date || new Date()
    this._description = props.description || ""
    this._value = props.value || 0
    this._category = props.category || ""
  }

  public get id() { return this._id }
  public get user_id() { return this._user_id }
  public get release() { return this._release }
  public get date() { return this._date }
  public get description() { return this._description }
  public get value() { return this._value }
  public get category() { return this._category }

  protected set id(value: TransactionInterface['id']) { }
  protected set user_id(value: TransactionInterface['user_id']) { }
  public set release(value: TransactionInterface['release']) {
    this._release = value
  }
  public set date(value: TransactionInterface['date']) {
    this._date = value
  }
  public set description(value: TransactionInterface['description']) {
    this._description = value
  }
  public set value(value: TransactionInterface['value']) {
    this._value = value
  }
  public set category(value: TransactionInterface['category']) {
    this._category = value
  }

  testar() {
    console.log(this)
  }
}