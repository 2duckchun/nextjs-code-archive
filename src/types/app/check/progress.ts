import { slugIntro } from '@/constants/check-list'

type KeyOfObject<T> = keyof T
export type CheckSlugKey = KeyOfObject<typeof slugIntro>

export type SelectedSlugIntro = (typeof slugIntro)[CheckSlugKey]

export type CheckQuestion = {
  type: 'single' | 'select'
  title: string
  options: Option[]
}

export type CheckProcessData = {
  title: string
  introduce: string[]
  questions: CheckQuestion[]
}

export type Option = {
  label: string
  value: number
}

export type ValueFromOption = Option['value']
