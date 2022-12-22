import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { Flex, Heading, Text } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

import MobileLayout from '@layouts/MobileLayout'

import ImageTile from '@components/Project/ImageTile'

const BuildImagesPage = () => {
  const { query: { projectSlug } } = useRouter()

  const projectQuery = trpc.projects.getProjectBySlug.useQuery(
    { slug: projectSlug },
    { enabled: !!projectSlug },
  )

  const { data: project } = projectQuery

  const projectsImagesQuery = trpc.projectsImages.getProjectsImages.useQuery({
    projectId: project?.id,
    include: {
      image: true,
    },
  }, { enabled: !!project?.id })

  const { data: projectsImages = [] } = projectsImagesQuery

  return (
    <MobileLayout>
      <NextLink href={`/${projectSlug}`}>
        <Flex
          borderRadius="lg"
          backgroundColor="gray.50"
          justifyContent="center"
          marginBottom={4}
          padding="4"
          width="100%"
        >
          <Text fontWeight="bold">{project?.title}</Text>
        </Flex>
      </NextLink>

      {projectsImages.map((projectsImage) => {
        const { image } = projectsImage

        return (
          <>
            <ImageTile boxProps={{ marginBottom: 4 }} key={image.id} image={image} />

            {(!!image.title || !!image.description) && (
              <Flex
                _before={{
                  display: 'block',
                  content: '""',
                  backgroundColor: 'gray.100',
                  marginRight: 4,
                  width: 1,
                }}
                marginBottom={12}
              >
                <Flex direction="column">
                  {!!image.title && <Heading size="sm">{image.title}</Heading>}
                  {!!image.description && <Text>{image.description}</Text>}
                </Flex>
              </Flex>
            )}
          </>
        )
      })}

    </MobileLayout>
  )
}

export default BuildImagesPage
