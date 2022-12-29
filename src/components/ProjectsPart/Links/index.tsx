import { Button, Flex, Heading } from '@chakra-ui/react'

import type { Prisma } from '@prisma/client'

import { trpc } from '@utils/trpc'

import Link from './Link'

type ProjectsPartWithManufacturer = Prisma.ProjectsPartGetPayload<{
  include: {
    manufacturerPart: {
      include: {
        category: true,
        manufacturer: true,
      },
    },
  },
}>

type LinksProps = {
  callbacks?: {
    CreateOrEditProjectPartModal: {
      showModal: VoidFunction,
    },
  },
  editMode: boolean,
  projectsPart: ProjectsPartWithManufacturer,
}

const Links = (props: LinksProps) => {
  const { callbacks, editMode = false, projectsPart } = props

  const { CreateOrEditProjectPartExternalLinkModal } = callbacks || {}

  const projectPartsExternalLinksQuery = trpc.projectPartsExternalLinks.getProjectPartsExternalLinks.useQuery(
    { projectsPartId: projectsPart?.id, include: { externalLink: { include: { externalLinkType: true } } } },
    { enabled: !!projectsPart?.id },
  )
  const { data: projectPartsExternalLinks = [] } = projectPartsExternalLinksQuery

  return (
    <Flex direction="column" marginTop="8">
      <Heading size="md">
        Links
      </Heading>

      {projectPartsExternalLinks.map((projectPartsExternalLink) => {
        const { externalLink, id } = projectPartsExternalLink

        return (
          <Link
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
            CreateOrEditProjectPartExternalLinkModal
              ? () => CreateOrEditProjectPartExternalLinkModal.showModal()
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
