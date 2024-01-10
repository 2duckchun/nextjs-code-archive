'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { CheckQuestion, Option } from '@/types/app/check'
import { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react'

interface SelectFieldProps extends HTMLAttributes<HTMLDivElement> {
  questionNumber: number
  question: CheckQuestion
  onChangeHandler: (response: Option) => void
}

export const SelectField: FunctionComponent<SelectFieldProps> = ({
  questionNumber,
  question,
  className,
  onChangeHandler,
  ...props
}) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined,
  )

  return (
    <Card className={cn('w-full', className)} {...props}>
      <CardHeader>
        {questionNumber}. {question.title}
      </CardHeader>
      <CardContent className="flex w-full flex-col gap-5">
        <Select
          onValueChange={(value) => {
            onChangeHandler(
              question.options.find(
                (options) => options.value.toString() === value,
              )!,
            )
            setSelectedOption(value)
          }}
          value={selectedOption}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="생년월일을 골라주세요." />
          </SelectTrigger>
          <SelectContent
            ref={(ref) => {
              if (!ref) return
              ref.ontouchend = (e) => {
                e.preventDefault()
              }
            }}
          >
            <SelectGroup>
              {question.options.map((option) => {
                return (
                  <SelectItem
                    key={option.label}
                    value={option.value.toString()}
                  >
                    {option.label}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  )
}
