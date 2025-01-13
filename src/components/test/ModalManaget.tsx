import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '../ui/dialog'

type ModalState = {
  title: string
  content: string
}

type ShowHandlder = ((state: ModalState) => void) | null
type HideHandler = (() => void) | null

const GlobalModalManager = (() => {
  let showModalHandler: ShowHandlder = null
  let hideModalHandler: HideHandler = null

  const showModal = (title: string, content: string) => {
    if (showModalHandler) showModalHandler({ title, content })
  }
  const hideModal = () => {
    if (hideModalHandler) hideModalHandler()
  }

  const ModalManagerComponent = () => {
    const [modalState, setModalState] = useState({
      isOpen: false,
      title: '',
      content: '',
    })

    showModalHandler = ({
      title,
      content,
    }: {
      title: string
      content: string
    }) => {
      setModalState({ isOpen: true, title, content })
    }

    hideModalHandler = () => {
      setModalState((prev) => ({ ...prev, isOpen: false }))
    }

    return (
      <Dialog open={modalState.isOpen} onOpenChange={hideModalHandler}>
        <DialogContent>
          <DialogHeader>{modalState.title}</DialogHeader>
          <DialogDescription>설명쓰</DialogDescription>
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
