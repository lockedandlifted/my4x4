import { Flex, Heading, Text } from '@chakra-ui/react'
import { FaMapMarkerAlt } from 'react-icons/fa'

import type { BusinessLocation } from '@prisma/client'

type LocationProps = {
  businessLocation: BusinessLocation,
}

const Location = (props: LocationProps) => {
  const { businessLocation } = props

  return (
    <Flex
      alignItems="center"
      as="a"
      borderWidth={1}
      borderRadius="xl"
      marginTop={4}
      padding={2}
      target="_blank"
      rel="noopener noreferrer"
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
          {businessLocation?.title}
        </Heading>

        <Text color="gray.500" fontSize="sm" fontStyle="italic">
          {businessLocation?.phone}
        </Text>
      </Flex>
    </Flex>
  )
}

export default Location
