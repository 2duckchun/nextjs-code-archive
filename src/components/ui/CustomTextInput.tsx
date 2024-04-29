import { cn } from '@/lib/utils'
import { FunctionComponent, HTMLAttributes } from 'react'

interface CustomTextInputProps extends React.HTMLProps<HTMLInputElement> {
  errorText: string
}

export const CustomTextInput: FunctionComponent<CustomTextInputProps> = ({
  id,
  name,
  className,
  label,
  type,
  errorText,
  ...props
}) => {
  return (
    <div className={cn(className)} {...props}>
      <div>
        {label && (
          <div>
            <label htmlFor={id}>{label}</label>
          </div>
        )}
      </div>
      <div>
        <input />
      </div>
    </div>
  )
}
