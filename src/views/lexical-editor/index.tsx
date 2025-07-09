'use client'

import { TableNode, TableRowNode, TableCellNode } from '@lexical/table'
import ImageUploadPlugin from './plugin/image-upload-plugin'
import { ImageNode } from './node/image-node'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import ImageDropPastePlugin from './plugin/image-drop-paste-plugin'
import IframeInsertPlugin from './plugin/iframe-insert-plugin'
import IframeCommandPlugin from './plugin/iframe-command-plugin'
import { IframeNode } from './node/iframe-node'
import { FontSizePlugin } from './plugin/font-size-plugin'
import { AlignmentPlugin } from './plugin/alignment-plugin'
import { ColorPickerPlugin } from './plugin/font-color-plugin'
import { TablePlugin } from '@lexical/react/LexicalTablePlugin'
import TableInsertPlugin from './plugin/table-insert-plugin'
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode'
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin'
import { TableCellColorPlugin } from './plugin/table-cell-color-plugin'
import dynamic from 'next/dynamic'
import { DividerInsertButton } from './plugin/divider-insert-plugin'

const TableCellResizerPlugin = dynamic(
  () => import('./plugin/table-cell-resizer'),
  { ssr: false },
)

const theme = {
  table: 'table', // <table …>
  tableCell: 'tableCell', // <td>, <th>
  tableCellHeader: 'tableCellHeader',
  tableAddColumnsButton: '', // 필요 없으면 빈 문자열
  tableAddRowsButton: '',
}

function onError(error: Error) {
  console.error(error)
}

const onImageUpload = async (file: File) => {
  return 'https://cdn.pixabay.com/photo/2025/06/27/13/47/black-headed-grosbeak-9684040_1280.jpg'
}

export default function LexicalEditor() {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [
      ImageNode,
      IframeNode,
      TableNode,
      TableRowNode,
      TableCellNode,
      HorizontalRuleNode,
    ], // ← 필수! 커스텀 노드 목록
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="mb-2 flex gap-2">
        <ImageUploadPlugin onImageUpload={onImageUpload} />
        <ImageDropPastePlugin onImageUpload={onImageUpload} />
        <IframeInsertPlugin />
        <FontSizePlugin />
        <ColorPickerPlugin />
        <AlignmentPlugin />
        <TablePlugin hasCellBackgroundColor />
        <TableCellColorPlugin />
        <TableInsertPlugin />
        <TableCellResizerPlugin />
        <HorizontalRulePlugin />
        <DividerInsertButton />
      </div>
      <IframeCommandPlugin />
      <div className="relative max-h-[600px] min-h-[240px] overflow-y-auto p-4">
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="outline-none"
              aria-placeholder={'Enter some text...'}
              placeholder={
                <div className="pointer-events-none absolute left-4 top-4 select-none text-gray-500">
                  Enter some text...
                </div>
              }
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
      <HistoryPlugin />
      <AutoFocusPlugin />
    </LexicalComposer>
  )
}
