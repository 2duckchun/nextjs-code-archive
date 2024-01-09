import { checkProcessData } from '@/constants/check-list'
import { assertValidSlug } from '@/lib/assertions'
import { CheckProcessData } from '@/types/app/check'
import { FunctionComponent } from 'react'

interface PageProps {
  params: {
    slug: string
  }
}

const getCheckProcessData = async (slug: string): Promise<CheckProcessData> => {
  return checkProcessData[assertValidSlug(slug)]
}

const Page: FunctionComponent<PageProps> = async ({ params: { slug } }) => {
  const checkProcessData = await getCheckProcessData(slug)

  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-24">
      <h1 className="text-lg font-bold">{checkProcessData.title}</h1>
      <p>{checkProcessData.introduce}</p>
    </main>
  )
}

export default Page
