'use client'

import { ReactNode, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './dialog'
import { Button } from './button'

type ModalState = {
  title: string
  content: ReactNode
  label?: string
  isOpen?: boolean
  onClose?: () => void
}

type ShowHandlder = ((state: ModalState) => void) | null
type HideHandler = (() => void) | null

const GlobalModalManager = (() => {
  let showModalHandler: ShowHandlder = null
  let hideModalHandler: HideHandler = null

  const showModal = ({ title, content, label, onClose }: ModalState) => {
    if (showModalHandler) showModalHandler({ title, content, label, onClose })
  }
  const hideModal = () => {
    if (hideModalHandler) hideModalHandler()
  }

  const ModalManagerComponent = () => {
    const [modalState, setModalState] = useState<ModalState>({
      isOpen: false,
      title: '',
      content: '',
      label: '',
    })

    showModalHandler = ({ title, content, label, onClose }: ModalState) => {
      setModalState({ isOpen: true, title, content, label, onClose })
    }

    hideModalHandler = () => {
      setModalState((prev) => ({ ...prev, isOpen: false }))
    }

    const { title, content, isOpen, label, onClose } = modalState

    return (
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open && onClose) onClose()
          hideModalHandler?.()
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>설명쓰</DialogDescription>
          </DialogHeader>
          <div>{content}</div>
          <DialogClose asChild>
            <Button>{label}</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    )
  }

  return { showModal, hideModal, ModalManagerComponent }
})()

export const GlobalModal = GlobalModalManager.ModalManagerComponent
export const showModal = GlobalModalManager.showModal
export const hideModal = GlobalModalManager.hideModal
