import { Flex, Heading, Text } from '@chakra-ui/react'

import type { ExternalLink } from '@prisma/client'

import ExternalLinkIcon from '@components/Icons/ExternalLinkIcon'

type LinkProps = {
  editMode: boolean,
  externalLink: ExternalLink,
}

const Link = (props: LinkProps) => {
  const { editMode = false, externalLink } = props

  return (
    <Flex
      alignItems="center"
      as="a"
      borderWidth={1}
      borderRadius="xl"
      href={editMode ? externalLink.url : `/externalLinks/${externalLink?.id}`}
      marginTop={4}
      padding={2}
      target="_blank"
      rel="nofollow noopener noreferrer"
    >
      <Flex
        alignItems="center"
        backgroundColor="gray.50"
        borderRadius="xl"
        flexShrink={0}
        height={14}
        justifyContent="center"
        width={14}
      >
        <ExternalLinkIcon externalLinkType={externalLink.externalLinkType?.key} />
      </Flex>

      <Flex justifyContent="center" flexDirection="column" marginLeft={4} width="calc(100% - 80px)">
        <Heading size="small">
          {externalLink.title}
        </Heading>

        <Text color="gray.500" fontSize="sm" fontStyle="italic" noOfLines={1}>
          {externalLink.url}
        </Text>
      </Flex>
    </Flex>
  )
}

export default Link
