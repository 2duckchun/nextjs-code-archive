'use client'

import { FunctionComponent, HTMLAttributes } from 'react'
import { PaginationBar } from '@/components/pagination/PaginationBar'
import { usePaginationContext } from '@/context/use-pagination-context'
import { cn } from '@/lib/utils'

interface DesktopProps extends HTMLAttributes<HTMLDivElement> {}

export const Desktop: FunctionComponent<DesktopProps> = ({
  className,
  ...props
}) => {
  const { lists, limit, offset, page, setLimitPerPage, setPageNumber } =
    usePaginationContext<Post>()

  return (
    <div className={cn('m-auto w-full py-5', className)} {...props}>
      <h2 className="text-center text-[20px]">MOCK JSON WORLD</h2>
      <label>
        페이지 당 표시할 게시물 수:&nbsp;
        <select
          typeof="number"
          value={limit}
          onChange={({ target: { value } }) => setLimitPerPage(Number(value))}
        >
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </label>
      {lists.slice(offset, offset + limit).map(({ id, title, body }) => (
        <article key={id}>
          <h3>
            {id}. {title}
          </h3>
          <p>{body}</p>
        </article>
      ))}
      <PaginationBar
        total={lists.length}
        limit={limit}
        page={page}
        setPage={setPageNumber}
      />
    </div>
  )
}
