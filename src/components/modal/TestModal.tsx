import { cn } from '@/lib/utils'
import { FunctionComponent, HTMLAttributes } from 'react'
import { ModalPortal } from './Modal'

interface TestModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  setIsOpen: () => void
}

export const TestModal: FunctionComponent<TestModalProps> = ({
  className,
  isOpen,
  setIsOpen,
  ...props
}) => {
  if (!isOpen) return null

  return (
    <ModalPortal>
      <div className="fixed left-0 top-0 z-10 h-full w-full overflow-hidden bg-black/50">
        <div className={cn(className)} {...props}>
          TestModal
        </div>
        <button onClick={setIsOpen}>눌르라!</button>
      </div>
    </ModalPortal>
  )
}
