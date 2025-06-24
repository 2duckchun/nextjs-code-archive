'use client'

import { RefCallback, useEffect, useRef, useState } from 'react'

type UseInViewOptions = {
  root?: Element | null
  rootMargin?: string
  threshold?: number
}

export const useInView = (
  options: UseInViewOptions,
): {
  ref: RefCallback<Element>
  inView: boolean
} => {
  const [inView, setInView] = useState(false)
  const observer = useRef<IntersectionObserver>(null)
  const elementRef = useRef<Element | null>(null)

  const setRef: RefCallback<Element> = (node) => {
    if (elementRef.current) {
      observer.current?.unobserve(elementRef.current)
    }

    if (node) {
      elementRef.current = node
      observer.current?.observe(node)
    }
  }

  useEffect(() => {
    observer.current = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      {
        root: options.root ?? null,
        rootMargin: options.rootMargin ?? '0px',
        threshold: options.threshold ?? 0,
      },
    )

    if (elementRef.current) {
      observer.current.observe(elementRef.current)
    }

    return () => observer.current?.disconnect()
  }, [options.root, options.rootMargin, options.threshold])

  return { ref: setRef, inView }
}
