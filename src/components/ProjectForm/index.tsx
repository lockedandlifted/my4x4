import { Flex, Heading } from '@chakra-ui/react'

import type { Project } from '@prisma/client'

type ProjectFormProps = {
  project?: Project,
}

const ProjectForm = (props: ProjectFormProps) => {
  const { project } = props

  return (
    <Flex width="100%">
      <Heading fontWeight="medium" size="lg">
        {project?.id ? 'Edit' : 'Add'} Your Build
      </Heading>
    </Flex>
  )
}

export default ProjectForm
