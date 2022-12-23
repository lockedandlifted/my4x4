import { Flex, Heading, Text } from '@chakra-ui/react'

import type { ProjectsPart } from '@prisma/client'

import Paragraph from '@components/Paragraph'

type DescriptionProps = {
  projectsPart: ProjectsPart,
}

const Description = (props: DescriptionProps) => {
  const { projectsPart } = props

  if (!projectsPart?.description && !projectsPart?.installedAt) {
    return null
  }

  return (
    <Flex flexDirection="column" marginTop={8}>
      <Flex justifyContent="space-between">
        <Heading size="md" marginBottom="4">About the Part</Heading>
      </Flex>

      <Paragraph>
        {projectsPart?.description}
      </Paragraph>

      <Text>Installed On: {projectsPart?.installedAt?.toLocaleDateString()}</Text>
    </Flex>
  )
}

export default Description
