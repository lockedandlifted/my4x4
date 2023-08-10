import { useRouter } from 'next/router'
import { Button, Flex, Heading } from '@chakra-ui/react'

import useBrowsePosts from '@hooks/useBrowsePosts'

import MobileLayout from '@layouts/MobileLayout'

import FilterGroup from '@components/FilterGroup'
import PostTile from '@components/Post/PostTile'

const PostsPage = () => {
  const { query: { categoryId } } = useRouter()

  const browsePostsPayload = useBrowsePosts({ categoryId })
  const {
    categories,
    posts,
  } = browsePostsPayload

  return (
    <MobileLayout>
      <Flex direction="column" marginTop={8} width="100%">
        <Heading as="h1" fontWeight="medium" size="lg">
          Forum
        </Heading>

        <FilterGroup title="Tags">
          {categories?.map((category) => {
            const { id, title } = category

            return (
              <FilterGroup.Tag
                href={`/posts?categoryId=${id}`}
                isSelected={categoryId === id}
                key={id}
              >
                {title}
              </FilterGroup.Tag>
            )
          })}
        </FilterGroup>

        <Flex borderTopWidth="1px" marginTop="4">
          <Button
            as="a"
            backgroundColor="#FFF500"
            color="black"
            href={`/posts/new?categoryId=${categoryId}`}
            marginTop={4}
            size="lg"
            width="100%"
          >
            Create Post
          </Button>
        </Flex>

        <Flex direction="column">
          {posts?.map(post => (
            <PostTile key={post.id} post={post} />
          ))}
        </Flex>
      </Flex>
    </MobileLayout>
  )
}

export default PostsPage
