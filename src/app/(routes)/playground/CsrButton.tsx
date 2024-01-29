'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FunctionComponent, HTMLAttributes } from 'react'

interface CsrButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export const CsrButton: FunctionComponent<CsrButtonProps> = ({
  className,
  ...props
}) => {
  return (
    <Button className={cn(className)} {...props} onClick={() => alert('gdgd')}>
      CSR 버튼
    </Button>
  )
}
