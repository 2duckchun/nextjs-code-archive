'use client'
import { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  $createNodeSelection,
  $setSelection,
  $getNearestNodeFromDOMNode,
} from 'lexical'

export default function ImageClickSelectPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand(
      CLICK_COMMAND,
      (event: MouseEvent) => {
        const target = event.target as HTMLElement
        if (target.tagName !== 'IMG') return false

        /* 1) IMG DOM → 가장 가까운 Lexical 노드 얻기 */
        let node = null
        editor.getEditorState().read(() => {
          node = $getNearestNodeFromDOMNode(target)
        })
        if (!node) return false

        /* 2) 기본 RangeSelection 막기 */
        event.preventDefault()
        event.stopPropagation()

        /* 3) NodeSelection 설정 */
        editor.update(() => {
          const selection = $createNodeSelection()
          selection.add(node!.getKey())
          $setSelection(selection)
        })
        return true
      },
      COMMAND_PRIORITY_LOW,
    )
  }, [editor])

  return null
}
