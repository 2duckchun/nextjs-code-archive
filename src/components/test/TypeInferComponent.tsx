import { ReactNode } from 'react'

type PropertyPath<
  T extends Record<string, unknown>,
  U extends 'recursive'[] = [],
> = U['length'] extends 10
  ? never
  : {
      [K in keyof T & string]: T[K] extends Record<string, unknown>
        ? K | `${K}.${PropertyPath<T[K], [...U, 'recursive']>}`
        : K
    }[keyof T & string]

type Path<T> = T extends Record<string, unknown> ? PropertyPath<T> : never

interface TypeComponentProps<T extends Record<string, unknown>> {
  obj: T
  properties: Path<T>
}

export const TypeInferComponent = <T extends Record<string, any>>({
  obj,
  properties,
}: TypeComponentProps<T>): ReactNode => {
  const split = properties.split('.')
  let value = { ...obj }
  for (const property of split) {
    value = value[property]
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return <div className="text-5xl font-semibold text-teal-500">{value}</div>
  }

  return <div>{String(value)}</div>
}
