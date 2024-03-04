import { cn } from '@/lib/utils'
import { FunctionComponent, HTMLAttributes } from 'react'
import { Desktop } from './Desktop'

interface HomeHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const HomeHeader: FunctionComponent<HomeHeaderProps> = ({
  className,
  ...props
}) => {
  return (
    <header
      className={cn('h-header bg-white sticky top-0', className)}
      {...props}
    >
      <Desktop />
    </header>
  )
}
