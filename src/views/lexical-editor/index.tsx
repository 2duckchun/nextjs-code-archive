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
    nodes: [ImageNode], // ← 필수! 커스텀 노드 목록
  }

  return (
    <div className="flex h-[90%] w-full flex-col">
      <LexicalComposer initialConfig={initialConfig}>
        <div className="mb-2 flex gap-2">
          <ImageUploadPlugin onImageUpload={onImageUpload} />
          <ImageDropPastePlugin onImageUpload={onImageUpload} />
        </div>
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="h-full w-full"
              aria-placeholder={'Enter some text...'}
              placeholder={<div>Enter some text...</div>}
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
      </LexicalComposer>
    </div>
  )
}
