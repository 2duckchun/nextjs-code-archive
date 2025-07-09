import { createPortal } from 'react-dom'
import { TableCellResizer } from './table-cell-resizer'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useLexicalEditable } from '@lexical/react/useLexicalEditable'
import { ReactPortal } from 'react'

export default function TableCellResizerPlugin(): null | ReactPortal {
  const [editor] = useLexicalComposerContext()
  const isEditable = useLexicalEditable()
  console.log('isEditable', isEditable)
  if (typeof window === 'undefined' || !isEditable) return null
  return createPortal(<TableCellResizer editor={editor} />, document.body)
}
