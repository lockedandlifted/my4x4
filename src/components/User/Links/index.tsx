import { Button, Flex, Heading } from '@chakra-ui/react'

import type { User } from '@prisma/client'

import ExternalLink from '@components/ExternalLink'

type LinksProps = {
  user: User,
}

const Links = (props: LinksProps) => {
  const { user } = props

  return (
    <Flex flexDirection="column" marginTop={8}>
      <Flex justifyContent="space-between">
        <Heading size="md">Links</Heading>
      </Flex>

      <ExternalLink
        externalLink={{ title: 'YouTube Profile', url: 'https://www.google.com' }}
      />
      <ExternalLink
        externalLink={{ title: 'Donate', url: 'https://www.google.com' }}
      />
      <ExternalLink
        externalLink={{ title: 'Blog', url: 'https://www.google.com' }}
      />

      <Button
        // onClick={() => claimProjects({ temporaryUserId })}
        marginTop={2}
        size="lg"
      >
        Add Link
      </Button>
    </Flex>
  )
}

export default Links
