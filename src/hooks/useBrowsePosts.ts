import { trpc } from '@utils/trpc'

type UseBrowsePostsOptions = {
  categoryKey?: string,
}

function useBrowsePosts(options: UseBrowsePostsOptions) {
  const { categoryKey } = options

  // Load Categories
  const categoriesQuery = trpc.categories.getCategories.useQuery({
    categoryTypeKey: 'post',
  })
  const { data: categories = [] } = categoriesQuery

  // Load Posts
  const postsQuery = trpc.posts.getPosts.useQuery({
    categoryKey,
    hidden: false,
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
