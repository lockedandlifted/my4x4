import { Flex, Heading } from '@chakra-ui/react'

import type { ProjectsImage } from '@prisma/client'

import { trpc } from '@utils/trpc'

import TaggedPart from './TaggedPart'

type TaggedPartsProps = {
  projectsImage: ProjectsImage,
}

const TaggedParts = (props: TaggedPartsProps) => {
  const { projectsImage } = props

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

  if (!projectPartsImageTags.length) {
    return null
  }

  return (
    <Flex flexDirection="column" marginTop={8}>
      <Heading size="md">Tagged Parts</Heading>

      {projectPartsImageTags.map((projectPartsImageTag, index) => {
        const { id, projectPartId, projectPart: { manufacturerPart, projectId } } = projectPartsImageTag

        return (
          <TaggedPart
            key={id}
            href={`/projects/${projectId}/edit/parts/${projectPartId}`}
            iconContent={`${index + 1}`}
            manufacturerPart={manufacturerPart}
          />
        )
      })}
    </Flex>
  )
}

export default TaggedParts
