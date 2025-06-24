'use client'

import { useEffect } from 'react'
import { useInView } from './hook/use-in-view'

export default function ScrollObserverPage() {
  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  useEffect(() => {
    if (inView) {
      console.log('바닥 보인다')
    }
  }, [inView])

  return (
    <div>
      <div className="h-[600px] overflow-y-auto bg-teal-500">
        <div className="h-[500px] bg-red-500"></div>
        <div className="h-[500px] bg-orange-500"></div>
        <div className="h-[500px] bg-yellow-500"></div>
        <div className="h-[500px] bg-green-500"></div>
        <div ref={ref} className="h-[50px]">
          나는바닥이야
        </div>
      </div>
    </div>
  )
}
