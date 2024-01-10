import { ProgressBar } from '@/containers/check/process/ProgressBar'
import { checkProcessData } from '@/constants/check-list'
import { CheckProcessAction } from '@/containers/check/process/CheckProcessAction'
import { CheckProcessForm } from '@/containers/check/process/CheckProcessForm'
import { CheckProcessTitle } from '@/containers/check/process/CheckProcessTitle'
import { CheckProcessProvider } from '@/hooks/app/check/use-processing-context'
import { assertValidSlug } from '@/lib/assertions'
import { FunctionComponent } from 'react'

interface CheckProcessPageProps {
  params: {
    slug: string
  }
}

const getCheckProcessData = async (slug: string) => {
  return checkProcessData[assertValidSlug(slug)]
}

const CheckProcessPage: FunctionComponent<CheckProcessPageProps> = async ({
  params: { slug },
}) => {
  const checkProcessData = await getCheckProcessData(slug)

  return (
    <CheckProcessProvider checkData={checkProcessData}>
      <main className="m-auto flex min-h-screen w-[500px] flex-col items-center gap-5 p-24">
        <CheckProcessTitle introduceArray={checkProcessData.introduce} />
        <ProgressBar className="w-full" />
        <CheckProcessForm />
        <CheckProcessAction />
      </main>
    </CheckProcessProvider>
  )
}

export default CheckProcessPage
