import { Action } from '@/app/(routes)/callback/page'

export const actionsList: Action[] = [
  {
    type: 'button',
    label: '콘솔로그 콜백',
    api: <T,>(data: T) => {
      console.log(data)
    },
  },
  {
    type: 'button',
    label: 'Alert 콜백',
    api: (data: any) => {
      console.log(data)
      //   alert(JSON.stringify(data))
    },
  },
  {
    type: 'button',
    label: 'async 콜백',
    api: async (data: { index: number }) => {
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
      //   alert(JSON.stringify(result, null, 2))
    },
  },
]
