import type { Post } from '@prisma/client'

function usePostOgImage(post: Post) {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL

  const commentCount = post?._count?.postsComments
  const likeCount = post?._count?.postLikes

  const categoryTitle = post?.postsCategories[0]?.category?.title

  const postImage = post?.postsImages?.[0]?.image

  const url = `${baseUrl}/api/ogImages/post?categoryTitle=${categoryTitle}&coomentCount=${commentCount}&likeCount=${likeCount}&postImageKey=${postImage?.fileKey}&title=${post?.title}`

  return {
    ogImageUrl: url,
  }
}

export default usePostOgImage
