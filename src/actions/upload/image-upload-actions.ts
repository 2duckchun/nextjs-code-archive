'use server'

export async function uploadImage(formData: FormData) {
  const file = formData.get('file') as File
  console.log('server action', file)

  const result = await fetch('http://localhost:3400/api/upload', {
    method: 'POST',
    body: formData,
  })

  const data = await result.json()

  if (!result.ok) {
    return {
      success: false,
      error: data.error,
    }
  } else {
    return {
      success: true,
    }
  }
}
