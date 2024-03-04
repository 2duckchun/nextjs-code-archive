import { FunctionComponent } from 'react'
import { PostsRepository } from '@/modules/posts/posts-repository'
import { AllPostsList } from '@/containers/posts/AllPostsList'
import { PagenationBar } from '@/components/pagenation/PagenationBar'

interface PageProps {}

const getPostsData = async () => {
  const repo = new PostsRepository()
  const postsData = repo.getPostsList()
  return postsData
}

const Page: FunctionComponent<PageProps> = async ({}) => {
  const postsData = await getPostsData()
  console.log(postsData)
  return (
    <div>
      <AllPostsList posts={postsData} />
    </div>
  )
}

export default Page
