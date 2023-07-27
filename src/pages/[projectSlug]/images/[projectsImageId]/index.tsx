import { useRouter } from 'next/router'

import { trpc } from '@utils/trpc'

import MobileLayout from '@layouts/MobileLayout'

import AddCommentBox from '@components/AddCommentBox'
import BackToProjectButton from '@components/Project/BackToProjectButton'
import Comment from '@components/Comment'
import Details from '@components/Image/Details'
import Preview from '@components/Image/Preview'
import TaggedParts from '@components/Image/TaggedParts'
import ProjectImageThumbs from '@components/ProjectImageThumbs'

import useImageComments from '@hooks/useImageComments'

const ProjectImagePage = () => {
  const { query: { projectSlug, projectsImageId } } = useRouter()

  const projectQuery = trpc.projects.getProjectBySlug.useQuery({ slug: projectSlug }, { enabled: !!projectSlug })
  const { data: project } = projectQuery

  const { projectsImages: { getProjectsImageById: { invalidate } } } = trpc.useContext()

  const projectsImageQuery = trpc.projectsImages.getProjectsImageById.useQuery({
    id: projectsImageId,
  }, { enabled: !!projectsImageId })
  const { data: projectsImage } = projectsImageQuery

  const image = projectsImage?.image || {}

  const imagesCommentsQuery = trpc.imagesComments.getImagesComments.useQuery({
    imageId: image.id,
  })

  const { data: imageComments } = imagesCommentsQuery

  const imageCommentsPayload = useImageComments({ image })
  const {
    callbacks: {
      createImagesComment,
      setInputValue,
      invalidateImageComments,
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
        image={image}
      />

      <TaggedParts
        project={project}
        projectsImage={projectsImage}
      />

      <AddCommentBox
        callbacks={{
          addComment: (commentBody: string) => createImagesComment({ body: commentBody }),
          setInputValue,
        }}
        inputValue={inputValue}
        isLoading={isLoading}
      />

      {imageComments?.map((imagesComment) => {
        const comment = imagesComment?.comment
        const commentUser = comment?.user

        return (
          <Comment
            callbacks={{
              invalidate: invalidateImageComments,
            }}
            comment={comment}
            key={comment.id}
            user={commentUser}
          />
        )
      })}

    </MobileLayout>
  )
}

export default ProjectImagePage
