import { useRef } from 'react'
import { Button, Flex } from '@chakra-ui/react'

import type { Image } from '@prisma/client'

import ScaledImage from './ScaledImage'
import TagContainer from './TagContainer'

type PreviewProps = {
  image: Image,
}

const Preview = (props: PreviewProps) => {
  const { image } = props

  const containerRef = useRef<HTMLDivElement>(null)

  if (!image || !image.width || !image.height) {
    return null
  }
  const containerWidth = containerRef.current?.clientWidth ?? image.width

  const scale = containerWidth / image.width
  const scaledWidth = image.width * scale
  const scaledHeight = image.height * scale

  return (
    <Flex
      direction="column"
      height={scaledHeight}
      position="relative"
      ref={containerRef}
      width="100%"
    >
      <ScaledImage
        fileKey={image.fileKey}
        height={scaledHeight}
        width={scaledWidth}
      />

      <TagContainer
        containerRef={containerRef}
        height={scaledHeight}
        scale={scale}
        width={scaledWidth}
      />
    </Flex>
  )
}

export default Preview
