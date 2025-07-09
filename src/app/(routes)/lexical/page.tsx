'use client'

import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const LexicalNewEditorNoSSR = dynamic(() => import('@/views/lexical-editor'), {
  ssr: false,
})

export default function LexicalPage() {
  const [html, setHtml] = useState<string>('')

  const onSubmit = () => {
    console.log(html)
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-purple-300">
      <div className="w-[1000px] border bg-white">
        <LexicalNewEditorNoSSR initialHTML={data} onHtmlChange={setHtml} />
      </div>
      <Button
        className="mt-4 rounded bg-blue-500 px-3 py-1 text-white"
        onClick={onSubmit}
      >
        Log
      </Button>
    </div>
  )
}

const data =
  '<p style="text-align: left;"><iframe src="https://smore.im/quiz/DvYFp07Lll" width="200px" height="400px" frameborder="0" allowfullscreen="true" class="rounded-md"></iframe><img src="https://cdn.pixabay.com/photo/2025/06/27/13/47/black-headed-grosbeak-9684040_1280.jpg" data-lexical-image="true" style="width: 499px; height: 198px;"></p><p style="text-align: center;"><br></p><p style="text-align: left;"><span style="white-space: pre-wrap;">ㅁㅇㄴㄹㅇ</span></p><hr><p style="text-align: left;"><br></p><table class="table"><colgroup><col style="width: 92px;"><col style="width: 92px;"><col style="width: 92px;"></colgroup><tbody><tr><td class="tableCell" style="width: 75px; border: 1px solid black; vertical-align: top; text-align: start;"><p style="text-align: start;"><br></p></td><td class="tableCell" style="width: 75px; border: 1px solid black; vertical-align: top; text-align: start;"><p style="text-align: start;"><br></p></td><td class="tableCell" style="width: 75px; border: 1px solid black; vertical-align: top; text-align: start;"><p style="text-align: start;"><br></p></td></tr><tr><td class="tableCell" style="width: 75px; border: 1px solid black; vertical-align: top; text-align: start;"><p style="text-align: start;"><br></p></td><td class="tableCell" style="width: 75px; border: 1px solid black; vertical-align: top; text-align: start;"><p style="text-align: start;"><br></p></td><td class="tableCell" style="width: 75px; border: 1px solid black; vertical-align: top; text-align: start;"><p style="text-align: start;"><br></p></td></tr></tbody></table><p style="text-align: left;"><br></p>'
