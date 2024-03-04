interface IPostsDatasource {
  getPostsList(): Promise<Post[]>
}

interface IPostsRepository {
  getPostsList(): Promise<Post[]>
}

type Post = {
  userId: number
  id: number
  title: string
  body: string
}
