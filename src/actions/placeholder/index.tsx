'use server'

import { handleActions } from '@/shared/lib/axios/handle-actions'
import { z } from 'zod'

const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  userId: z.number(),
})

export const getPosts = async () => {
  const response = await handleActions({
    method: 'get',
    url: '/posts',
    schema: z.array(postSchema),
  })

  return response
}
