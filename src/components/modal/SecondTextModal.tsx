import { cn } from '@/lib/utils'
import { FunctionComponent, HTMLAttributes } from 'react'
import { Modal, ModalCloseButton, ModalContent, ModalHeader } from './Modal'

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
      <ModalContent>
        <ModalHeader>안녕</ModalHeader>
        <div>페이드 로타 하코넨!!!</div>
        <div>페이드 로타 하코넨!!!</div>
        <div>페이드 로타 하코넨!!!</div>
        <div>페이드 로타 하코넨!!!</div>
        <div>페이드 로타 하코넨!!!</div>
        <div>페이드 로타 하코넨!!!</div>
        <div>페이드 로타 하코넨!!!</div>
        <ModalCloseButton>닫기</ModalCloseButton>
      </ModalContent>
    </Modal>
  )
}
