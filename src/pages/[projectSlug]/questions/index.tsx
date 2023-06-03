import { useRouter } from 'next/router'
import { Flex, Heading } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

import MobileLayout from '@layouts/MobileLayout'

import BackToProjectButton from '@components/Project/BackToProjectButton'

import Question from '@components/ProjectQuestions/Question'

type ProjectQuestionsPageProps = {
  children: React.ReactNode,
}

const ProjectQuestionsPage = (props: ProjectQuestionsPageProps) => {
  const { query: { projectSlug } } = useRouter()

  const projectQuery = trpc.projects.getProjectBySlug.useQuery(
    { slug: projectSlug },
    { enabled: !!projectSlug },
  )

  const { data: project } = projectQuery

  const projectPostsQuery = trpc.posts.getPosts.useQuery(
    {
      postTypeKey: 'question',
      projectSlug: projectSlug as string,
    },
    { enabled: !!projectSlug },
  )

  const { data: posts } = projectPostsQuery

  const postsWithComments = posts ? posts.filter(post => post._count.postsComments > 0) : []
  const postsWithoutComments = posts ? posts.filter(post => post._count.postsComments === 0) : []

  return (
    <MobileLayout>
      <BackToProjectButton project={project} />

      <Flex direction="column" marginTop={8} width="100%">
        <Heading as="h1" fontWeight="medium" size="lg">
          Questions
        </Heading>

        <Heading color="gray.500" size="xs" marginTop={8}>Answered Questions</Heading>
        <Flex direction="column">
          {postsWithComments.map(post => (
            <Question
              hasComments
              key={post.id}
              post={post}
              project={project}
            />
          ))}
        </Flex>

        <Heading color="gray.500" size="xs" marginTop={8}>Unanswered Questions</Heading>
        <Flex direction="column">
          {postsWithoutComments.map(post => (
            <Question
              hasComments={false}
              key={post.id}
              post={post}
              project={project}
            />
          ))}
        </Flex>
      </Flex>

    </MobileLayout>
  )
}

export default ProjectQuestionsPage
