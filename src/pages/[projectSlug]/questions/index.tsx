import { Flex, Heading } from '@chakra-ui/react'

import useProjectQuestions from '@hooks/useProjectQuestions'

import MobileLayout from '@layouts/MobileLayout'

import BackToProjectButton from '@components/Project/BackToProjectButton'

import AddQuestionBox from '@components/ProjectQuestions/AddQuestionBox'
import Question from '@components/ProjectQuestions/Question'

const ProjectQuestionsPage = () => {
  const projectQuestionsPayload = useProjectQuestions()
  const {
    callbacks: {
      createPost,
      setInputValue,
    },
    inputValue,
    isLoading,
    postsWithComments,
    postsWithoutComments,
    project,
  } = projectQuestionsPayload

  return (
    <MobileLayout>
      <BackToProjectButton project={project} />

      <Flex direction="column" marginTop={8} width="100%">
        <Heading as="h1" fontWeight="medium" size="lg">
          Questions & Answers
        </Heading>

        <Heading color="gray.500" size="xs" marginTop={4}>
          Ask a Question about {project?.title}
        </Heading>

        <AddQuestionBox
          callbacks={{
            createPost: postBody => createPost({
              body: postBody,
            }),
            setInputValue,
          }}
          inputValue={inputValue}
          isLoading={isLoading}
        />

        {/* <Heading color="gray.500" size="xs" marginTop={8}>Answered Questions</Heading> */}
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

        {/* <Heading color="gray.500" size="xs" marginTop={8}>Unanswered Questions</Heading> */}
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
