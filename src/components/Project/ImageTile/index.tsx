import { Flex } from '@chakra-ui/react'
import NextImage from 'next/image'

import type { Image } from '@prisma/client'

import useImageUrl from '@hooks/useImageUrl'

type ImageTileProps = {
  boxProps?: object,
  image: Image,
}

const ImageTile = (props: ImageTileProps) => {
  const { boxProps, image } = props

  const { imageUrl } = useImageUrl({
    enabled: true,
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
      {...boxProps}
    >
      <NextImage
        alt="Project Image"
        fill
        src={imageUrl}
        style={{ objectFit: 'cover' }}
      />
    </Flex>
  )
}

export default ImageTile
