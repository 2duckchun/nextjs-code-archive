'use client'

import React, { useState } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getSelection, $isNodeSelection } from 'lexical'
import { TableCellNode } from '@lexical/table'

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { PaintBucket } from 'lucide-react'

/* ─ 컬러 팔레트 (원본과 동일) ─────────────────────────────── */
const COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'Red', value: '#e60000' },
  { name: 'Orange', value: '#ff7f00' },
  { name: 'Yellow', value: '#ffff00' },
  { name: 'Chartreuse', value: '#7fff00' },
  { name: 'Green', value: '#00cc00' },
  { name: 'Spring', value: '#00ff7f' },
  { name: 'Cyan', value: '#00ffff' },
  { name: 'Azure', value: '#007fff' },
  { name: 'Blue', value: '#0000e6' },
  { name: 'Violet', value: '#7f00ff' },
  { name: 'Purple', value: '#cc00cc' },
  { name: 'Magenta', value: '#ff00ff' },
  { name: 'Rose', value: '#ff007f' },
  { name: 'Brown', value: '#8b4513' },
  { name: 'Tan', value: '#d2b48c' },
  { name: 'Olive', value: '#808000' },
  { name: 'Maroon', value: '#800000' },
  { name: 'Navy', value: '#000080' },
  { name: 'Grey', value: '#808080' },
]

/* ─ 테이블 셀 배경색 플러그인 ─────────────────────────────── */
export function TableCellColorPlugin() {
  const [editor] = useLexicalComposerContext()
  const [open, setOpen] = useState(false)

  /** 선택된 셀(NodeSelection) 전체에 배경색 적용 */
  const applyCellBgColor = (color: string) => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isNodeSelection(selection)) {
        selection.getNodes().forEach((node) => {
          if (node instanceof TableCellNode) {
            node.setBackgroundColor(color) // 셀 배경색 변경
          }
        })
      }
    })
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="outline">
          <PaintBucket className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-52 p-2" sideOffset={4}>
        <div className="grid grid-cols-5 gap-1">
          {COLORS.map(({ name, value }) => (
            <button
              key={value}
              title={name}
              style={{ backgroundColor: value }}
              className="h-6 w-6 rounded border"
              /* preventDefault로 에디터 포커스 유지 */
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => applyCellBgColor(value)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
