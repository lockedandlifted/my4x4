import { Flex, Heading, Text } from '@chakra-ui/react'
import { FaAngleRight } from 'react-icons/fa'

import type { Prisma } from '@prisma/client'

type ManufacturerPartWithManufacturer = Prisma.ManufacturerPartGetPayload<{
  include: {
    category: true,
    manufacturer: true,
  },
}>

type PartProps = {
  href?: string,
  last: boolean,
  manufacturerPart: ManufacturerPartWithManufacturer,
}

const Part = (props: PartProps) => {
  const { href, last, manufacturerPart } = props

  return (
    <Flex
      alignItems="center"
      as={href ? 'a' : 'div'}
      borderBottomWidth={last ? 0 : 1}
      href={href}
      padding={4}
    >
      <Flex justifyContent="center" flexDirection="column">
        <Heading size="xs">
          {manufacturerPart.manufacturer?.title}
        </Heading>

        <Text fontSize="sm" noOfLines={1}>{manufacturerPart.title}</Text>
      </Flex>

      <Text color="gray.300" fontSize="xl" marginLeft="auto">
        <FaAngleRight />
      </Text>
    </Flex>
  )
}

export default Part
