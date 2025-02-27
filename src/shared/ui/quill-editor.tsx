'use client'

import React from 'react'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { cn } from '@/shared/lib/utils'

interface QuillEditorProps {
  className?: string
  value: string
  setValue: (value: string) => void
}

export const QuillEditor = ({
  value,
  setValue,
  className,
}: QuillEditorProps) => {
  const modules = {
    toolbar: [
      [{ color: [] }, { background: [] }],
      // 다른 툴바 옵션들도 추가할 수 있습니다
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
  }
  const formats = ['color', 'background', 'bold', 'italic', 'underline', 'list']

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      className={cn(className)}
      modules={modules}
      formats={formats}
    />
  )
}
