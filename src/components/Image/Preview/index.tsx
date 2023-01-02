import { useEffect, useRef, useState } from 'react'
import { Flex } from '@chakra-ui/react'

import type { Image } from '@prisma/client'

import ScaledImage from './ScaledImage'
import TagContainer from './TagContainer'

const defaultState = {
  fileKey: undefined,
  height: 0,
  width: 0,
}

type PreviewProps = {
  image: Image,
}

const Preview = (props: PreviewProps) => {
  const { image } = props

  const containerRef = useRef<HTMLDivElement>(null)

  const [imageProperties, setImageProperties] = useState(defaultState)

  useEffect(() => {
    if (image?.id) {
      setImageProperties({
        fileKey: image.fileKey,
        height: image.height,
        width: image.width,
      })
    }
  }, [image?.id])

  if (!imageProperties.width || !imageProperties.height) {
    return null
  }
  const containerWidth = containerRef.current?.clientWidth ?? imageProperties.width

  const scale = containerWidth / imageProperties.width
  const scaledWidth = imageProperties.width * scale
  const scaledHeight = imageProperties.height * scale

  return (
    <Flex
      direction="column"
      height={scaledHeight}
      position="relative"
      ref={containerRef}
      width="100%"
    >
      <ScaledImage
        fileKey={imageProperties.fileKey}
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
