import { cn } from '@/lib/utils'
import { FunctionComponent, HTMLAttributes } from 'react'

interface ssrdivProps extends HTMLAttributes<HTMLDivElement> {
  lazyTime: number
}

const serverSidePromise = async (
  lazyTime: number,
): Promise<{ title: string; dir: string }> => {
  const data: { title: string; dir: string } = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: `로딩완료(${lazyTime}ms)`,
        dir: `작업 폴더 (SSR 인증): ${process.cwd().slice(-28)}`,
      })
    }, lazyTime)
  })

  return data
}

export const SSRBox: FunctionComponent<ssrdivProps> = async ({
  className,
  lazyTime,
  ...props
}) => {
  const data = await serverSidePromise(lazyTime)
  return (
    <div
      className={cn(
        'my-5 w-full h-auto py-3 flex flex-col items-center justify-center gap-2 bg-orange-300',
        className,
      )}
    >
      <p>{data.title}</p>
      <p>{data.dir}</p>
    </div>
  )
}
