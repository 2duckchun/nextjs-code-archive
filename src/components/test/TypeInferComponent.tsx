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

// type IsTuple<T extends ReadonlyArray<any>> = number extends T['length']
//   ? false
//   : true

// type TupleKeys<T extends ReadonlyArray<any>> = Exclude<keyof T, keyof any[]>

// type Primitive = null | undefined | string | number | boolean | symbol | bigint

// type BrowserNativeObject = Date | FileList | File

// type ArrayKey = number

// type AnyIsEqual<T1, T2> = T1 extends T2
//   ? IsEqual<T1, T2> extends true
//     ? true
//     : never
//   : never

// export type IsEqual<T1, T2> = T1 extends T2
//   ? (<G>() => G extends T1 ? 1 : 2) extends <G>() => G extends T2 ? 1 : 2
//     ? true
//     : false
//   : false

// type PathImpl<K extends string | number, V, TraversedTypes> = V extends
//   | Primitive
//   | BrowserNativeObject
//   ? `${K}`
//   : true extends AnyIsEqual<TraversedTypes, V>
//     ? `${K}`
//     : `${K}` | `${K}.${PathInternal<V, TraversedTypes | V>}`

// type PathInternal<T, TraversedTypes = T> = T extends ReadonlyArray<infer V>
//   ? IsTuple<T> extends true
//     ? {
//         [K in TupleKeys<T>]-?: PathImpl<K & string, T[K], TraversedTypes>
//       }[TupleKeys<T>]
//     : PathImpl<ArrayKey, V, TraversedTypes>
//   : {
//       [K in keyof T]-?: PathImpl<K & string, T[K], TraversedTypes>
//     }[keyof T]

// type Path<T> = T extends any ? PathInternal<T> : never
