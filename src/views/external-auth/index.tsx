'use client'

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { useEffect, useState } from 'react'

export const ExternalAuthView = () => {
  const [info, setInfo] = useState({
    name: '',
    phone: '',
  })

  const handleExternalAuth = () => {
    const newWindow = openExternalAuthWindow()
    if (!newWindow) {
      return alert('인증 창 열기에 실패했습니다.')
    }
    sendAuthInfo(newWindow, info.name, info.phone)
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      if (event.data?.type !== 'DONE') return
      console.log(event.data)
      alert('인증 성공')
    }
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <div>
      <h1>External Auth</h1>
      <div>
        <Input
          type="text"
          placeholder="이름"
          value={info.name}
          onChange={(e) => setInfo({ ...info, name: e.target.value })}
        />
        <Input
          type="text"
          placeholder="전화번호"
          value={info.phone}
          onChange={(e) => setInfo({ ...info, phone: e.target.value })}
        />
        <Button
          disabled={!info.name || !info.phone}
          onClick={handleExternalAuth}
        >
          외부 본인 인증 수행
        </Button>
      </div>
    </div>
  )
}

const openExternalAuthWindow = () => {
  const newWindow = window.open(
    '/external-auth/progress',
    '_blank',
    'width=600,height=600',
  )
  return newWindow
}

const sendAuthInfo = (targetWindow: Window, name: string, phone: string) => {
  const handleReadyMessage = (event: MessageEvent) => {
    if (event.origin !== window.location.origin) return
    if (event.source !== targetWindow) return
    if (event.data?.type !== 'READY') return
    targetWindow.postMessage(
      {
        type: 'PROGRESS',
        name,
        phone,
      },
      window.location.origin,
    )
    window.removeEventListener('message', handleReadyMessage)
  }
  window.addEventListener('message', handleReadyMessage)
}
