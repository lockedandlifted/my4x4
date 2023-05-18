import { useRouter } from 'next/router'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import NextLink from 'next/link'

import { trpc } from '@utils/trpc'

import useProjectOgImage from '@hooks/useProjectOgImage'

import MobileLayout from '@layouts/MobileLayout'

import BackToProjectButton from '@components/Project/BackToProjectButton'
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

  const { ogImageUrl } = useProjectOgImage(project)

  return (
    <MobileLayout>
      <NextSeo
        title={`MY4X4 | Images of ${project?.title}`}
        description={`View images and info for ${project?.title} on MY4X4.`}
        facebook={{
          appId: '100089112092156',
        }}
        openGraph={{
          description: project?.description || 'Checkout build images on MY4X4.info',
          images: [
            {
              url: ogImageUrl,
              alt: `Main Image for ${project?.title}`,
            },
          ],
          title: project?.title,
          type: 'website',
          url: `https://www.my4x4.info/${project?.slug}`,
        }}
      />

      <BackToProjectButton project={project} />

      {projectsImages.map((projectsImage) => {
        const { id, image } = projectsImage

        return (
          <>
            <NextLink href={`/${projectSlug}/images/${id}`}>
              <ImageTile boxProps={{ marginBottom: 4 }} key={image.id} image={image} />
            </NextLink>

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
                <Flex direction="column" maxWidth="100%">
                  {!!image.title && (
                    <Heading noOfLines={1} size="sm">
                      {image.title}
                    </Heading>
                  )}
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
