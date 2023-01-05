import { Button, Flex, Heading } from '@chakra-ui/react'

import type { User } from '@prisma/client'

import { trpc } from '@utils/trpc'

import ExternalLink from '@components/ExternalLink'

type LinksProps = {
  callbacks?: {
    CreateOrEditUsersExternalLinkModal: {
      showModal: VoidFunction,
    },
  },
  user: User,
}

const Links = (props: LinksProps) => {
  const { callbacks, editMode = false, user } = props

  const { CreateOrEditUsersExternalLinkModal } = callbacks || {}

  const usersExternalLinksQuery = trpc.usersExternalLinks.getUsersExternalLinks.useQuery(
    { userId: user?.id, include: { externalLink: { include: { externalLinkType: true } } } },
    { enabled: !!user?.id },
  )
  const { data: usersExternalLinks = [] } = usersExternalLinksQuery

  if (!editMode && usersExternalLinks.length === 0) {
    return null
  }

  return (
    <Flex flexDirection="column" marginTop={8}>
      <Flex justifyContent="space-between">
        <Heading size="md">Links</Heading>
      </Flex>

      {usersExternalLinks.map((usersExternalLink) => {
        const { externalLink, id } = usersExternalLink

        return (
          <ExternalLink
            editMode={editMode}
            externalLink={externalLink}
            key={id}
          />
        )
      })}

      {editMode && (
        <Button
          colorScheme="gray"
          marginTop={2}
          onClick={
              CreateOrEditUsersExternalLinkModal
                ? () => CreateOrEditUsersExternalLinkModal.showModal()
                : undefined
            }
          size="lg"
          width="auto"
        >
          Add Link
        </Button>
      )}
    </Flex>
  )
}

export default Links
