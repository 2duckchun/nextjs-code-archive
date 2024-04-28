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
    <button type="button" className={cn(className)} onClick={onClose}>
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

const ModalContentWrapper = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  return (
    <div
      className={cn('max-w-[500px] m-auto bg-white', className)}
      onClick={(e) => e.stopPropagation()}
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

  return createPortal(
    children,
    document.getElementById('modal-root') as HTMLElement,
  )
}
