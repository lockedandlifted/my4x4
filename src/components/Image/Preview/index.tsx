import { useEffect, useRef, useState } from 'react'
import { Flex } from '@chakra-ui/react'

import type { Image, ProjectsImage } from '@prisma/client'

import ScaledImage from './ScaledImage'
import TagContainer from './TagContainer'

const defaultState = {
  fileKey: '',
  height: 0,
  width: 0,
}

type PreviewProps = {
  enableTagging?: boolean,
  image: Image,
  projectsImage: ProjectsImage,
}

const Preview = (props: PreviewProps) => {
  const { enableTagging = false, image, projectsImage } = props

  const containerRef = useRef<HTMLDivElement>(null)

  const [imageProperties, setImageProperties] = useState(defaultState)

  useEffect(() => {
    if (image?.fileKey && image?.height && image?.width) {
      setImageProperties({
        fileKey: image.fileKey,
        height: image.height,
        width: image.width,
      })
    }
  }, [image?.fileKey, image?.height, image?.width])

  const containerWidth = containerRef.current?.clientWidth ?? imageProperties.width

  const scale = containerWidth ? containerWidth / imageProperties.width : 1
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
      {!!imageProperties.fileKey && (
        <ScaledImage
          fileKey={imageProperties.fileKey}
          height={scaledHeight}
          width={scaledWidth}
        />
      )}

      <TagContainer
        containerRef={containerRef}
        enableTagging={enableTagging}
        height={scaledHeight}
        projectsImage={projectsImage}
        scale={scale}
        width={scaledWidth}
      />
    </Flex>
  )
}

export default Preview
