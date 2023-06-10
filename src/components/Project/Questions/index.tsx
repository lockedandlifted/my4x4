import { Heading } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

import type { Project } from '@prisma/client'

import AskQuestion from './AskQuestion'
import Question from './Question'

type QuestionsProps = {
  project: Project,
}

const Questions = (props: QuestionsProps) => {
  const { project } = props

  const projectPostsQuery = trpc.posts.getPosts.useQuery(
    {
      postTypeKey: 'question',
      projectSlug: project?.slug as string,
    },
    { enabled: !!project?.slug },
  )

  const { data: posts } = projectPostsQuery

  const filteredPosts = posts?.slice(0, 3)

  return (
    <>
      <Heading size="sm" marginTop={8}>Questions</Heading>

      {filteredPosts?.map(post => (
        <Question
          href={`/${project?.slug}/questions/${post.id}`}
          key={post.id}
          post={post}
        />
      ))}

      <AskQuestion href={`/${project?.slug}/questions`} />
    </>
  )
}

export default Questions
