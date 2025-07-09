import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection'
import { $getNodeByKey } from 'lexical'
import { useRef } from 'react'
import { ImageNode } from '../node/image-node'

export default function ResizableImage({
  src,
  width,
  height,
  nodeKey,
}: {
  src: string
  width: number | 'auto'
  height: number | 'auto'
  nodeKey: string
}) {
  const [editor] = useLexicalComposerContext()
  const [selected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey)
  const imgRef = useRef<HTMLImageElement>(null)

  const onClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    editor.update(() => {
      // ② Lexical 트랜잭션 안에서 selection 갱신
      if (e.shiftKey) {
        setSelected(!selected) // 멀티 선택
      } else {
        clearSelection()
        setSelected(true) // 단일 선택
      }
    })
  }

  const startResize = (
    eDown: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    eDown.preventDefault()
    const startX = eDown.clientX
    const startY = eDown.clientY
    const startW = imgRef.current?.offsetWidth ?? 0
    const startH = imgRef.current?.offsetHeight ?? 0

    const onMove = (eMove: MouseEvent) => {
      const nextW = Math.max(40, startW + (eMove.clientX - startX))
      const nextH = Math.max(40, startH + (eMove.clientY - startY))
      /* ②-A Lexical 상태 업데이트 */
      editor.update(
        () => {
          const node = $getNodeByKey(nodeKey) as ImageNode
          node?.setSize(nextW, nextH)
        },
        {
          // 이벤트 과도하게 쌓이는 것 방지
          discrete: true,
        },
      )
    }
    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  return (
    <span className="relative inline-block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt="uploaded"
        style={{ width, height }}
        onClick={onClick}
        className={`${selected && 'border-2 border-dashed border-black'}`}
        draggable={false}
      />
      {/* ▶︎ 선택 중이면 리사이즈 핸들 노출 */}
      {selected && (
        <>
          {/* 오른쪽-아래 모서리 핸들 */}
          <span
            onMouseDown={startResize}
            className="absolute bottom-0 right-0 h-3 w-3 cursor-se-resize rounded-sm bg-blue-500"
          />
          {/* 필요하다면 다른 모서리·변형 핸들도 추가 */}
        </>
      )}
    </span>
  )
}
