import { useState } from 'react'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

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

  const [expanded, setExpanded] = useState(false)

  return (
    <Flex
      alignItems="flex-start"
      as={href ? 'a' : 'div'}
      borderWidth={1}
      borderRadius="xl"
      direction="column"
      flexDirection="column"
      href={href}
      marginTop={2}
    >
      <Flex
        alignItems="center"
        borderBottomWidth={expanded ? 1 : 0}
        borderBottomStyle="dashed"
        cursor="pointer"
        onClick={() => setExpanded(!expanded)}
        padding={4}
        width="100%"
      >
        <Flex
          alignItems="center"
          backgroundColor="gray.50"
          borderRadius="xl"
          flexShrink={0}
          height={12}
          justifyContent="center"
          width={12}
        >
          <Text color="gray.400" fontSize="2xl">
            <PartIcon categoryKey={category?.key} />
          </Text>
        </Flex>

        <Heading marginLeft={4} size="small">
          {category?.title || 'Other'}
        </Heading>

        <Text color="gray.300" fontSize="xl" marginLeft="auto">
          {expanded ? <FaAngleUp /> : <FaAngleDown />}
        </Text>
      </Flex>

      {expanded && (
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
      )}
    </Flex>
  )
}

export default CategoryGroup
