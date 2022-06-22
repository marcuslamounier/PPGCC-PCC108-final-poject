import { FormControl, FormLabel, Input } from "@chakra-ui/react"
import { ChangeEvent, useState } from "react"

export type MvInputProps = {
  name: string
  label: string
  initialValue?: string
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  isRequired?: boolean
}

const InputText = ({
  name,
  handleInput,
  initialValue,
  label,
  placeholder,
  isRequired = true
}: MvInputProps) => {
  const objName = `input-${name}`
  const [fieldValue, setFieldValue] = useState<string>(initialValue || '')

  const updateField = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(event.target.value)
    handleInput(event)
  }

  return (
    <FormControl isRequired={isRequired} mb={4}>
      <FormLabel htmlFor={objName} mb={1}>{label}</FormLabel>
      <Input
        id={objName}
        placeholder={placeholder || label}
        name={name}
        onChange={updateField}
        value={fieldValue}
      />
    </FormControl>
  )
}

export default InputText