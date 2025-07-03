'use client'
import { INSERT_IFRAME_COMMAND } from '../command/insert-iframe'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

const toPx = (value: string | null) =>
  value?.trim() ? value.trim() + 'px' : ''

export default function IframeInsertPlugin() {
  const [editor] = useLexicalComposerContext()

  const onClick = () => {
    const url = prompt('iframe URL을 입력하세요')
    if (!url || !/^https?:\/\//.test(url)) return
    const wRaw = prompt('너비(px) - 빈칸이면 100%', '')
    const hRaw = prompt('높이(px) - 빈칸이면 400', '')

    const width = wRaw ? toPx(wRaw) : '100%'
    const height = hRaw ? toPx(hRaw) : '400px'

    console.log(width, height)

    editor.dispatchCommand(INSERT_IFRAME_COMMAND, {
      src: url,
      width,
      height,
    })
  }

  return (
    <button onClick={onClick} className="rounded bg-gray-100 px-2 py-1 text-sm">
      Iframe
    </button>
  )
}
