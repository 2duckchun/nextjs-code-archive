import { cn } from '@/shared/lib/utils'
import { FunctionComponent } from 'react'

interface PageProps {}

const Page: FunctionComponent<PageProps> = ({}) => {
  return (
    <div className="font-dunggeunmo">
      <CodeArchiveText className="m-auto flex h-[100px] w-full items-center justify-center px-5 md:gap-4" />
    </div>
  )
}

export default Page

const CodeArchiveText = ({ className }: { className: string }) => {
  return (
    <div className={cn('', className)}>
      <span className="relative inline-block animate-bounce-bounce text-[50px] text-shadow-bounce animation-delay-[100ms]">
        C
      </span>
      <span className="relative inline-block animate-bounce-bounce text-[50px] text-shadow-bounce animation-delay-[200ms]">
        O
      </span>
      <span className="relative inline-block animate-bounce-bounce text-[50px] text-shadow-bounce animation-delay-[300ms]">
        D
      </span>
      <span className="relative inline-block animate-bounce-bounce text-[50px] text-shadow-bounce animation-delay-[400ms]">
        E
      </span>
      <span className="relative inline-block animate-bounce-bounce text-[50px] text-shadow-bounce animation-delay-[500ms]">
        _
      </span>
      <span className="relative inline-block animate-bounce-bounce text-[50px] text-shadow-bounce animation-delay-[600ms]">
        A
      </span>
      <span className="relative inline-block animate-bounce-bounce text-[50px] text-shadow-bounce animation-delay-[700ms]">
        R
      </span>
      <span className="relative inline-block animate-bounce-bounce text-[50px] text-shadow-bounce animation-delay-[800ms]">
        C
      </span>
      <span className="relative inline-block animate-bounce-bounce text-[50px] text-shadow-bounce animation-delay-[900ms]">
        H
      </span>
      <span className="relative inline-block animate-bounce-bounce text-[50px] text-shadow-bounce animation-delay-[1000ms]">
        i
      </span>
      <span className="relative inline-block animate-bounce-bounce text-[50px] text-shadow-bounce animation-delay-[1100ms]">
        V
      </span>
      <span className="relative inline-block animate-bounce-bounce text-[50px] text-shadow-bounce animation-delay-[1200ms]">
        E
      </span>
    </div>
  )
}
