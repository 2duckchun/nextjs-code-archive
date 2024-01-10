import { cn } from '@/lib/utils'
import { FunctionComponent, HTMLAttributes } from 'react'

interface CheckProcessTitleProps extends HTMLAttributes<HTMLDivElement> {
  introduceArray: string[]
}

export const CheckProcessTitle: FunctionComponent<CheckProcessTitleProps> = ({
  introduceArray,
  className,
  ...props
}) => {
  return (
    <section className={cn(className)} {...props}>
      {introduceArray.map((value) => {
        return <p key={value}>{value}</p>
      })}
    </section>
  )
}
