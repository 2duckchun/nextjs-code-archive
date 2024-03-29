export const dynamic = 'force-dynamic'

import { PostsDatasource } from './posts-datasource'

export class PostsRepository implements IPostsRepository {
  private readonly datasource: PostsDatasource
  constructor(
    private readonly token?: string,
    datasource?: PostsDatasource,
  ) {
    this.datasource = datasource ?? new PostsDatasource(token)
  }

  async getPostsList(): Promise<Post[]> {
    try {
      const result = await this.datasource.getPostsList()
      return result
    } catch (error) {
      console.error('🐜PostRepository ERROR: ', error)
      throw error
    }
  }
}
