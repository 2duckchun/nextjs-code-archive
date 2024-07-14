import { FunctionComponent } from 'react'
import ReactMarkdown from 'react-markdown'
import fs from 'fs'
import path from 'path'
import rehypeRaw from 'rehype-raw'

interface PageProps {}

const Page: FunctionComponent<PageProps> = async ({}) => {
  const filePath = path.join(
    process.cwd(),
    'post',
    '240617-개인정보처리방침.md',
  )
  const markdownsource = fs.readFileSync(filePath, 'utf-8')

  return (
    <ReactMarkdown className={'prose'} rehypePlugins={[rehypeRaw]}>
      {markdownsource}
    </ReactMarkdown>
  )
}

export default Page
