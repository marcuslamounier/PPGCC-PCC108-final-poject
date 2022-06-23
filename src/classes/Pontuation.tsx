import { Button } from "@chakra-ui/react"
import { Component } from "react"
import { PontuationInterface } from "../interfaces/PontuationInterface"

export class Pontuation
  extends Component
  implements PontuationInterface {

  protected _transactions: PontuationInterface['transactions']
  protected _goal: PontuationInterface['goal']

  constructor(props: Partial<PontuationInterface>) {
    super(props)
    this._transactions = props.transactions || []
    this._goal = props.goal || 0
  }

  public get transactions() { return this._transactions }
  public get goal() { return this._goal }

  public set transactions(value: PontuationInterface['transactions']) {
    this._transactions = value
  }
  public set goal(value: PontuationInterface['goal']) {
    this._goal = value
  }

  testar() {
    console.log(this)
  }

  render() {
    return (
      <Button>
        asdlda
      </Button>
    )
  }
}