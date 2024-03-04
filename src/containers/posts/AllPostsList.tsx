'use client'

import { PagenationBar } from '@/components/pagenation/PagenationBar'
import { cn } from '@/lib/utils'
import { FunctionComponent, HTMLAttributes, useState } from 'react'

interface AllPostsListProps extends HTMLAttributes<HTMLDivElement> {
  posts: Post[]
}

export const AllPostsList: FunctionComponent<AllPostsListProps> = ({
  className,
  posts,
  ...props
}) => {
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const offset = (page - 1) * limit

  return (
    <div className={cn(className)} {...props}>
      <label>
        페이지 당 표시할 게시물 수:&nbsp;
        <select
          typeof="number"
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </label>

      {posts.slice(offset, offset + limit).map(({ id, title, body }) => (
        <article key={id}>
          <h3>
            {id}. {title}
          </h3>
          <p>{body}</p>
        </article>
      ))}
      <PagenationBar
        total={posts.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </div>
  )
}
