import { Flex, Link, SimpleGrid } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

import type { Prisma, Project, ProjectsPart } from '@prisma/client'

import useProjectParts from '@hooks/useProjectParts'

import CategoryGroup from '@components/Project/Parts/CategoryGroup'

import ActivityContainer from '../ActivityContainer'

type ProjectsPartWithIncludes = Prisma.ProjectsPartGetPayload<{
  include: {
    manufacturerPart: {
      include: {
        manufacturer: true,
      },
    },
  },
}>

const buildLink = (project: Project, projectsParts: ProjectsPartWithIncludes[]) => {
  if (projectsParts) {
    const firstPart = projectsParts[0]
    const otherPartsCount = projectsParts.length - 1

    return (
      <Link fontWeight="bold" href={`/${project?.slug}`} marginLeft="1">
        {firstPart?.manufacturerPart?.manufacturer?.title} {firstPart?.manufacturerPart?.title} and {otherPartsCount} other {otherPartsCount === 1 ? 'part' : 'parts'} added to {project?.title}
      </Link>
    )
  }

  return null
}

type ActivityItemWithIncludes = Prisma.ActivityItemGetPayload<{
  include: {
    subItems: true,
  },
}>

type ProjectsPartCreatedGroupedProps = {
  activityItem: ActivityItemWithIncludes,
}

const ProjectsPartCreatedGrouped = (props: ProjectsPartCreatedGroupedProps) => {
  const { activityItem } = props

  // User
  const userQuery = trpc.users.getUserById.useQuery({
    id: activityItem.ownerId,
  })

  const { data: user } = userQuery

  // Projects Parts
  const projectsPartsIds = activityItem?.subItems?.map(subItem => subItem.subjectId)
  const projectPartsPayload = useProjectParts({ id: activityItem.subjectId }, {
    queryOptions: {
      ids: projectsPartsIds,
      include: {
        project: true,
      },
    },
  })
  const { groupedParts, projectsParts } = projectPartsPayload

  const project = projectsParts?.[0]?.project

  return (
    <ActivityContainer>
      <ActivityContainer.Owner
        createdDate={activityItem?.createdAt}
        user={user}
      />

      <ActivityContainer.Text>
        New parts were added.
        {buildLink(project, projectsParts)}
      </ActivityContainer.Text>

      <ActivityContainer.Body>
        <Flex
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="lg"
          direction="column"
          padding="4"
        >
          {groupedParts.map((group) => {
            const {
              category,
              key,
              projectsParts: groupProjectsParts,
            } = group

            return (
              <CategoryGroup
                category={category}
                key={key}
                project={project}
                projectsParts={groupProjectsParts}
              />
            )
          })}
        </Flex>
      </ActivityContainer.Body>
    </ActivityContainer>
  )
}

export default ProjectsPartCreatedGrouped
