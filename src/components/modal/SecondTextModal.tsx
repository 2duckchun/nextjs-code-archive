import { cn } from '@/lib/utils'
import { FunctionComponent, HTMLAttributes } from 'react'
import { Modal, ModalCloseButton } from './Modal'

interface SecondTextModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
}

export const SecondTextModal: FunctionComponent<SecondTextModalProps> = ({
  className,
  isOpen,
  onClose,
  ...props
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>안녕</div>
      <ModalCloseButton>닫기</ModalCloseButton>
    </Modal>
  )
}
