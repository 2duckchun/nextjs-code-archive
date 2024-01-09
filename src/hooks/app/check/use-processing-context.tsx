'use client'

import {
  CheckProcessData,
  CheckQuestion,
  Option,
  ValueFromOption,
} from '@/types/app/check'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

interface CheckProcessContext {
  currentStep: number
  totalStep: number
  checkedResponse: ValueFromOption[]
  shouldGoNext: boolean
  selectResponse: (response: Option) => void
  getCurrentQuestion: () => CheckQuestion
  next: () => void
  prev: () => void
}

const CheckProcessContext = createContext<CheckProcessContext | null>(null)

export const CheckProcessProvider = ({
  checkData,
  children,
}: {
  checkData: CheckProcessData
  children: React.ReactNode
}) => {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [checkedResponse, setCheckedResponse] = useState<ValueFromOption[]>([])
  const [shouldGoNext, setShouldGoNext] = useState(false)
  const totalStep = checkData.questions.length

  const getCurrentQuestion = () => {
    return checkData.questions[currentStep]
  }

  const selectResponse = (response: Option) => {
    const newCheckedResponse = [...checkedResponse]
    newCheckedResponse[currentStep] = response.value
    setCheckedResponse(newCheckedResponse)
    setShouldGoNext(true)
  }

  const next = () => {
    if (!checkedResponse[currentStep]) {
      console.log('체크를 안하셨습니다.')
      return
    }

    if (currentStep < totalStep - 1) {
      setShouldGoNext(false)
      setCurrentStep((prev) => prev + 1)
      return
    }

    if (currentStep === totalStep - 1) {
      console.log('체크가 끝났습니다.')
      return
    }

    throw new Error('체크 프로세스에서 알 수 없는 오류가 발생했습니다.')
  }

  const prev = () => {
    if (currentStep === 0) {
      router.back()
      return
    }

    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      return
    }
  }

  return (
    <CheckProcessContext.Provider
      value={{
        currentStep,
        totalStep,
        checkedResponse,
        shouldGoNext,
        selectResponse,
        getCurrentQuestion,
        next,
        prev,
      }}
    >
      {children}
    </CheckProcessContext.Provider>
  )
}

export const useCheckProcessContext = () => {
  const processContext = useContext(CheckProcessContext)
  if (processContext === null) {
    throw new Error('CheckProcessContext is null')
  }
  return processContext
}
