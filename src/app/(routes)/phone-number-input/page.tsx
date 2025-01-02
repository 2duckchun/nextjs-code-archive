'use client'

import { PhoneNumberInput } from '@/components/ui/PhoneNumberInput'
import { FunctionComponent, useState } from 'react'

interface PhoneNumberIndexProps {}

const PhoneNumberIndex: FunctionComponent<PhoneNumberIndexProps> = ({}) => {
  const [value, setValue] = useState('')
  return (
    <main>
      <PhoneNumberInput onChange={setValue} value={value} />
    </main>
  )
}

export default PhoneNumberIndex
