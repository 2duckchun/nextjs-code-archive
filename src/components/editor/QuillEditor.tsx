'use client'

import { cn } from '@/lib/utils'
import 'react-quill/dist/quill.snow.css'
import { FunctionComponent, HTMLAttributes } from 'react'
import dynamic from 'next/dynamic'

const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {
  ssr: false,
})

interface QuillEditorProps extends HTMLAttributes<HTMLDivElement> {
  value: string | undefined
  setValue: any
}

export const QuillEditor: FunctionComponent<QuillEditorProps> = ({
  className,
  value,
  setValue,
  ...props
}) => {
  return (
    <div className={cn(className)} {...props}>
      <QuillNoSSRWrapper theme="snow" value={value} onChange={setValue} />
    </div>
  )
}
