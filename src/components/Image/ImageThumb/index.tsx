import { Flex } from '@chakra-ui/react'
import NextImage from 'next/image'
import NextLink from 'next/link'

import type { Image } from '@prisma/client'

import useImageUrl from '@hooks/useImageUrl'

type ImageThumbProps = {
  boxProps?: object,
  height?: number,
  href?: string,
  image: Image,
  linkOriginalImageUrl?: boolean,
  width?: number,
}

const ImageThumb = (props: ImageThumbProps) => {
  const {
    boxProps,
    height = 120,
    href,
    image,
    linkOriginalImageUrl = false,
    width = 120,
  } = props

  const { imageUrl } = useImageUrl({
    enabled: !!image?.id,
    path: image?.fileKey,
    transformation: [{
      focus: 'auto',
      height: height * 2,
      width: width * 2,
    }],
  })

  const { imageUrl: fullSizeUrl } = useImageUrl({
    enabled: !!image?.id,
    path: image?.fileKey,
  })

  if (!image?.id) return null

  return (
    <NextLink href={linkOriginalImageUrl ? fullSizeUrl : href}>
      <Flex
        borderWidth="1px"
        borderRadius="2xl"
        flexShrink="0"
        height={`${height}px`}
        overflow="hidden"
        width={`${width}px`}
        {...boxProps}
      >
        <NextImage
          alt="Project Image Thumbnail"
          src={imageUrl || ''}
          height={height}
          width={width}
          style={{ objectFit: 'cover' }}
        />
      </Flex>
    </NextLink>
  )
}

export default ImageThumb
