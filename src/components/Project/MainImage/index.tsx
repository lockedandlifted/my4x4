import { Button, Flex, Image } from '@chakra-ui/react'
import { FaImages } from 'react-icons/fa'

import type { Project } from '@prisma/client'

import useImageUrl from '@hooks/useImageUrl'

import { trpc } from '@utils/trpc'

type MainImageProps = {
  project: Project,
}

const MainImage = (props: MainImageProps) => {
  const { project } = props

  const firstProjectsImage = project?.projectsImages?.[0]
  const image = firstProjectsImage?.image

  const hasImage = !!image

  const imageCountQuery = trpc.projectsImages.getProjectsImagesCount.useQuery(
    { slug: project?.slug },
    { enabled: !!project?.slug },
  )
  const { data: imageCount } = imageCountQuery

  const { imageUrl } = useImageUrl({
    enabled: hasImage,
    path: image?.fileKey,
    transformation: [{
      focus: 'auto',
      height: '710',
      width: '568',
    }],
  })

  return (
    <Flex
      boxShadow="base"
      borderRadius={20}
      flexDirection="column"
      overflow="hidden"
      position="relative"
      maxWidth="100%"
      style={{ aspectRatio: '4 / 5' }}
    >
      {hasImage && (
        <Image alt="Project Main Image" src={imageUrl} style={{ objectFit: 'cover' }} />
      )}

      <Flex position="absolute" bottom="8" right="8" zIndex={1}>
        <Button
          as="a"
          backgroundColor="rgba(0, 0, 0, 0.7)"
          colorScheme="blackAlpha"
          href={hasImage ? `/${project?.slug}/images/${firstProjectsImage?.id}` : ''}
          leftIcon={<FaImages />}
        >
          {imageCount} {imageCount === 1 ? 'Image' : 'Images'}
        </Button>
      </Flex>
    </Flex>
  )
}

export default MainImage
