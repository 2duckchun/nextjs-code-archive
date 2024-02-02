'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react'

interface CsrButtonProps extends HTMLAttributes<HTMLDivElement> {}

export const CsrButton: FunctionComponent<CsrButtonProps> = ({
  className,
  ...props
}) => {
  const [wait, setWait] = useState()

  return (
    <div className={cn(className)} {...props}>
      <Button
        className="w-full"
        onClick={() => {
          alert('hello')
        }}
      >
        CSR버튼
      </Button>
    </div>
  )
}
