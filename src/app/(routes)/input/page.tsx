'use client'

import { FunctionComponent } from 'react'

interface PageProps {}

const Page: FunctionComponent<PageProps> = ({}) => {
  const onSubmit = (data: FormData) => {
    console.log(Object.fromEntries(data.entries()))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formElement = e.target as HTMLFormElement
    const dataObject = new FormData(formElement)
    onSubmit(dataObject)
  }

  return (
    <main>
      <form className="h-[50px]" onSubmit={handleSubmit}>
        <input name="a"></input>
        <input name="b"></input>
        <input name="c"></input>
        <input name="d"></input>
        <button type="submit">눌러</button>
      </form>
    </main>
  )
}

export default Page
