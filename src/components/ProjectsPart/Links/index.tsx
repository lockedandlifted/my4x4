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

  const projectPartExternalLinksQuery = trpc.projectPartsExternalLinks.getProjectPartsExternalLinks.useQuery(
    { projectsPartId: projectsPart?.id, include: { externalLink: true } },
    { enabled: !!projectsPart?.id },
  )
  const { data: projectsPartsExternalLinks = [] } = projectPartExternalLinksQuery

  console.log(projectsPartsExternalLinks)

  return (
    <Flex direction="column" marginTop="8">
      <Heading size="md">
        Links
      </Heading>

      <Link externalLink={{ url: 'https://www.google.com', title: 'Buy this Part' }} />
      <Link externalLink={{ url: 'https://www.youtube.com/watch?v=N6so0I0cF48', title: 'Installation Video' }} />

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
