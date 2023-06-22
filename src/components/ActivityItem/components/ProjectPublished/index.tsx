import { Link } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

import type { ActivityItem } from '@prisma/client'

import ProjectTile from '@components/ProjectTile'

import ActivityContainer from '../ActivityContainer'

type ProjectPublishedProps = {
  activityItem: ActivityItem,
}

const ProjectPublished = (props: ProjectPublishedProps) => {
  const { activityItem } = props

  const projectQuery = trpc.projects.getProjectById.useQuery({
    id: activityItem.subjectId,
  })

  const { data: project } = projectQuery
  const user = project?.projectsUsers?.[0]?.user

  return (
    <ActivityContainer>
      <ActivityContainer.Owner
        createdDate={project?.createdAt}
        user={user}
      />

      <ActivityContainer.Text>
        A new project was published.
        <Link fontWeight="bold" href={`/${project?.slug}`} marginLeft="1">
          View details of {project?.title}
        </Link>
      </ActivityContainer.Text>

      <ActivityContainer.Body>
        {!!project && (
          <ProjectTile boxProps={{ marginBottom: 0 }} project={project} />
        )}
      </ActivityContainer.Body>
    </ActivityContainer>
  )
}

export default ProjectPublished
