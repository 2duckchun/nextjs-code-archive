import { CheckMainAction } from '@/containers/check/main/CheckMainAction'
import { slugIntro } from '@/constants/check-list'
import { assertValidSlug } from '@/lib/assertions'
import { SelectedSlugIntro } from '@/types/app/check'
import { FunctionComponent } from 'react'

interface CheckMainSlugPageProps {
  params: {
    slug: string
  }
}

const getCheckProcessData = async (
  slug: string,
): Promise<SelectedSlugIntro> => {
  return slugIntro[assertValidSlug(slug)]
}

const CheckMainSlugPage: FunctionComponent<CheckMainSlugPageProps> = async props => {
  const params = await props.params;

  const {
    slug
  } = params;

  const checkIntroData = await getCheckProcessData(slug)

  return (
    <main className="main-content">
      <h1 className="text-lg font-bold">{checkIntroData.title}</h1>
      <p>{checkIntroData.introduce}</p>
      <CheckMainAction slug={slug} />
    </main>
  )
}

export default CheckMainSlugPage
