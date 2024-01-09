import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CheckQuestion, Option } from '@/types/app/check'
import { FunctionComponent, HTMLAttributes } from 'react'

interface SingleFormProps extends HTMLAttributes<HTMLDivElement> {
  questionNumber: number
  question: CheckQuestion
  onClickHandler: (response: Option) => void
}

export const SingleForm: FunctionComponent<SingleFormProps> = ({
  className,
  questionNumber,
  question,
  onClickHandler,
  ...props
}) => {
  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        {questionNumber}. {question.title}
      </CardHeader>
      <CardContent className="flex w-full gap-5">
        {question.options.map((option, index) => {
          return (
            <Button
              key={option.value}
              className="basis-full"
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
