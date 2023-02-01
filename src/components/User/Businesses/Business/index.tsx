import { Flex, Heading, Text } from '@chakra-ui/react'
import { FaMapMarkerAlt } from 'react-icons/fa'

import type { Business } from '@prisma/client'

type BusinessProps = {
  business: Business,
  href: string,
}

const Business = (props: BusinessProps) => {
  const { business, href } = props

  return (
    <Flex
      alignItems="center"
      as="a"
      borderWidth={1}
      borderRadius="xl"
      href={href}
      marginTop={4}
      padding={2}
    >
      <Flex
        alignItems="center"
        backgroundColor="gray.50"
        borderRadius="xl"
        height={14}
        justifyContent="center"
        width={14}
      >
        <FaMapMarkerAlt />
      </Flex>

      <Flex justifyContent="center" flexDirection="column" marginLeft={4}>
        <Heading size="small">
          {business?.title}
        </Heading>

        <Text color="gray.500" fontSize="sm" fontStyle="italic">
          {business?.website}
        </Text>
      </Flex>
    </Flex>
  )
}

export default Business
