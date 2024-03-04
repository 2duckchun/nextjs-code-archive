import { APP_SERVER_API_ENDPOINT } from '@/config/APP_SERVER_API_ENDPOINT'

const postsDatasourceErrorMessage = {
  getPostsListNotOk: 'posts를 불러오는데 실패했습니다.',
}

export class PostsDatasource implements IPostsDatasource {
  private token?: string
  constructor(token?: string) {
    this.token = token
  }

  async getPostsList(): Promise<Post[]> {
    try {
      const response = await fetch(
        APP_SERVER_API_ENDPOINT.JSON_PLACEHOLDER_ALL_POSTS(),
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`,
          },
          cache: 'no-store',
        },
      )

      if (!response.ok) {
        throw new Error(postsDatasourceErrorMessage.getPostsListNotOk)
      }
      const result: Post[] = await response.json()
      return result
    } catch (error) {
      console.error('🐜PostDatasource ERROR: ', error)
      throw error
    }
  }
}
