import { Flex, SimpleGrid } from '@chakra-ui/react'

import { Project } from '@prisma/client'

import ProjectsPartsButton from '../ProjectsPartsButton'
import LikeButton from '../LikeButton'

type SocialActionsProps = {
  project: Project,
}

const SocialActions = (props: SocialActionsProps) => {
  const { project } = props

  return (
    <SimpleGrid
      columns={2}
      gridTemplateColumns="repeat(auto-fill, minmax(40%, 1fr))"
      marginTop="4"
      spacing="4"
    >
      <LikeButton project={project} />
      <ProjectsPartsButton project={project} />
    </SimpleGrid>
  )
}

export default SocialActions
