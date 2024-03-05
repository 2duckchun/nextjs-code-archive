'use client'

import { Context, createContext, useContext, useState } from 'react'

type PaginationContext<T> = {
  limit: number
  page: number
  offset: number
  setLimitPerPage: (limit: number) => void
  setPageNumber: (page: number) => void
  lists: Array<T>
}

const PaginationContext = createContext<PaginationContext<any> | null>(null)

export const usePaginationContext = <T extends {}>() => {
  const context = useContext(PaginationContext as Context<PaginationContext<T>>)
  if (!context) {
    throw new Error(
      'usePaginationContext must be used within a PaginationContextProvider',
    )
  }
  return context
}

export const PaginationContextProvider = <T extends {}>({
  children,
  lists,
}: {
  children: React.ReactNode
  lists: T[]
}) => {
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const offset = (page - 1) * limit
  const setLimitPerPage = (limit: number) => setLimit(limit)
  const setPageNumber = (page: number) => setPage(page)

  return (
    <PaginationContext.Provider
      value={{ lists, limit, page, offset, setLimitPerPage, setPageNumber }}
    >
      {children}
    </PaginationContext.Provider>
  )
}
