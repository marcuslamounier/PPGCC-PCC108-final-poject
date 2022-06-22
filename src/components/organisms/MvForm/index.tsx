import { ChangeEvent, Component, useState } from "react"
import InputText, { MvInputProps } from "./InputText"

export type MvFormProps = {
  fields: Omit<MvInputProps, "handleInput">[]
}

type State = {
  [key: string]: string | number
}

class MvForm extends Component<MvFormProps, State> {
  constructor(props: MvFormProps) {
    super(props)

    const fieldNames = props.fields.map(field => field.name)
    const propForm = fieldNames.reduce((field, key) => ({ ...field, [key]: "" }), {})

    this.state = propForm
  }

  handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  render() {
    return (
      <>
        {this.props.fields.map((field, index) => {
          return (
            <InputText
              key={index}
              name={field.name}
              label={field.label}
              initialValue={field.initialValue || ""}
              isRequired={field.isRequired}
              mask={field.mask}
              handleInput={this.handleInput}
            />
          )
        })}
      </>
    )
  }
}

export default MvForm
