import { assertValue } from '@/lib/assertions'

export const APP_ENV = {
  JSON_PLACEHOLDER_API: assertValue(
    process.env.JSON_PLACEHOLDER_API,
    'JSON_PLACEHOLDER_API is not defined in .env',
  ),
}
