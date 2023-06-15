import { trpc } from '@utils/trpc'

import MobileLayout from '@layouts/MobileLayout'

import ProjectTile from '@components/ProjectTile'

const RecentPage = () => {
  const projectsQuery = trpc.projects.getRecentProjects.useQuery({
    limit: 10,
  })
  const { data: projects } = projectsQuery

  return (
    <MobileLayout>
      {projects?.map(project => (
        <ProjectTile key={project.id} project={project} />
      ))}
    </MobileLayout>
  )
}

export default RecentPage
