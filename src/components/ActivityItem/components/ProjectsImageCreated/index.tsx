import { Flex, Link } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

import type { ActivityItem } from '@prisma/client'

import Preview from '@components/Image/Preview'

import ActivityContainer from '../ActivityContainer'

type ProjectsImageCreatedProps = {
  activityItem: ActivityItem,
}

const ProjectsImageCreated = (props: ProjectsImageCreatedProps) => {
  const { activityItem } = props

  const projectsImageQuery = trpc.projectsImages.getProjectsImageById.useQuery({
    id: activityItem.subjectId,
  })

  const { data: projectsImage } = projectsImageQuery
  const image = projectsImage?.image
  const project = projectsImage?.project
  const user = projectsImage?.image?.user

  return (
    <ActivityContainer>
      <ActivityContainer.Owner
        createdDate={projectsImage?.createdAt}
        user={user}
      />

      <ActivityContainer.Text>
        A new image was added to {project?.title}.
        <Link fontWeight="bold" href={`/${project?.slug}/images/${projectsImage?.id}`} marginLeft="1">Read More</Link>
      </ActivityContainer.Text>

      <ActivityContainer.Body>
        <Flex borderRadius="xl" overflow="hidden" width="100%">
          <Preview
            enableTagging={false}
            image={image}
            projectsImage={projectsImage}
          />
        </Flex>
      </ActivityContainer.Body>
    </ActivityContainer>
  )
}

export default ProjectsImageCreated
