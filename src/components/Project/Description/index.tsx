import { useState } from 'react'
import { Flex, Heading, Link } from '@chakra-ui/react'

import Paragraph from '@components/Paragraph'

import type { Project } from '@prisma/client'

import Tags from '../Tags'

type DescriptionProps = {
  project: Project,
}

const Description = (props: DescriptionProps) => {
  const { project } = props

  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Flex direction="column" marginTop="8">
      <Heading size="sm">Build Details</Heading>

      <Heading as="h1" marginTop="4" size="lg">{project?.title}</Heading>

      <Tags project={project} />

      {!!project?.description && (
        <>
          <Paragraph marginTop="4" noOfLines={isExpanded ? undefined : 4}>
            {project.description}
          </Paragraph>

          <Link color="teal.500" fontWeight="bold" marginTop="2" onClick={() => setIsExpanded(!isExpanded)}>
            Read {isExpanded ? 'Less' : 'More'}
          </Link>
        </>
      )}
    </Flex>
  )
}

export default Description
