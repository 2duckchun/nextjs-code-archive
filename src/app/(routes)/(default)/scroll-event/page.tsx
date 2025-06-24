'use client'

import { useEffect, useRef } from 'react'

export default function ScrollPage() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = el
      const buffer = 4
      const reachedBottom = scrollTop + clientHeight >= scrollHeight - buffer
      console.log(scrollTop, clientHeight, scrollHeight)
      console.log(reachedBottom)
    }

    el.addEventListener('scroll', handleScroll)

    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div>
      <div ref={ref} className="h-[600px] overflow-y-auto bg-teal-500">
        <div className="h-[500px] bg-red-500"></div>
        <div className="h-[500px] bg-orange-500"></div>
        <div className="h-[500px] bg-yellow-500"></div>
        <div className="h-[500px] bg-green-500"></div>
      </div>
    </div>
  )
}
