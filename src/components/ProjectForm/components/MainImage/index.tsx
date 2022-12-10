import { Button, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import Image from 'next/image'

import type { Project } from '@prisma/client'

import TempImage from './image.jpg'

type MainImageProps = {
  project: Project,
}

const MainImage = (props: MainImageProps) => {
  const { project } = props

  const hasImage = true

  return (
    <Flex
      border="2px dashed"
      borderColor="#efefef"
      borderRadius={45}
      flexDirection="column"
      overflow="hidden"
      position="relative"
      maxWidth="100%"
      style={{ aspectRatio: '4 / 5' }}
    >
      <Image alt="Project Main Image" fill src={TempImage} style={{ objectFit: 'cover' }} />

      <Flex backgroundColor={hasImage ? "black" : undefined} direction="column" marginTop="auto" padding="8" zIndex="1">
        <Flex alignItems="center">
          <Text color={hasImage ? 'white' : 'black'} fontSize="4xl" fontWeight="bold" lineHeight={1.3} marginBottom="8" width="75%">
            {project?.title}
          </Text>

          <Link href={`/projects/${project?.id}/edit/details`} style={{ marginLeft: 'auto' }}>
            Edit
          </Link>
        </Flex>

        <Button marginTop="auto" size="lg" zIndex="1" width="auto">
          Add Photo
        </Button>

      </Flex>
    </Flex>
  )
}

export default MainImage
