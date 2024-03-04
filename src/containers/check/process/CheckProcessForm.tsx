'use client'

import { SelectField } from '@/components/check/field/SelectField'
import { SingleField } from '@/components/check/field/SingleField'
import { useCheckProcessContext } from '@/hooks/app/check/useProcessProvider'
import { assertNever } from '@/lib/assertions'
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
          <SingleField
            questionNumber={currentStep + 1}
            question={question}
            isSelectedHandler={isSelectedResponse}
            onClickHandler={selectResponse}
          />
        )
      case 'select':
        return (
          <SelectField
            questionNumber={currentStep + 1}
            question={question}
            onChangeHandler={selectResponse}
          />
        )
      default:
        return assertNever(question.type)
    }
  }

  return (
    <div className={cn('w-full', className)} {...props}>
      <div>{getQuestionForm(getCurrentQuestion())}</div>
    </div>
  )
}
