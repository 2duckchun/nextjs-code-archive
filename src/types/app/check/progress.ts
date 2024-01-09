export type CheckSlugKey = 'test1' | 'test2'

export type CheckQuestion = {
  type: 'single' | 'select'
  title: string
  options: {
    label: string
    value: number
  }[]
}

export type CheckProcessData = {
  title: string
  introduce: string
  questions: CheckQuestion[]
}
