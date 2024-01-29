import { cn } from '@/lib/utils'
import { FunctionComponent, HTMLAttributes } from 'react'
import { CsrButton } from './CsrButton'

interface pageProps extends HTMLAttributes<HTMLDivElement> {}

type TestData = {
  title: string
  date: Date
  content: string
}

// SSR
const serverSidePromise = async () => {
  const data: TestData = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: '테스트 데이터',
        date: new Date(),
        content: '테스트 컨텐츠입니다. 어꿈희아리방오것환',
      })
    }, 5000)
  })

  return data
}

export const page: FunctionComponent<pageProps> = async ({
  className,
  ...props
}) => {
  const data = await serverSidePromise()
  return (
    <div className={cn('w-[500px] m-auto text-center', className)} {...props}>
      <h2 className="bg-red-600 text-xl">{data.title}</h2>
      <p className="bg-orange-500">{data.date.toLocaleString()}</p>
      <p className="flex min-h-[200px] items-center justify-center bg-yellow-400">
        {data.content}
      </p>
      <div className="flex min-h-[100px] flex-col items-center justify-center bg-green-200 p-5">
        <p>CSR 소켓</p>
        <CsrButton className="w-full" />
      </div>
    </div>
  )
}

export default page
