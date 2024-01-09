import { ProgressBar } from '@/components/progress/ProgressBar'
import { checkProcessData } from '@/constants/check-list'
import { CheckProcessForm } from '@/containers/check/CheckProcessForm'
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
        <div className="italic">
          <p>sound of progress</p>
        </div>
        <h3>
          {checkProcessData.introduce.map((value) => {
            return <p key={value}>{value}</p>
          })}
        </h3>
        <ProgressBar className="w-full" />
        <CheckProcessForm />
      </main>
    </CheckProcessProvider>
  )
}

export default CheckProcessPage
