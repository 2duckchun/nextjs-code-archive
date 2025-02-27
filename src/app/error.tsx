'use client' // Error components must be Client Components

import { Button } from '@/shared/ui/button'
import { useEffect, useState } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [errorMessage, setErrorMessage] = useState('알 수 없는 에러입니다.')

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
    setErrorMessage(error.message)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <h2>Something went wrong!</h2>
      <p>에러 바운더리에 걸려뿌쓰요.</p>
      <p className="font-bold">에러 메세지 : {errorMessage}</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}
