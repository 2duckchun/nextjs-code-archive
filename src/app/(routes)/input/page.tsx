'use client'

import { SecondTextModal } from '@/components/modal/SecondTextModal'
import { TestModal } from '@/components/modal/TestModal'
import { CForm } from '@/components/ui/CustomForm'
import { FunctionComponent, useState } from 'react'

interface PageProps {}

const Page: FunctionComponent<PageProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => {
    setIsOpen(() => false)
  }

  const onSubmit = (data: FormData) => {
    console.log(Object.fromEntries(data.entries()))
  }

  return (
    <main>
      <SecondTextModal isOpen={isOpen} onClose={onClose} />
      <CForm onSubmit={onSubmit} className="flex h-[100px] gap-5 bg-slate-700">
        <input name="a"></input>
        <input name="b"></input>
        <input name="c"></input>
        <input name="d"></input>
        <button type="submit">눌러</button>
      </CForm>
      <button
        onClick={() => {
          setIsOpen((state) => !state)
        }}
      >
        눌르라
      </button>
    </main>
  )
}

export default Page
