import { CheckMainAction } from '@/containers/check/main/CheckMainAction'
import { slugIntro } from '@/constants/check-list'
import { assertValidSlug } from '@/lib/assertions'
import { CheckProcessData, SelectedSlugIntro } from '@/types/app/check'
import { FunctionComponent } from 'react'

interface PageProps {
  params: {
    slug: string
  }
}

const getCheckProcessData = async (
  slug: string,
): Promise<SelectedSlugIntro> => {
  return slugIntro[assertValidSlug(slug)]
}

const Page: FunctionComponent<PageProps> = async ({ params: { slug } }) => {
  const checkIntroData = await getCheckProcessData(slug)

  return (
    <main className="m-auto flex min-h-screen w-[500px] flex-col items-center gap-5 p-24">
      <h1 className="text-lg font-bold">{checkIntroData.title}</h1>
      <p>{checkIntroData.introduce}</p>
      <CheckMainAction slug={slug} />
    </main>
  )
}

export default Page
