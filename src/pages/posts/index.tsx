import { useRouter } from 'next/router'
import { Button, Flex, Heading } from '@chakra-ui/react'

import useBrowsePosts from '@hooks/useBrowsePosts'

import MobileLayout from '@layouts/MobileLayout'

import FilterGroup from '@components/FilterGroup'
import PostTile from '@components/Post/PostTile'

const PostsPage = () => {
  const { query: { categoryKey } } = useRouter()

  const browsePostsPayload = useBrowsePosts({ categoryKey })
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
            const { key, id, title } = category

            return (
              <FilterGroup.Tag
                href={`/posts?categoryKey=${key}`}
                isSelected={categoryKey === key}
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
            href={categoryKey ? `/posts/new?categoryKey=${categoryKey}` : '/posts/new'}
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
