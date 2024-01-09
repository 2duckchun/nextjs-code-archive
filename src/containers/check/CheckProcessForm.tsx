'use client'

import { SingleForm } from '@/components/check/field/SingleForm'
import { useCheckProcessContext } from '@/hooks/app/check/use-processing-context'
import { cn } from '@/lib/utils'
import { CheckQuestion } from '@/types/app/check'
import { FunctionComponent, HTMLAttributes } from 'react'

interface CheckProcessFormProps extends HTMLAttributes<HTMLDivElement> {}

export const CheckProcessForm: FunctionComponent<CheckProcessFormProps> = ({
  className,
  ...props
}) => {
  const { currentStep, getCurrentQuestion, prev, next, selectResponse } =
    useCheckProcessContext()

  function getQuestionForm(question: CheckQuestion) {
    switch (question.type) {
      case 'single':
        return (
          <SingleForm
            questionNumber={currentStep + 1}
            question={question}
            onClickHandler={selectResponse}
          />
        )
      case 'select':
        return <div>single</div>
      default:
        return <div>default</div>
    }
  }
  return (
    <div className={cn(className)} {...props}>
      <div>{getQuestionForm(getCurrentQuestion())}</div>
    </div>
  )
}
