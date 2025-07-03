import LexicalEditor from '@/views/lexical-editor'

export default function LexicalPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-purple-300">
      <div className="w-[1000px] border bg-white">
        <LexicalEditor />
      </div>
    </div>
  )
}
