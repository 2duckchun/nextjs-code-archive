import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { FORMAT_ELEMENT_COMMAND } from 'lexical'

import { Button } from '@/components/ui/button'

import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  LucideIcon,
} from 'lucide-react'

type AlignType = 'left' | 'center' | 'right' | 'justify'

const ALIGN_ICONS: Record<AlignType, LucideIcon> = {
  left: AlignLeft,
  center: AlignCenter,
  right: AlignRight,
  justify: AlignJustify,
}

export function AlignmentPlugin() {
  const [editor] = useLexicalComposerContext()
  const aligns: AlignType[] = ['left', 'center', 'right', 'justify']

  return (
    <div className="flex gap-1">
      {aligns.map((align) => {
        const Icon = ALIGN_ICONS[align]
        return (
          <Button
            key={align}
            size="icon"
            variant="outline"
            title={align} // 접근성
            onMouseDown={(e) => e.preventDefault()} // 포커스 유지
            onClick={() =>
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, align)
            }
          >
            <Icon className="h-4 w-4" />
          </Button>
        )
      })}
    </div>
  )
}
