import { Flex } from '@chakra-ui/react'

import type { Image } from '@prisma/client'

type PreviewProps = {
  image: Image,
}

const Preview = (props: PreviewProps) => {
  const { image } = props

  console.log(image)

  return (
    <Flex>
      Image {image?.id}
    </Flex>
  )
}

export default Preview
