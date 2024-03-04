import { CheckSlugKey } from '@/types/app/check'

const isValidCheckSlug = (slug: string): slug is CheckSlugKey => {
  return ['test1', 'test2'].includes(slug)
}

export const assertValidSlug = (slug: string): CheckSlugKey => {
  if (!isValidCheckSlug(slug)) {
    throw new Error('Invalid slug')
  }
  return slug
}

export const assertNever = (x: never): never => {
  throw new Error('Unexpected object: ' + x)
}

export const assertValue = <T>(
  value: T | null | undefined,
  errorMessage?: string,
): T => {
  if (value === null || value === undefined) {
    throw new Error(errorMessage ?? 'value is null or undefined')
  }
  return value
}
