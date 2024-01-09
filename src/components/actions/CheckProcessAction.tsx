'use client'

import { cn } from '@/lib/utils'
import { FunctionComponent, HTMLAttributes } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { AppPath } from '@/constants/app-path'

interface CheckProcessActionProps extends HTMLAttributes<HTMLDivElement> {
  slug: string
}

export const CheckProcessAction: FunctionComponent<CheckProcessActionProps> = ({
  slug,
  className,
  ...props
}) => {
  const router = useRouter()

  return (
    <div className={cn('flex w-full gap-5', className)} {...props}>
      <Button className="basis-full" variant={'outline'}>
        이전
      </Button>
      <Button
        className="basis-full"
        onClick={() => {
          router.push(AppPath.checkProcessTo(slug))
        }}
      >
        설문
      </Button>
    </div>
  )
}
