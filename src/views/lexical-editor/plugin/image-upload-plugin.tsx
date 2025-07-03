// plugins/ImageUploadPlugin.tsx
'use client'

import { useRef, useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { INSERT_IMAGE_COMMAND } from '../command/insert-image'
import { ImageNode } from '../node/image-node'
import { $insertNodes } from 'lexical'

interface Props {
  /** S3 업로드 로직을 주입받음 */
  onImageUpload?: (file: File) => Promise<string>
}

export default function ImageUploadPlugin({ onImageUpload }: Props) {
  const [editor] = useLexicalComposerContext()
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    return editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      ({ src }) => {
        const imageNode = new ImageNode(src)
        $insertNodes([imageNode])
        return true
      },
      0, // Priority (Low=0)
    )
  }, [editor])

  /** ① 파일 선택창 열기 */
  const openFileDialog = () => {
    if (!inputRef.current) return
    inputRef.current.value = '' // 같은 파일 다시 선택 가능하도록 초기화
    inputRef.current.click()
  }

  /** ② 업로드 → 커맨드 디스패치 */ 4
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !onImageUpload) return

    try {
      const url = await onImageUpload(file) // S3 업로드
      editor.dispatchCommand(INSERT_IMAGE_COMMAND, { src: url })
    } catch (err) {
      console.error(err)
      alert('이미지 업로드에 실패했습니다.')
    }
  }

  return (
    <>
      <button
        onClick={openFileDialog}
        className="rounded bg-gray-100 px-2 py-1 text-sm"
      >
        Image
      </button>

      {/* 숨겨진 파일 입력 */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleChange}
      />
    </>
  )
}
