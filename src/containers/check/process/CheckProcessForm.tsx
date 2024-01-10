'use client'

import { SingleForm } from '@/components/check/field/SingleField'
import { useCheckProcessContext } from '@/hooks/app/check/use-processing-context'
import { cn } from '@/lib/utils'
import { CheckQuestion } from '@/types/app/check'
import { FunctionComponent, HTMLAttributes } from 'react'

interface CheckProcessFormProps extends HTMLAttributes<HTMLDivElement> {}

export const CheckProcessForm: FunctionComponent<CheckProcessFormProps> = ({
  className,
  ...props
}) => {
  const {
    currentStep,
    getCurrentQuestion,
    selectResponse,
    isSelectedResponse,
  } = useCheckProcessContext()

  function getQuestionForm(question: CheckQuestion) {
    switch (question.type) {
      case 'single':
        return (
          <SingleForm
            questionNumber={currentStep + 1}
            question={question}
            isSelectedHandler={isSelectedResponse}
            onClickHandler={selectResponse}
          />
        )
      case 'select':
        return <div>select</div>
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
