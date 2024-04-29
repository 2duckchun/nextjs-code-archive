'use client'

import { cn } from '@/lib/utils'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

const ModalContext = createContext<{
  onClose: () => void
  dimmed: boolean
} | null>(null)

const useModalContext = () => {
  const context = useContext(ModalContext)
  if (context === null) throw new Error('모달 컨텍스트가 생성되지 않았습니다.')
  return context
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  dimmed = true,
}: {
  children: ReactNode
  className?: string
  onClose: () => void
  isOpen: boolean
  dimmed?: boolean
}) => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  })

  return (
    isOpen && (
      <ModalPortal>
        <ModalContext.Provider value={{ onClose, dimmed }}>
          <ModalOverlay>
            <ModalContentWrapper>{children}</ModalContentWrapper>
          </ModalOverlay>
        </ModalContext.Provider>
      </ModalPortal>
    )
  )
}

export const ModalCloseButton = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  const { onClose } = useModalContext()
  return (
    <button
      type="button"
      className={cn('w-full bg-blue-600', className)}
      onClick={onClose}
    >
      {children}
    </button>
  )
}

const ModalOverlay = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  const { dimmed, onClose } = useModalContext()

  const onClickModalOverlay = () => {
    if (dimmed) onClose()
  }

  return (
    <div
      onClick={onClickModalOverlay}
      className={cn(
        'fixed left-0 top-0 z-10 h-full w-full overflow-hidden bg-black/50',
        className,
      )}
    >
      {children}
    </div>
  )
}

export const ModalHeader = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <h3 className={cn('w-full text-center text-xl font-semibold', className)}>
      {children}
    </h3>
  )
}

const ModalContentWrapper = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  return (
    <div
      className={cn(
        'fixed left-[50%] top-[50%] m-auto  w-full max-w-lg translate-x-[-50%] translate-y-[-50%]',
        className,
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  )
}

export const ModalContent = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div
      className={
        'flex min-h-[100px] w-[500px] flex-col justify-between bg-white'
      }
    >
      {children}
    </div>
  )
}

export const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  return (
    mounted &&
    createPortal(children, document.getElementById('modal-root') as HTMLElement)
  )
}
