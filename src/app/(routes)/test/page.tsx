import { TypeInferComponent } from '@/components/test/TypeInferComponent'
import { FunctionComponent } from 'react'

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
  return (
    <main>
      <TypeInferComponent
        obj={{
          name: '2DC',
          age: 30,
          address: {
            street: '123 Main St',
            city: 'Anytown',
            state: 'AS',
            zip: 12345,
            another: {
              one: {
                bite: {
                  the: {
                    dust: 'queen',
                  },
                },
              },
            },
          },
        }}
        properties="address.another.one.bite.the.dust"
      />
    </main>
  )
}

export default Page
