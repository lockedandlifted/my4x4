import { Flex, Heading, Text } from '@chakra-ui/react'

import type {
  Category, ProjectsPart as ProjectsPartType,
} from '@prisma/client'

import PartIcon from '@components/Icons/PartIcon'

import Part from '@components/Project/Parts/CategoryGroup/Part'

type ProjectsPartProps = {
  category: Category,
  projectsPart: ProjectsPartType,
}

const ProjectsPart = (props: ProjectsPartProps) => {
  const { category, projectsPart } = props

  return (
    <Flex borderWidth="1px" borderRadius="xl" padding="4" width="100%">
      <Flex
        alignItems="flex-start"
        direction="column"
        flexDirection="column"
        width="100%"
      >
        <Flex
          alignItems="center"
          cursor="pointer"
          paddingBottom="2"
          width="100%"
        >
          <Flex
            alignItems="center"
            backgroundColor="gray.50"
            borderRadius="xl"
            flexShrink={0}
            height={10}
            justifyContent="center"
            width={10}
          >
            <Text color="gray.500" fontSize="2xl">
              <PartIcon categoryKey={category?.key} />
            </Text>
          </Flex>

          <Heading marginLeft={4} size="small">
            {category?.title || 'Other'}
          </Heading>
        </Flex>

        <Flex direction="column" width="100%">
          <Part
            href={`/${projectsPart?.project?.slug}/parts/${projectsPart?.id}`}
            last
            manufacturerPart={projectsPart?.manufacturerPart}
          />
        </Flex>
      </Flex>
    </Flex>

  )
}

export default ProjectsPart
