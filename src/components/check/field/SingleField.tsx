import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CheckQuestion, Option } from '@/types/app/check'
import { FunctionComponent, HTMLAttributes } from 'react'

interface SingleFormProps extends HTMLAttributes<HTMLDivElement> {
  questionNumber: number
  question: CheckQuestion
  isSelectedHandler: (response: Option) => boolean
  onClickHandler: (response: Option) => void
}

export const SingleForm: FunctionComponent<SingleFormProps> = ({
  className,
  questionNumber,
  question,
  isSelectedHandler,
  onClickHandler,
  ...props
}) => {
  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        {questionNumber}. {question.title}
      </CardHeader>
      <CardContent className="flex w-full flex-col gap-5">
        {question.options.map((option) => {
          return (
            <Button
              key={option.value}
              className={cn(
                'basis-full',
                isSelectedHandler(option)
                  ? 'bg-slate-700 border-slate-900 border-4'
                  : 'bg-slate-500 border-transparent border-4',
              )}
              onClick={() => {
                onClickHandler(option)
              }}
            >
              {option.label}
            </Button>
          )
        })}
      </CardContent>
    </Card>
  )
}
