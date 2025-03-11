import { getPosts } from '@/actions/placeholder'
import { ACTION_STATUS } from '@/shared/lib/axios/handle-actions'

export default async function PostsPage() {
  const { status, data, message } = await getPosts()

  if (status === ACTION_STATUS.SERVER_ERROR) {
    return <div>{message}</div>
  }

  if (status === ACTION_STATUS.INVALID_DATA) {
    return <div>{message}</div>
  }

  if (status === ACTION_STATUS.SUCCESS) {
    return (
      <div>
        {data.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
    )
  }
}
