import { ReactNode } from "react"
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"

type Props = {
  children: ReactNode
  title?: string
  isOpen: boolean
  onClose: () => void
  modalActions: JSX.Element
  showCloseButton?: boolean
  overlay?: boolean
}

const MvModal = ({
  children,
  title,
  isOpen,
  onClose,
  modalActions,
  showCloseButton = true,
  overlay = true
}: Props) => {
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      {overlay && <ModalOverlay />}
      <ModalContent>
        {title && <ModalHeader>{title}</ModalHeader>}
        {showCloseButton && <ModalCloseButton />}
        <ModalBody pb={6}>
          {children}
          <HStack justifyContent="flex-end">
            {modalActions}
            <Button onClick={onClose}>Cancelar</Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default MvModal
