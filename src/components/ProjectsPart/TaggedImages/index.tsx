import { Flex, Heading, SimpleGrid } from '@chakra-ui/react'

import type { Project, ProjectsPart } from '@prisma/client'

import { trpc } from '@utils/trpc'

import ImageThumb from '@components/Image/ImageThumb'

type TaggedImagesProps = {
  editMode?: boolean,
  project: Project,
  projectsPart: ProjectsPart,
}

const TaggedImages = (props: TaggedImagesProps) => {
  const { editMode = false, project, projectsPart } = props

  const taggedImagesQuery = trpc.projectsParts.getTaggedImages.useQuery({
    projectsPartId: projectsPart?.id,
  }, { enabled: !!projectsPart?.id })

  const { data: images = [] } = taggedImagesQuery

  if (!images.length) {
    return null
  }

  return (
    <Flex direction="column" marginTop="8">
      <Heading size="md" marginBottom="4">
        Tagged Images
      </Heading>

      <SimpleGrid
        columns={4}
        gridTemplateColumns="repeat(auto-fill, minmax(120px, 120px))"
        spacing={2}
      >
        {images.map((image) => {
          const { projectsImages } = image

          const projectsImageId = projectsImages[0]?.id
          const href = editMode
            ? `/projects/${project?.id}/edit/images/${projectsImageId}`
            : `/${project?.slug}/images/${projectsImageId}`

          return (
            <ImageThumb href={href} key={image.id} image={image} />
          )
        })}
      </SimpleGrid>
    </Flex>
  )
}

export default TaggedImages
