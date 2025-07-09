'use client'

import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

export function DividerInsertButton() {
  const [editor] = useLexicalComposerContext()

  return (
    <button
      onClick={() =>
        editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined)
      }
      className="rounded bg-gray-100 px-2 py-1 text-sm"
    >
      Divider
    </button>
  )
}
