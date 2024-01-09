export type CheckSlugKey = 'test1' | 'test2'

export type CheckQuestion = {
  type: 'single' | 'select'
  title: string
  options: Option[]
}

export type CheckProcessData = {
  title: string
  introduce: string
  questions: CheckQuestion[]
}

export type Option = {
  label: string
  value: number
}

export type ValueFromOption = Option['value']
