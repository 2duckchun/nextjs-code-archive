import { FunctionComponent } from 'react'

interface PageProps {}

const Page: FunctionComponent<PageProps> = ({}) => {
  return (
    <div>
      <div className="h-[500px] bg-teal-700">저애들을봐</div>
      <div className="h-[500px] bg-teal-600">온동네구경이라도난듯</div>
      <div className="h-[500px] bg-teal-500"></div>
      <div className="h-[500px] bg-teal-400"></div>
      <div className="h-[500px] bg-teal-300"></div>
    </div>
  )
}

export default Page
