import axiosInstance from './core/instance'
import { ZodSchema } from 'zod'
export const handleActions = async <T>({
  method,
  url,
  requestBody,
  schema,
}: {
  method: 'get' | 'post' | 'put' | 'delete'
  url: string
  requestBody?: any
  schema: ZodSchema<T>
}) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data: requestBody,
    })
    const zodResult = schema.safeParse(response.data)
    if (!zodResult.success) {
      return {
        status: ACTION_STATUS.INVALID_DATA,
        message: '유효하지 않은 값입니다.',
      } as const
    }
    return {
      status: ACTION_STATUS.SUCCESS,
      message: '성공',
      data: zodResult.data,
    } as const
  } catch (error) {
    return {
      status: ACTION_STATUS.SERVER_ERROR,
      message: '서버 오류가 발생했습니다.',
    } as const
  }
}

export const ACTION_STATUS = {
  SUCCESS: 'SUCCESS',
  SERVER_ERROR: 'SERVER_ERROR',
  INVALID_DATA: 'INVALID_DATA',
} as const
