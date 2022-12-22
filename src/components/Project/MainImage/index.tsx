import { Flex, LinkOverlay, Text } from '@chakra-ui/react'
import Image from 'next/image'

import type { Project } from '@prisma/client'

import useImageUrl from '@hooks/useImageUrl'

type MainImageProps = {
  project: Project,
}

const MainImage = (props: MainImageProps) => {
  const { project } = props

  const image = project?.projectsImages?.[0]?.image
  const hasImage = !!image

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
        <Image alt="Project Main Image" fill src={imageUrl} style={{ objectFit: 'cover' }} />
      )}

      <Flex
        background={
          hasImage
            ? 'linear-gradient(0deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.8) 60%, rgba(255,255,255,0) 100%)'
            : undefined
        }
        direction="column"
        marginTop="auto"
        padding="8"
        zIndex="1"
      >
        <Flex alignItems="center">
          <Text
            color={hasImage ? 'white' : 'black'}
            fontSize="3xl"
            fontWeight="bold"
            lineHeight={1.3}
            marginBottom="4"
            width="75%"
          >
            {project?.title}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default MainImage
