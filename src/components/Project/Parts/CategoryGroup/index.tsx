import { Flex, Heading, Text } from '@chakra-ui/react'

import type { Category, Project, ProjectsPart } from '@prisma/client'

import PartIcon from '@components/Icons/PartIcon'

import Part from './Part'

type CategoryGroupProps = {
  category: Category,
  editMode?: boolean,
  project: Project,
  projectsParts: ProjectsPart[],
}

const CategoryGroup = (props: CategoryGroupProps) => {
  const {
    category,
    editMode = false,
    href,
    project,
    projectsParts,
  } = props

  return (
    <Flex
      alignItems="flex-start"
      as={href ? 'a' : 'div'}
      direction="column"
      flexDirection="column"
      href={href}
      marginY={2}
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
        {projectsParts.map((projectsPart, index) => {
          const { id, manufacturerPart } = projectsPart

          if (!manufacturerPart) return null

          return (
            <Part
              href={editMode ? `/projects/${project?.id}/edit/parts/${id}` : `/${project?.slug}/parts/${id}`}
              key={id}
              last={index + 1 === projectsParts.length}
              manufacturerPart={manufacturerPart}
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default CategoryGroup
