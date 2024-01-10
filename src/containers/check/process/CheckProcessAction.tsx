'use client'

import { Button } from '@/components/ui/button'
import { useCheckProcessContext } from '@/hooks/app/check/use-processing-context'
import { cn } from '@/lib/utils'
import { FunctionComponent, HTMLAttributes } from 'react'

interface CheckProcessActionProps extends HTMLAttributes<HTMLDivElement> {}

export const CheckProcessAction: FunctionComponent<CheckProcessActionProps> = ({
  className,
  ...props
}) => {
  const { prev, next } = useCheckProcessContext()

  return (
    <section className={cn('flex gap-5 w-full', className)} {...props}>
      <Button className="basis-full" onClick={prev}>
        이전
      </Button>
      <Button className="basis-full" onClick={next}>
        다음
      </Button>
    </section>
  )
}
