import { Button } from '@chakra-ui/react'
import { FaWrench } from 'react-icons/fa'

import { trpc } from '@utils/trpc'

import type { Project } from '@prisma/client'

type ProjectsPartsButtonProps = {
  project: Project,
}

const ProjectsPartsButton = (props: ProjectsPartsButtonProps) => {
  const { project } = props

  const { data: projectsPartsCount = 0 } = trpc.projectsParts.getProjectsPartsCount.useQuery(
    { projectId: project?.id },
    { enabled: !!project?.id },
  )

  return (
    <Button
      colorScheme="gray"
      leftIcon={<FaWrench fontSize={24} />}
      // onClick={() => console.log('launch add part modal')}
      size="lg"
      width="100%"
    >
      {projectsPartsCount} {projectsPartsCount === 1 ? 'Part' : 'Parts'}
    </Button>
  )
}

export default ProjectsPartsButton
