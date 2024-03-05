import { FunctionComponent } from 'react'
import { PostsRepository } from '@/modules/posts/posts-repository'
import { PaginationContextProvider } from '@/context/use-pagination-context'
import { AllPostsList } from '@/containers/posts'

interface PageProps {}

const getPostsData = async () => {
  const postList = await new PostsRepository().getPostsList()
  return postList
}

const Page: FunctionComponent<PageProps> = async ({}) => {
  const postList = await getPostsData()
  return (
    <PaginationContextProvider lists={postList}>
      <AllPostsList />
    </PaginationContextProvider>
  )
}

export default Page
