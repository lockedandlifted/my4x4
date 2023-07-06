import { Link, SimpleGrid } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

import type { Prisma } from '@prisma/client'

import ImageThumb from '@components/Image/ImageThumb'

import ActivityContainer from '../ActivityContainer'

type ActivityItemWithIncludes = Prisma.ActivityItemGetPayload<{
  include: {
    subItems: true,
  },
}>

type ProjectsImageCreatedGroupedProps = {
  activityItem: ActivityItemWithIncludes,
}

const ProjectsImageCreatedGrouped = (props: ProjectsImageCreatedGroupedProps) => {
  const { activityItem } = props

  // User
  const userQuery = trpc.users.getUserById.useQuery({
    id: activityItem.ownerId,
  })

  const { data: user } = userQuery

  // Projects Images
  const projectsImagesIds = activityItem?.subItems?.map(subItem => subItem.subjectId)
  const projectsImagesQuery = trpc.projectsImages.getProjectsImages.useQuery({
    ids: projectsImagesIds,
    include: {
      image: true,
      project: true,
    },
    projectId: activityItem.subjectId,
  })

  const { data: projectsImages } = projectsImagesQuery
  const project = projectsImages?.[0]?.project

  return (
    <ActivityContainer>
      <ActivityContainer.Owner
        createdDate={activityItem?.createdAt}
        user={user}
      />

      <ActivityContainer.Text>
        New images were added.
        <Link fontWeight="bold" href={`/${project?.slug}/images`} marginLeft="1">
          View images of {project?.title}
        </Link>
      </ActivityContainer.Text>

      <ActivityContainer.Body>
        <SimpleGrid
          columns={2}
          gridTemplateColumns="repeat(auto-fill, minmax(40%, 1fr))"
          spacing="2"
        >
          {projectsImages?.map((projectsImage) => {
            const { id, image } = projectsImage

            return (
              <ImageThumb
                boxProps={{
                  height: '100%',
                  width: '100%',
                }}
                height={280}
                href={`/${project?.slug}/images/${id}`}
                image={image}
                key={id}
                width={280}
              />
            )
          })}
        </SimpleGrid>
      </ActivityContainer.Body>
    </ActivityContainer>
  )
}

export default ProjectsImageCreatedGrouped
