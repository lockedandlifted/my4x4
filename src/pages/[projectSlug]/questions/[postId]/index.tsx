import { useRouter } from 'next/router'
import {
  Button, Flex, Heading, Link, Text,
} from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

import usePostComments from '@hooks/usePostComments'

import MobileLayout from '@layouts/MobileLayout'

import AddCommentBox from '@components/AddCommentBox'
import BackToProjectButton from '@components/Project/BackToProjectButton'
import Comment from '@components/Comment'
import LikeButton from '@components/Post/LikeButton'
import UserImage from '@components/UserImage'

type ProjectQuestionPageProps = {
  children: React.ReactNode,
}

const ProjectQuestionPage = (props: ProjectQuestionPageProps) => {
  const { children } = props

  const { query: { postId, projectSlug } } = useRouter()

  const projectQuery = trpc.projects.getProjectBySlug.useQuery(
    { slug: projectSlug },
    { enabled: !!projectSlug },
  )

  const { data: project } = projectQuery

  const postQuery = trpc.posts.getPostById.useQuery(
    { id: postId as string },
    { enabled: !!postId },
  )

  const { data: post } = postQuery
  const user = post?.user

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

  return (
    <MobileLayout>
      <BackToProjectButton
        path="/questions"
        project={project}
      />

      <Flex direction="column" marginTop={8} width="100%">
        <Flex alignItems="center" marginTop="4">
          <UserImage user={user} />

          <Link href={`/users/${user?.username}`}>
            <Flex direction="column" color="black" justifyContent="center" marginLeft={4}>
              <Text fontSize="md" fontWeight="bold">{user?.name}</Text>
              <Text fontSize="sm">@{user?.username}</Text>
            </Flex>
          </Link>
        </Flex>

        <Heading as="h1" fontWeight="medium" marginTop="4" size="lg">
          {post?.body}
        </Heading>

        <Flex borderBottomWidth="1px" borderTopWidth="1px" marginTop="4" paddingY="4">
          <LikeButton post={post} />
        </Flex>

        <Flex marginTop="4" width="100%">
          <AddCommentBox
            callbacks={{
              addComment: (commentBody: string) => createPostsComment({ body: commentBody }),
              setInputValue,
            }}
            inputValue={inputValue}
            isLoading={isLoading}
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
      </Flex>
    </MobileLayout>
  )
}

export default ProjectQuestionPage
