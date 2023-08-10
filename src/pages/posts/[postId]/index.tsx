import { useRouter } from 'next/router'
import {
  Badge, Box, Flex, Heading, SimpleGrid,
} from '@chakra-ui/react'
import { FaRegCalendar } from 'react-icons/fa'

import { trpc } from '@utils/trpc'

import usePostAttachments from '@hooks/usePostAttachments'

import MobileLayout from '@layouts/MobileLayout'

import ImageThumb from '@components/Image/ImageThumb'
import PostViewer from '@components/Post/Viewer'

const PostPage = () => {
  const { query: { postId } } = useRouter()

  const postQuery = trpc.posts.getPostById.useQuery(
    { id: postId },
    { enabled: !!postId },
  )

  const { data: post } = postQuery

  const postAttachmentsPayload = usePostAttachments({ postId })
  const {
    groupedAttachments,
  } = postAttachmentsPayload

  console.log(post)

  return (
    <MobileLayout>
      <Flex direction="column" alignItems="flex-start" marginTop={8} width="100%">
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

      </Flex>
    </MobileLayout>
  )
}

export default PostPage
