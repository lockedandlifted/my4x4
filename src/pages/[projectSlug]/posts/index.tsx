import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { FaAngleLeft } from 'react-icons/fa'

import { trpc } from '@utils/trpc'

import MobileLayout from '@layouts/MobileLayout'

import PostTile from '@components/Post/PostTile'

const ProjectPostsPage = () => {
  const { query: { projectSlug } } = useRouter()

  const projectQuery = trpc.projects.getProjectBySlug.useQuery(
    { slug: projectSlug },
    { enabled: !!projectSlug },
  )
  const { data: project } = projectQuery

  const postsQuery = trpc.posts.getPosts.useQuery({
    hidden: false,
    postTypeKey: 'forum',
    projectId: project?.id,
  }, { enabled: !!project?.id })
  const { data: posts = [] } = postsQuery

  return (
    <MobileLayout>
      <Flex direction="column" marginTop={8} width="100%">
        <Heading as="h1" fontWeight="medium" size="lg">
          Posts Featuring {project?.title}
        </Heading>

        <NextLink href={`/${projectSlug}`}>
          <Flex
            alignItems="center"
            justifyContent="flex-start"
            paddingY={4}
            width="100%"
          >
            <Text fontSize="xl">
              <FaAngleLeft />
            </Text>

            <Text fontWeight="bold" marginLeft={1}>Back to Build</Text>
          </Flex>
        </NextLink>

        <Flex direction="column">
          {posts?.map(post => (
            <PostTile key={post.id} post={post} />
          ))}
        </Flex>
      </Flex>
    </MobileLayout>
  )
}

export default ProjectPostsPage
