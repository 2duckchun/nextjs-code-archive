'use client'

type AuthInfo = {
  name: string
  phone: string
  type: 'PROGRESS'
}

import { useEffect, useRef, useState } from 'react'

export default function ExternalAuthProgressPage() {
  const [authResult, setAuthResult] = useState<AuthInfo>({
    name: '',
    phone: '',
    type: 'PROGRESS',
  })
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage({ type: 'READY' }, window.location.origin)
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return
      }
      if (event.data?.type === 'PROGRESS') {
        setAuthResult(event.data)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  useEffect(() => {
    if (authResult) {
      formRef.current?.submit()
    }
  }, [authResult])

  return (
    <div>
      <form
        ref={formRef}
        method="POST"
        action="/api/external-auth/progress"
        className="hidden"
      >
        <input type="hidden" name="name" value={authResult?.name} />
        <input type="hidden" name="phone" value={authResult?.phone} />
        <input type="hidden" name="type" value={authResult?.type} />
      </form>
    </div>
  )
}
