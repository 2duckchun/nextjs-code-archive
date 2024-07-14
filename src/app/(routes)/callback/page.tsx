import { ActionsContainer } from '@/containers/actions/actions-container'
import { FunctionComponent } from 'react'

interface PageProps {}

export type Action = {
  type: 'button'
  label: string
  api: (data: any) => unknown
}

const actionsList: Action[] = [
  {
    type: 'button',
    label: '콘솔로그 콜백1',
    api: async <T,>(data: T) => {
      'use server'
      console.log(data)
    },
  },
  {
    type: 'button',
    label: '콘솔로그 콜백2',
    api: async (data: any) => {
      'use server'
      console.log(data)
    },
  },
  {
    type: 'button',
    label: 'async 콜백',
    api: async (data: { index: number }) => {
      'use server'
      const { index } = data
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${index}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const result = await response.json()
      console.log(result)
    },
  },
]

const Page: FunctionComponent<PageProps> = async ({}) => {
  return (
    <main>
      <ActionsContainer actionsList={actionsList} />
    </main>
  )
}

export default Page

// const actionsList: Action[] = [
//     {
//       type: 'button',
//       label: '콘솔로그 콜백',
//       api: <T,>(data: T) => {
//         console.log(data)
//       },
//     },
//     {
//       type: 'button',
//       label: 'Alert 콜백',
//       api: (data: any) => {
//           alert(JSON.stringify(data))
//       },
//     },
//     {
//       type: 'button',
//       label: 'async 콜백',
//       api: async (data: { index: number }) => {
//         const { index } = data
//         const response = await fetch(
//           `https://jsonplaceholder.typicode.com/posts/${index}`,
//           {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           },
//         )
//         const result = await response.json()
//           alert(JSON.stringify(result, null, 2))
//       },
//     },
//   ]
