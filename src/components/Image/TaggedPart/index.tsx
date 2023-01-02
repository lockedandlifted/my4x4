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

type TaggedPartProps = {
  href?: string,
  iconContent?: React.ReactNode,
  manufacturerPart: ManufacturerPartWithManufacturer,
}

const TaggedPart = (props: TaggedPartProps) => {
  const { href, iconContent, manufacturerPart } = props

  return (
    <Flex
      alignItems="center"
      as={href ? 'a' : 'div'}
      borderWidth={1}
      borderRadius="xl"
      href={href}
      marginTop={2}
      padding={2}
    >
      <Flex
        alignItems="center"
        backgroundColor="black"
        borderRadius="100%"
        height={10}
        justifyContent="center"
        width={10}
      >
        <Text color="white" fontSize="md" fontWeight="bold">
          {iconContent || '1'}
        </Text>
      </Flex>

      <Flex justifyContent="center" flexDirection="column" marginLeft={4}>
        <Heading size="small">
          {manufacturerPart.manufacturer?.title}
        </Heading>

        <Text fontSize="sm">{manufacturerPart.title}</Text>
      </Flex>

      <Text color="gray.300" fontSize="xl" marginLeft="auto">
        <FaAngleRight />
      </Text>
    </Flex>
  )
}

export default TaggedPart
