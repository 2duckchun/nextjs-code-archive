'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function ExternalAuthDonePage() {
  const searchParams = useSearchParams()
  const name = searchParams.get('name')
  const type = searchParams.get('type')

  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage({ type: 'DONE', name }, window.location.origin)
      window.close()
    }
  }, [name])

  if (type === 'FAIL') {
    return <div>인증 실패</div>
  }

  return <div>인증 성공</div>
}
