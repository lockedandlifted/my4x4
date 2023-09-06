import { useRouter } from 'next/router'

import { Flex, Heading } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

import useProjectComments from '@hooks/useProjectComments'

import MobileLayout from '@layouts/MobileLayout'

import AddCommentBox from '@components/AddCommentBox'
import BackToProjectButton from '@components/Project/BackToProjectButton'
import Comment from '@components/Comment'

const ProjectCommentsPage = () => {
  const { query: { projectSlug } } = useRouter()

  const projectQuery = trpc.projects.getProjectBySlug.useQuery(
    { slug: projectSlug },
    { enabled: !!projectSlug },
  )

  const { data: project } = projectQuery

  const commentsQuery = trpc.comments.getComments.useQuery(
    {
      projectId: project?.id,
    },
    { enabled: !!project?.id },
  )

  const { data: comments } = commentsQuery

  const projectCommentsPayload = useProjectComments({ project })
  const {
    callbacks: {
      createProjectsComment,
      invalidateProjectsComment,
      setInputValue,
    },
    inputValue,
    isLoading,
  } = projectCommentsPayload

  return (
    <MobileLayout>
      <BackToProjectButton project={project} />

      <Flex direction="column" marginTop={8} width="100%">
        <Heading as="h1" fontWeight="medium" size="lg">
          Comments
        </Heading>

        <Heading color="gray.500" size="xs" marginTop={4}>
          Add Comment about {project?.title}
        </Heading>

        <Flex marginTop={4}>
          <AddCommentBox
            callbacks={{
              addComment: (commentBody: string) => createProjectsComment({ body: commentBody }),
              setInputValue,
            }}
            inputValue={inputValue}
            isLoading={isLoading}
          />
        </Flex>

        {!!comments?.length && (
          <Flex direction="column" marginTop={4}>
            {comments && comments.map(comment => (
              <Comment
                callbacks={{
                  invalidate: invalidateProjectsComment,
                }}
                key={comment.id}
                comment={comment}
                user={comment.user}
              />
            ))}
          </Flex>
        )}

      </Flex>
    </MobileLayout>
  )
}

export default ProjectCommentsPage
