import {
  Button, Flex, Heading, Text,
} from '@chakra-ui/react'
import { FaGlobeAsia } from 'react-icons/fa'

import type { Project } from '@prisma/client'

type ShareProps = {
  editMode?: boolean,
  project: Project,
}

const Share = (props: ShareProps) => {
  const { editMode = false, project } = props

  return (
    <Flex flexDirection="column" marginTop={8}>
      <Flex justifyContent="space-between">
        <Heading size="sm">Share</Heading>
      </Flex>

      <Flex
        alignItems="center"
        borderWidth="1px"
        borderRadius="md"
        marginTop="2"
        padding="4"
      >
        <FaGlobeAsia />

        <Text color="gray.500" fontSize={14} fontWeight="bold" marginLeft="4">
          www.my4x4.info/{project?.slug}
        </Text>
      </Flex>

      {editMode && (
        <Button
          as="a"
          colorScheme="gray"
          href={`/projects/${project?.id}/edit/details`}
          marginTop="4"
          size="lg"
          width="auto"
        >
          Customize Url
        </Button>
      )}
    </Flex>
  )
}

export default Share
