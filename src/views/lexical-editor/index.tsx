'use client'

import { $getRoot, $getSelection } from 'lexical'
import { useEffect } from 'react'

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

const theme = {}

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
    nodes: [ImageNode, IframeNode], // ← 필수! 커스텀 노드 목록
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
