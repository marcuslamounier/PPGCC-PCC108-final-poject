import { Modal, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

const MvModal = ({
  children,
  isOpen,
  onClose,
}: Props) => {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {children}
      </ModalContent>
    </Modal>
  )
}

export default MvModal
