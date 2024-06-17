import { FunctionComponent } from 'react'
import { MDXRemote, compileMDX } from 'next-mdx-remote/rsc'
import fs from 'fs'
import path from 'path'

interface PageProps {}

const Page: FunctionComponent<PageProps> = async ({}) => {
  const filePath = path.join(process.cwd(), 'post', 'post01.md')
  const markdownsource = fs.readFileSync(filePath, 'utf-8')
  const { content, frontmatter } = await compileMDX({
    source: markdownsource,
    components: {
      h1: ({ children }) => <div className="text-red-400">{children}</div>,
      Hello: ({ children }) => <div className="text-blue-400">{children}</div>,
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
    },
  })
  // console.log(markdownsource)
  console.log(frontmatter)
  return (
    <main>
      {content}
      {/* <MDXRemote
        source={markdownsource}
        options={{
          parseFrontmatter: true,
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
          },
        }}
      /> */}
    </main>
  )
}

export default Page
