import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const name = formData.get('name')
  const phone = formData.get('phone')
  const type = formData.get('type')

  const url = new URL(request.url)
  const baseUrl = url.origin

  try {
    // 인증 로직...
    return Response.redirect(
      `${baseUrl}/external-auth/done?name=${name}&type=DONE`,
    )
  } catch (error) {
    return Response.redirect(
      `${baseUrl}/external-auth/done?name=${name}&type=FAIL`,
    )
  }
}
