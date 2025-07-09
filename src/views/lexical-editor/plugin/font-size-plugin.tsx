// plugins/FontSizePlugin.tsx
'use client'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getSelection, $isRangeSelection } from 'lexical'
import { $patchStyleText } from '@lexical/selection'

export function FontSizePlugin() {
  const [editor] = useLexicalComposerContext()

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value + 'px'
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, { 'font-size': size })
      }
    })
  }

  return (
    <select defaultValue="16" onChange={onChange}>
      {[12, 14, 16, 18, 20, 24, 32].map((s) => (
        <option key={s} value={s}>
          {s}px
        </option>
      ))}
    </select>
  )
}
