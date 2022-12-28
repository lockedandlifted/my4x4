import { Flex, Heading, Text } from '@chakra-ui/react'

import type { ExternalLink } from '@prisma/client'

type LinkProps = {
  externalLink: ExternalLink,
}

const Link = (props: LinkProps) => {
  const { externalLink } = props

  return (
    <Flex
      alignItems="center"
      as="a"
      borderWidth={1}
      borderRadius="xl"
      href={externalLink.url}
      marginTop={4}
      padding={2}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Flex
        alignItems="center"
        backgroundColor="gray.50"
        borderRadius="xl"
        height={16}
        justifyContent="center"
        width={16}
      >
        Icon
      </Flex>

      <Flex justifyContent="center" flexDirection="column" marginLeft={4}>
        <Heading size="small">
          {externalLink.title}
        </Heading>

        <Text fontStyle="italic">{externalLink.url}</Text>
      </Flex>
    </Flex>
  )
}

export default Link
