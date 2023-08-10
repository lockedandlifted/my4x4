import { trpc } from '@utils/trpc'

type UseBrowsePostsOptions = {
  categoryId?: string,
}

function useBrowsePosts(options: UseBrowsePostsOptions) {
  const { categoryId } = options

  // Load Categories
  const categoriesQuery = trpc.categories.getCategories.useQuery({
    categoryTypeKey: 'post',
  })
  const { data: categories = [] } = categoriesQuery

  // Load Posts
  const postsQuery = trpc.posts.getPosts.useQuery({
    categoryId,
    limit: 100,
    postTypeKey: 'forum',
    published: true,
  })

  const { data: posts = [] } = postsQuery

  return {
    categories,
    posts,
  }
}

export default useBrowsePosts
