import { Flex, Heading } from '@chakra-ui/react'

import type { Project, ProjectsImage } from '@prisma/client'

import { trpc } from '@utils/trpc'

import TaggedPart from './TaggedPart'

type TaggedPartsProps = {
  editMode?: boolean,
  project: Project,
  projectsImage: ProjectsImage,
}

const TaggedParts = (props: TaggedPartsProps) => {
  const { editMode = false, project, projectsImage } = props

  // Query
  const projectPartsImageTagsQuery = trpc.projectPartsImageTags.getProjectPartsImageTags.useQuery({
    include: {
      imageTag: true,
      projectPart: {
        include: {
          manufacturerPart: {
            include: {
              manufacturer: true,
            },
          },
        },
      },
    },
    imageId: projectsImage?.imageId,
  }, { enabled: !!projectsImage?.imageId })

  const { data: projectPartsImageTags = [] } = projectPartsImageTagsQuery

  // Delete Mutation
  const { projectPartsImageTags: { getProjectPartsImageTags: { invalidate } } } = trpc.useContext()

  const deleteProjectPartsImageTagMutation = trpc.projectPartsImageTags.deleteProjectPartsImageTagById.useMutation({
    onSuccess: () => {
      invalidate({ imageId: projectsImage?.imageId })
    },
  })
  const { mutate: deleteProjectPartsImageTag } = deleteProjectPartsImageTagMutation

  if (!projectPartsImageTags.length) {
    return null
  }

  return (
    <Flex flexDirection="column" marginTop={8}>
      <Heading size="md">Tagged Parts</Heading>

      {projectPartsImageTags.map((projectPartsImageTag, index) => {
        const { id, projectPartId, projectPart: { manufacturerPart } } = projectPartsImageTag

        return (
          <TaggedPart
            callbacks={{
              deleteProjectsPart: () => deleteProjectPartsImageTag({ id }),
            }}
            key={id}
            href={editMode ? undefined : `/${project?.slug}/parts/${projectPartId}`}
            iconContent={`${index + 1}`}
            manufacturerPart={manufacturerPart}
          />
        )
      })}
    </Flex>
  )
}

export default TaggedParts
