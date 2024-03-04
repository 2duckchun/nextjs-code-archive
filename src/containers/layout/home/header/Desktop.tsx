import { cn } from '@/lib/utils'
import { FunctionComponent, HTMLAttributes } from 'react'

interface DesktopProps extends HTMLAttributes<HTMLDivElement> {}

export const Desktop: FunctionComponent<DesktopProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn('h-header flex items-center px-5', className)}
      {...props}
    >
      <div className="text-2xl font-semibold"> &lt; CODE ESTATE / &gt;</div>
    </div>
  )
}
