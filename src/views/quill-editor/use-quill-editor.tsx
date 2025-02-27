'use client'

import { useState } from 'react'

export const useQuillEditor = () => {
  const [value, setValue] = useState('')

  return { value, setValue }
}
