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
