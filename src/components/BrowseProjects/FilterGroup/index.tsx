import { Flex, Text } from '@chakra-ui/react'

import Tag from './Tag'

type FilterGroupProps = {
  children: React.ReactNode,
  title: string,
}

const FilterGroup = (props: FilterGroupProps) => {
  const { children, title } = props

  return (
    <Flex direction="column" marginTop="4">
      <Text color="gray.600" fontSize="sm" fontWeight="bold">
        {title}
      </Text>

      <Flex flexWrap="wrap" marginTop="2">
        {children}
      </Flex>
    </Flex>
  )
}

FilterGroup.Tag = Tag

export default FilterGroup
