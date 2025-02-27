import { cn } from '@/shared/lib/utils'
import { formatPhoneNumber } from '@/shared/lib/format-phone-number'
import { ChangeEvent } from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

interface PhoneNumberInputProps
  extends Omit<InputProps, 'onChange' | 'onBlur'> {
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
}

export const PhoneNumberInput = ({
  className,
  onChange,
  value = '',
  ...props
}: PhoneNumberInputProps) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const unfomattedValue = e.target.value.replace(/[^0-9]/, '')
    if (onChange) onChange(unfomattedValue)
  }

  const handleOnFocus = () => {
    const unfomattedValue = value.replace(/[^0-9]/g, '')
    if (onChange) onChange(unfomattedValue)
  }

  const handleOnBlur = () => {
    const formattedValue = formatPhoneNumber(value)
    if (onChange) onChange(formattedValue)
  }

  return (
    <input
      type="tel"
      className={cn(className)}
      onChange={handleOnChange}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      maxLength={11}
      value={value}
      {...props}
    />
  )
}
