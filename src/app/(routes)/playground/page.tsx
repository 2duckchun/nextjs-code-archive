import { cn } from '@/lib/utils'
import { FunctionComponent, HTMLAttributes, Suspense } from 'react'
import { SSRBox } from './ssrdiv'
import { CsrButton } from './CSRButton'

interface pageProps extends HTMLAttributes<HTMLDivElement> {}

export const page: FunctionComponent<pageProps> = async ({
  className,
  ...props
}) => {
  return (
    <div className={cn('w-[500px] m-auto text-center', className)} {...props}>
      {/* SSR 환경 */}
      <Suspense fallback={<div>interactive 없는 로딩화면...</div>}>
        <SSRBox lazyTime={4000} />
      </Suspense>
      <Suspense fallback={<div>interactive 없는 로딩화면...</div>}>
        <SSRBox lazyTime={3000} />
      </Suspense>
      <Suspense fallback={<div>interactive 없는 로딩화면...</div>}>
        <SSRBox lazyTime={2000} />
      </Suspense>
      <Suspense fallback={<div>interactive 없는 로딩화면...</div>}>
        <SSRBox lazyTime={1000} />
      </Suspense>
      <CsrButton />
    </div>
  )
}

export default page
