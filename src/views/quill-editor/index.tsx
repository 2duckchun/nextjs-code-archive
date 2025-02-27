'use client'

import { HTMLAttributes } from 'react'
import { cn } from '@/shared/lib/utils'
import { useQuillEditor } from './use-quill-editor'
import { QuillEditor } from '@/shared/ui/quill-editor'

interface QuillEditorViewProps {
  className?: string
}

export const QuillEditorView = ({
  className,
  ...props
}: QuillEditorViewProps & HTMLAttributes<HTMLDivElement>) => {
  const { value, setValue } = useQuillEditor()

  return (
    <div className={cn(className)} {...props}>
      <QuillEditor className="h-[500px]" value={value} setValue={setValue} />
    </div>
  )
}
