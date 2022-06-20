import { ModalHeader } from "@chakra-ui/react"

type Props = {
  title: string
}

const MvModalHeader = ({
  title
}: Props) => {
  return (
    <ModalHeader>{title}</ModalHeader>
  )
}

export default MvModalHeader
