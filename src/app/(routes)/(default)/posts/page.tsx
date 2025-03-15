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
          <div className="border-b border-gray-200 p-4" key={post.id}>
            <h2 className="text-lg font-bold">{post.title}</h2>
            <p className="text-sm text-gray-500">{post.body}</p>
          </div>
        ))}
      </div>
    )
  }
}
