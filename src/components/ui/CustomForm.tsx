import { cn } from '@/lib/utils'
import { FunctionComponent, useRef } from 'react'

interface CustomFormProps {
  action?: string
  onSubmit: (data: FormData) => void
  className: string
  children: React.ReactNode
}

export const CForm: FunctionComponent<CustomFormProps> = ({
  action,
  children,
  className,
  onSubmit,
}) => {
  const formRef = useRef<HTMLFormElement | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formElement = e.target as HTMLFormElement
    const isValid = formElement.checkValidity()

    const firstInvalidField = formElement.querySelector(
      ':invalid',
    ) as HTMLElement

    firstInvalidField?.focus()

    if (isValid) {
      const dataObject = new FormData(formElement)
      onSubmit(dataObject)
    }
  }

  return (
    <form
      ref={formRef}
      action={action}
      noValidate
      onSubmit={handleSubmit}
      className={cn(className)}
    >
      {children}
      <button onClick={() => console.log(formRef.current)}>눌dd러</button>
    </form>
  )
}
