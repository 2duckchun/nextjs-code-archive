// plugin/TableInsertPlugin.tsx
'use client'

import { INSERT_TABLE_COMMAND } from '@lexical/table'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

export default function TableInsertPlugin() {
  const [editor] = useLexicalComposerContext()

  const insertTable = () => {
    const rows = parseInt(prompt('Rows?', '3') ?? '0', 10)
    const cols = parseInt(prompt('Cols?', '3') ?? '0', 10)
    if (!rows || !cols) return
    editor.dispatchCommand(INSERT_TABLE_COMMAND, {
      rows: String(rows),
      columns: String(cols),
      includeHeaders: false,
    })
  }

  return (
    <button
      onClick={insertTable}
      className="rounded bg-gray-100 px-2 py-1 text-sm"
    >
      Table
    </button>
  )
}
