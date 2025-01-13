'use client'

import { ReactNode, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'

type ModalState = {
  title: string
  content: ReactNode
}

type ShowHandlder = ((state: ModalState) => void) | null
type HideHandler = (() => void) | null

const GlobalModalManager = (() => {
  let showModalHandler: ShowHandlder = null
  let hideModalHandler: HideHandler = null

  const showModal = (title: string, content: ReactNode) => {
    if (showModalHandler) showModalHandler({ title, content })
  }
  const hideModal = () => {
    if (hideModalHandler) hideModalHandler()
  }

  const ModalManagerComponent = () => {
    const [modalState, setModalState] = useState<
      {
        isOpen: boolean
      } & ModalState
    >({
      isOpen: false,
      title: '',
      content: '',
    })

    showModalHandler = ({
      title,
      content,
    }: {
      title: string
      content: ReactNode
    }) => {
      setModalState({ isOpen: true, title, content })
    }

    hideModalHandler = () => {
      setModalState((prev) => ({ ...prev, isOpen: false }))
    }

    return (
      <Dialog open={modalState.isOpen} onOpenChange={hideModalHandler}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{modalState.title}</DialogTitle>
            <DialogDescription>설명쓰</DialogDescription>
          </DialogHeader>
          <div>{modalState.content}</div>
        </DialogContent>
      </Dialog>
    )
  }

  return { showModal, hideModal, ModalManagerComponent }
})()

export const GlobalModal = GlobalModalManager.ModalManagerComponent
export const showModal = GlobalModalManager.showModal
export const hideModal = GlobalModalManager.hideModal
