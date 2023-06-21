import { Link, Text } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

import type { ActivityItem } from '@prisma/client'

import ProjectsPart from './ProjectsPart'

import ActivityContainer from '../ActivityContainer'

type ProjectsPartCreatedProps = {
  activityItem: ActivityItem,
}

const ProjectsPartCreated = (props: ProjectsPartCreatedProps) => {
  const { activityItem } = props

  const projectsPartQuery = trpc.projectsParts.getProjectsPartById.useQuery({
    id: activityItem.subjectId,
  })

  const { data: projectsPart } = projectsPartQuery
  const category = projectsPart?.manufacturerPart?.category
  const project = projectsPart?.project
  const user = projectsPart?.user

  if (!projectsPart) {
    return null
  }

  return (
    <ActivityContainer>
      <ActivityContainer.Owner
        createdDate={projectsPart?.createdAt}
        user={user}
      />

      <ActivityContainer.Text>
        A new part was added.
        <Link fontWeight="bold" href={`/${project?.slug}/parts/${projectsPart?.id}`} marginLeft="1">
          {projectsPart?.manufacturerPart?.manufacturer?.title} {projectsPart?.manufacturerPart?.title} installed on {project?.title}
        </Link>
      </ActivityContainer.Text>

      <ActivityContainer.Body>
        <ProjectsPart category={category} projectsPart={projectsPart} />
      </ActivityContainer.Body>
    </ActivityContainer>
  )
}

export default ProjectsPartCreated
