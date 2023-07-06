import { Flex, SimpleGrid } from '@chakra-ui/react'

import { Project } from '@prisma/client'

import LikeButton from '../LikeButton'
import ShareButton from '../ShareButton'

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
      <ShareButton project={project} />
    </SimpleGrid>
  )
}

export default SocialActions
