'use client'

import { cn } from '@/lib/utils'
import { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { useCheckProcessContext } from '@/hooks/app/check/useProcessProvider'

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {}

function getPercent(current: number, total: number) {
  const step = 100 / total
  return step * (current + 1)
}

export const ProgressBar: FunctionComponent<ProgressBarProps> = ({
  className,
  ...props
}) => {
  const { currentStep, totalStep } = useCheckProcessContext()
  const [displayProgress, setDisplayProgress] = useState(0)

  useEffect(() => {
    const percent = getPercent(currentStep, totalStep)
    const timer = setTimeout(() => {
      setDisplayProgress(percent)
    }, 200)
    return () => clearTimeout(timer)
  }, [currentStep, totalStep])

  return (
    <div className={cn(className)} {...props}>
      <Progress value={displayProgress} />
      <p className="w-full text-center">
        {currentStep + 1} / {totalStep}
      </p>
    </div>
  )
}
