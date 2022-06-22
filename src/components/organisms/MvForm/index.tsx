import { ChangeEvent, Component, useState } from "react"
import InputText, { MvInputProps } from "./InputText"

type Props = {
  fields: Omit<MvInputProps, "handleInput">[]
}

type State = {
  [key: string]: string
}

class MvForm extends Component<Props, State> {
  constructor(props: Props) {
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
              handleInput={this.handleInput}
            />
          )
        })}
      </>
    )
  }
}

export default MvForm
