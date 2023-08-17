import { useRouter } from 'next/router'
import NextLink from 'next/link'
import {
  Badge, Box, Flex, Heading, Image, SimpleGrid, Text,
} from '@chakra-ui/react'
import { FaAngleLeft, FaRegCalendar } from 'react-icons/fa'

import { trpc } from '@utils/trpc'

import useImageUrl from '@hooks/useImageUrl'
import usePostAttachments from '@hooks/usePostAttachments'
import usePostComments from '@hooks/usePostComments'
import usePostForm from '@hooks/usePostForm'
import useValidatePostOwner from '@hooks/useValidatePostOwner'

import MobileLayout from '@layouts/MobileLayout'

import AddCommentBox from '@components/AddCommentBox'
import Comment from '@components/Comment'
import EditPostBanner from '@components/Post/EditPostBanner'
import ImageThumb from '@components/Image/ImageThumb'
import LikeButton from '@components/Post/LikeButton'
import PublishPost from '@components/Post/PublishPost'
import PostViewer from '@components/Post/Viewer'
import SimilarPosts from '@components/Post/SimilarPosts'

const PostPage = () => {
  const { query: { postId } } = useRouter()

  const { mutate: createPageViewFn } = trpc.postPageViews.createPostPageView.useMutation()

  // Get Post
  const postQuery = trpc.posts.getPostById.useQuery(
    { id: postId },
    {
      enabled: !!postId,
      onSuccess(data) {
        if (!data?.published) return

        createPageViewFn({
          id: data.id,
        })
      },
    },
  )

  const { data: post } = postQuery

  const postFormPayload = usePostForm({ post })
  const {
    callbacks: {
      publishPost: publishFn,
    },
  } = postFormPayload

  // Get Views
  const postViewQuery = trpc.postPageViews.getViewCountForPostId.useQuery(
    { id: postId },
    { enabled: !!postId },
  )

  const { data: postViewCount } = postViewQuery

  // Get Attachments
  const postAttachmentsPayload = usePostAttachments({ postId })
  const {
    groupedAttachments,
  } = postAttachmentsPayload

  const { isValidOwner } = useValidatePostOwner({ post })

  // Post Comments
  const postCommentsPayload = usePostComments({ post })
  const {
    callbacks: {
      createPostsComment,
      invalidatePost,
      setInputValue,
    },
    inputValue,
    isLoading,
  } = postCommentsPayload

  const image = post?.postsImages?.[0]?.image

  const hasImage = !!image

  const { imageUrl } = useImageUrl({
    enabled: hasImage,
    path: image?.fileKey,
    transformation: [{
      focus: 'auto',
      height: '480',
      width: '1000',
    }],
  })

  return (
    <MobileLayout>
      {isValidOwner && <EditPostBanner post={post} postViewCount={postViewCount} />}

      <NextLink href="/posts">
        <Flex
          alignItems="center"
          justifyContent="flex-start"
          paddingY={4}
          width="100%"
        >
          <Text fontSize="xl">
            <FaAngleLeft />
          </Text>

          <Text fontWeight="bold" marginLeft={1}>Back</Text>
        </Flex>
      </NextLink>

      {!post?.published && (
        <Flex marginTop={8}>
          <PublishPost
            callbacks={{
              publishPost: publishFn,
            }}
            post={post}
          />
        </Flex>
      )}

      <Flex direction="column" alignItems="flex-start" marginTop={4} width="100%">
        {hasImage && (
          <Flex
            alignItems="center"
            borderRadius="lg"
            flexDirection="column"
            marginBottom={4}
            overflow="hidden"
            position="relative"
            justifyContent="center"
            height="240px"
            width="100%"
          >
            <Image
              alt="Post Cover Image"
              backgroundPosition="center center"
              objectFit="cover"
              src={imageUrl}
              width="100%"
            />
          </Flex>
        )}

        <Heading as="h1" fontWeight="medium" size="lg">
          {post?.title}
        </Heading>

        <Flex>
          {post?.postsCategories?.map((postCategory) => {
            const { category, categoryId, id } = postCategory

            return (
              <Badge
                as="a"
                fontSize="sm"
                href={`/posts?categoryId=${categoryId}`}
                key={id}
                textTransform="uppercase"
                marginTop="2"
                marginRight="2"
                width="auto"
              >
                {category?.title}
              </Badge>
            )
          })}
        </Flex>

        {!!post?.createdAt && (
          <Flex
            alignItems="center"
            color="gray.500"
            fontSize="sm"
            marginTop="2"
          >
            <FaRegCalendar />
            <Box marginLeft="1">
              Posted {post.createdAt.toDateString()}
            </Box>
          </Flex>
        )}

        <Flex
          borderTopWidth="1px"
          borderTopStyle="dashed"
          direction="column"
          marginTop="4"
          paddingTop="4"
          width="100%"
        >
          <PostViewer post={post} />
        </Flex>

        {!!groupedAttachments?.images?.length && (
          <Flex direction="column" marginTop="8" width="100%">
            <Heading size="sm">Images</Heading>

            <SimpleGrid
              columns={3}
              gridTemplateColumns="repeat(auto-fill, minmax(30%, 1fr))"
              marginTop="4"
              spacing="2"
              width="100%"
            >
              {groupedAttachments?.images.map((postsAttachment) => {
                const { attachment, id } = postsAttachment

                return (
                  <ImageThumb
                    boxProps={{
                      width: '100%',
                      height: '100%',
                    }}
                    height={200}
                    href=""
                    image={attachment}
                    key={id}
                    linkOriginalImageUrl
                    width={200}
                  />
                )
              })}
            </SimpleGrid>
          </Flex>
        )}

        <Flex borderBottomWidth="1px" borderTopWidth="1px" marginTop="4" paddingY="4" width="100%">
          <LikeButton post={post} redirect={`/posts/${post?.id}`} />
        </Flex>

        <Flex marginTop="4" width="100%">
          <AddCommentBox
            callbacks={{
              addComment: (commentBody: string) => createPostsComment({ body: commentBody }),
              setInputValue,
            }}
            inputValue={inputValue}
            isLoading={isLoading}
            placeholder="Enter your comment"
          />
        </Flex>

        <Flex direction="column" marginTop="4">
          {post?.postsComments?.map((postsComment) => {
            const comment = postsComment?.comment
            const commentUser = comment?.user

            return (
              <Comment
                callbacks={{
                  invalidate: invalidatePost,
                }}
                comment={comment}
                key={comment.id}
                user={commentUser}
              />
            )
          })}
        </Flex>

        <SimilarPosts post={post} />
      </Flex>
    </MobileLayout>
  )
}

export default PostPage
