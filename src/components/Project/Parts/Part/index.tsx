import { Flex, Heading, Text } from '@chakra-ui/react'
import { FaAngleRight } from 'react-icons/fa'

import type { Prisma } from '@prisma/client'

import PartIcon from '@components/Icons/PartIcon'

type ManufacturerPartWithManufacturer = Prisma.ManufacturerPartGetPayload<{
  include: {
    category: true,
    manufacturer: true,
  },
}>

type PartProps = {
  href?: string,
  manufacturerPart: ManufacturerPartWithManufacturer,
}

const Part = (props: PartProps) => {
  const { href, manufacturerPart } = props

  return (
    <Flex
      alignItems="center"
      as={href ? 'a' : 'div'}
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
        flexShrink={0}
        height={16}
        justifyContent="center"
        width={16}
      >
        <Text color="gray.400" fontSize="2xl">
          <PartIcon categoryKey={manufacturerPart?.category?.key} />
        </Text>
      </Flex>

      <Flex justifyContent="center" flexDirection="column" marginLeft={4}>
        <Heading size="small">
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
