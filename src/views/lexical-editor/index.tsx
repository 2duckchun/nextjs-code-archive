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
import dynamic from 'next/dynamic'
import { DividerInsertButton } from './plugin/divider-insert-plugin'
import HtmlPreviewPlugin from './plugin/html-preview-plugin'
import { $getRoot, EditorState } from 'lexical'
import type { LexicalEditor } from 'lexical'
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

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

export type SerializedState = ReturnType<EditorState['toJSON']>

interface Props {
  initialHTML?: string | null
  onHtmlChange?: (html: string) => void // 🔹 단일 콜백
}

export default function LexicalNewEditor({ initialHTML, onHtmlChange }: Props) {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    editorState: initialHTML
      ? (editor: LexicalEditor) => {
          const dom = new DOMParser().parseFromString(initialHTML, 'text/html')
          editor.update(() => {
            const nodes = $generateNodesFromDOM(editor, dom)
            const root = $getRoot()
            root.clear()
            root.append(...nodes)
          })
        }
      : undefined,
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

  /* ===== 3. 편집 이벤트마다 HTML 직렬화 ===== */
  const handleChange = (state: EditorState, editor: LexicalEditor) => {
    if (!onHtmlChange) return
    const html = state.read(() => $generateHtmlFromNodes(editor, null))
    onHtmlChange(html)
  }

  function InitialHtmlPlugin() {
    const [editor] = useLexicalComposerContext()
    useEffect(() => {
      if (!onHtmlChange) return
      editor.getEditorState().read(() => {
        onHtmlChange($generateHtmlFromNodes(editor, null))
      })
    }, [editor])
    return null
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
        <TableInsertPlugin />
        <TableCellResizerPlugin />
        <HorizontalRulePlugin />
        <HtmlPreviewPlugin />
        <DividerInsertButton />
      </div>
      <IframeCommandPlugin />
      <div className="relative max-h-[600px] min-h-[240px] overflow-y-auto p-4">
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="min-h-[240px] outline-none"
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
      <OnChangePlugin onChange={handleChange} />
      <InitialHtmlPlugin />
      <AutoFocusPlugin />
    </LexicalComposer>
  )
}
