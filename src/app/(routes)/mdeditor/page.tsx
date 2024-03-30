'use client'

import { QuillEditor } from '@/components/editor/QuillEditor'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FunctionComponent, HTMLAttributes, useState } from 'react'

interface pageProps extends HTMLAttributes<HTMLDivElement> {}

export const Page: FunctionComponent<pageProps> = ({ className }) => {
  const [value, setValue] = useState<string | undefined>('')
  return (
    <div className={cn(className)}>
      <QuillEditor value={value} setValue={setValue} />
      <Button onClick={() => console.log(value)}>Log value</Button>
    </div>
  )
}

export default Page
