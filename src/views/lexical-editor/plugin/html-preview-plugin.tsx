// plugin/HtmlPreviewPlugin.tsx
'use client'

import { useState } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { $generateHtmlFromNodes } from '@lexical/html'

export default function HtmlPreviewPlugin() {
  const [editor] = useLexicalComposerContext()
  const [open, setOpen] = useState(false)
  const [html, setHtml] = useState('')

  /** 버튼 클릭 → HTML 생성 → 모달 오픈 */
  const showHtml = () => {
    editor.getEditorState().read(() => {
      const htmlString = $generateHtmlFromNodes(editor) // 공식 변환기
      setHtml(htmlString)
      setOpen(true)
    })
  }

  return (
    <>
      {/* 툴바 버튼 */}
      <Button onClick={showHtml} variant="outline" size="sm">
        View HTML
      </Button>

      {/* 모달 */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editor HTML Preview</DialogTitle>
          </DialogHeader>

          {/* 읽기 전용 textarea 스타일 */}
          <textarea
            readOnly
            value={html}
            className="h-[400px] w-full resize-none rounded bg-gray-100 p-2 font-mono text-xs"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
