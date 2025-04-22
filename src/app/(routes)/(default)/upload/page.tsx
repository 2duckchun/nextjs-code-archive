'use client'

import { uploadImage } from '@/actions/upload/image-upload-actions'
import { Button } from '@/shared/ui/button'
import { useRef } from 'react'

export default function UploadPage() {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    const result = await uploadImage(formData)
    console.log(result)
  }

  return (
    <div>
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleChange}
      />
      <Button onClick={handleClick}>Upload</Button>
    </div>
  )
}
