import { cn } from '@/lib/utils'
import { FunctionComponent, HTMLAttributes } from 'react'
import { Button } from '@/components/ui/button'

interface PagenationBarProps extends HTMLAttributes<HTMLDivElement> {
  total: number
  limit: number
  page: number
  setPage: (page: number) => void
}

export const PaginationBar: FunctionComponent<PagenationBarProps> = ({
  className,
  total,
  limit,
  page,
  setPage,
  ...props
}) => {
  const numPages = Math.ceil(total / limit)

  return (
    <nav className={cn('bg-teal-300', className)} {...props}>
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </Button>
      {Array(numPages)
        .fill(0)
        .map((_, i) => (
          <Button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? 'page' : undefined}
          >
            {i + 1}
          </Button>
        ))}
      <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </Button>
    </nav>
  )
}
