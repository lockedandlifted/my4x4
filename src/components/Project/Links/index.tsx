import { Button, Flex, Heading } from '@chakra-ui/react'

import type { Project } from '@prisma/client'

import { trpc } from '@utils/trpc'

import ExternalLink from '@components/ExternalLink'

type LinksProps = {
  callbacks?: {
    CreateOrEditProjectExternalLinkModal: {
      showModal: VoidFunction,
    },
  },
  editMode: boolean,
  project: Project,
}

const Links = (props: LinksProps) => {
  const { callbacks, editMode = false, project } = props

  const { CreateOrEditProjectExternalLinkModal } = callbacks || {}

  const projectsExternalLinksQuery = trpc.projectsExternalLinks.getProjectsExternalLinks.useQuery(
    { projectId: project?.id, include: { externalLink: { include: { externalLinkType: true } } } },
    { enabled: !!project?.id },
  )
  const { data: projectsExternalLinks = [] } = projectsExternalLinksQuery

  if (!editMode && projectsExternalLinks.length === 0) {
    return null
  }

  return (
    <Flex direction="column" marginTop="8">
      <Heading size="sm">
        Links
      </Heading>

      {projectsExternalLinks.map((projectsExternalLink) => {
        const { externalLink, id } = projectsExternalLink

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
          marginTop="4"
          onClick={
            CreateOrEditProjectExternalLinkModal
              ? () => CreateOrEditProjectExternalLinkModal.showModal()
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
