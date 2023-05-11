import { Button, Flex, Text } from '@chakra-ui/react'

import type { Project } from '@prisma/client'

type EditProjectBannerProps = {
  editMode?: boolean,
  project: Project,
  projectViewCount: number,
}

const EditProjectBanner = (props: EditProjectBannerProps) => {
  const { editMode = false, project, projectViewCount } = props

  return (
    <Flex alignItems="center" borderTopWidth={1} paddingY="4">
      <Flex direction="column">
        <Text fontSize="sm" fontWeight="bold" noOfLines={1}>{project?.title}</Text>
        <Text fontSize="sm">
          Viewed {projectViewCount} {projectViewCount === 1 ? 'Time' : 'Times'}
        </Text>
      </Flex>

      <Button
        as="a"
        flexShrink={0}
        href={editMode ? `/${project?.slug}` : `/projects/${project?.id}/edit`}
        marginLeft="auto"
        size="sm"
      >
        {editMode ? 'View Public Page' : 'Edit Build'}
      </Button>
    </Flex>
  )
}

export default EditProjectBanner
