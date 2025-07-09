'use client'

import { useCallback, useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

import { COMMAND_PRIORITY_LOW } from 'lexical'
import { DRAG_DROP_PASTE } from '@lexical/rich-text' // ✅ 핵심
import { isMimeType } from '@lexical/utils' // 유틸
import { INSERT_IMAGE_COMMAND } from '../command/insert-image'

interface Props {
  onImageUpload?: (file: File) => Promise<string>
}

export default function ImageDropPastePlugin({ onImageUpload }: Props) {
  const [editor] = useLexicalComposerContext()

  /** 비동기 업로드 + 노드 삽입 */
  const uploadAndInsert = useCallback(
    async (file: File) => {
      if (!onImageUpload) return
      const url = await onImageUpload(file)
      editor.dispatchCommand(INSERT_IMAGE_COMMAND, { src: url })
    },
    [editor, onImageUpload],
  )

  useEffect(() => {
    /* DRAG & DROP + Paste 한 번에 처리 */
    return editor.registerCommand(
      DRAG_DROP_PASTE,
      (files: FileList) => {
        Array.from(files).forEach((file) => {
          if (isMimeType(file, ['image/'])) {
            void uploadAndInsert(file)
          }
        })
        return true // 동기 리턴
      },
      COMMAND_PRIORITY_LOW,
    )
  }, [editor, onImageUpload, uploadAndInsert])

  return null
}
