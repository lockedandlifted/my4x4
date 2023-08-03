import { useRouter } from 'next/router'

import { Flex } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

import MobileLayout from '@layouts/MobileLayout'

import AddCommentBox from '@components/AddCommentBox'
import BackToProjectButton from '@components/Project/BackToProjectButton'
import Comment from '@components/Comment'
import Details from '@components/Image/Details'
import Preview from '@components/Image/Preview'
import TaggedParts from '@components/Image/TaggedParts'
import ProjectImageThumbs from '@components/ProjectImageThumbs'

import useProjectImagesComments from '@hooks/useProjectImagesComments'

const ProjectImagePage = () => {
  const { query: { projectSlug, projectsImageId } } = useRouter()

  const projectQuery = trpc.projects.getProjectBySlug.useQuery({ slug: projectSlug }, { enabled: !!projectSlug })
  const { data: project } = projectQuery

  const { projectsImages: { getProjectsImageById: { invalidate } } } = trpc.useContext()

  const projectsImageQuery = trpc.projectsImages.getProjectsImageById.useQuery({
    id: projectsImageId,
  }, { enabled: !!projectsImageId })
  const { data: projectsImage } = projectsImageQuery

  const projectImagesCommentsQuery = trpc.projectImagesComments.getProjectImagesComments.useQuery({
    projectsImageId,
  })

  const { data: projectImagesComments } = projectImagesCommentsQuery

  const imageCommentsPayload = useProjectImagesComments({ projectsImage })
  const {
    callbacks: {
      createProjectImagesComment,
      setInputValue,
      invalidateProjectImageComments,
    },
    inputValue,
    isLoading,
  } = imageCommentsPayload

  return (
    <MobileLayout>
      <BackToProjectButton path="/images" project={project} />

      <Preview
        enabledTagging={false}
        image={projectsImage?.image}
        projectsImage={projectsImage}
      />

      <ProjectImageThumbs project={project} />

      <Details
        callbacks={{
          onUpdateSuccess: () => invalidate({ id: projectsImageId }),
        }}
        image={projectsImage?.image}
      />

      <TaggedParts
        project={project}
        projectsImage={projectsImage}
      />

      <Flex marginTop={8}>
        <AddCommentBox
          callbacks={{
            addComment: (commentBody: string) => createProjectImagesComment({ body: commentBody }),
            setInputValue,
          }}
          inputValue={inputValue}
          isLoading={isLoading}
        />
      </Flex>

      {projectImagesComments?.map((projectImagesComment) => {
        const comment = projectImagesComment?.comment
        const commentUser = comment?.user

        return (
          <Flex key={comment.id} marginTop={4}>
            <Comment
              callbacks={{
                invalidate: invalidateProjectImageComments,
              }}
              comment={comment}
              user={commentUser}
            />
          </Flex>
        )
      })}

    </MobileLayout>
  )
}

export default ProjectImagePage
