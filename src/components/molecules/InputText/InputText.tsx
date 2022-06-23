import React from "react"
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react"
import { ChangeEvent, useState } from "react"

export type MvInputProps = {
  name: string
  label: string
  initialValue?: string
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  isRequired?: boolean
  mask?: (value: any) => string
  isPass?: boolean
}

const InputText = ({
  name,
  handleInput,
  initialValue,
  label,
  placeholder,
  isRequired = true,
  mask = undefined,
  isPass = false
}: MvInputProps) => {
  const objName = `input-${name}`
  const [fieldValue, setFieldValue] = useState<string>(initialValue || '')
  const [show, setShow] = useState<boolean>(false)
  const togglePassView = () => setShow(!show)

  const updateField = (event: ChangeEvent<HTMLInputElement>) => {
    if (mask) event.target.value = mask(event.target.value)
    setFieldValue(event.target.value)
    handleInput(event)
  }

  return (
    <FormControl isRequired={isRequired} mb={4}>
      <FormLabel htmlFor={objName} mb={1}>{label}</FormLabel>
      <InputGroup size='md'>
        <Input
          id={objName}
          data-testid={`test-${objName}`}
          pr={isPass ? 'inherit' : '4.5rem'}
          placeholder={placeholder || label}
          name={name}
          onChange={updateField}
          type={isPass ? (show ? 'text' : 'password') : 'test'}
          value={fieldValue}
        />
        {isPass &&
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={togglePassView}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        }
      </InputGroup>
    </FormControl>
  )
}

export default InputText
