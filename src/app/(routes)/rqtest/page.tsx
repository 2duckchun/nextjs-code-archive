'use client'

import { Card } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { FunctionComponent } from 'react'

interface ReactQueryTestPageProps {}

const getData = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  return res.json()
}

const ReactQueryTestPage: FunctionComponent<ReactQueryTestPageProps> = ({}) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos')
      return res.json()
    },
  })

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Error: {error.message}</div>

  return (
    <main className="main-content bg-gray-300">
      {data.map(
        (data: {
          userId: number
          id: number
          title: string
          completed: boolean
        }) => {
          return (
            <Card
              key={data.id}
              className="flex w-full flex-col items-center justify-center p-5"
            >
              <h3>title : {data.title}</h3>
              <p>{data.completed ? 'GOOD' : 'TRY AGAIN'}</p>
            </Card>
          )
        },
      )}
    </main>
  )
}

export default ReactQueryTestPage
