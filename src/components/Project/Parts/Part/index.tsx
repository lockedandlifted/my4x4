import { Flex, Heading, Text } from '@chakra-ui/react'

import type { Prisma } from '@prisma/client'

type ManufacturerPartWithManufacturer = Prisma.ManufacturerPartGetPayload<{
  include: {
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
      <Flex backgroundColor="gray.200" borderRadius="xl" height={16} width={16} />

      <Flex justifyContent="center" flexDirection="column" marginLeft={4}>
        <Heading size="small">
          {manufacturerPart.manufacturer?.title}
        </Heading>

        <Text>{manufacturerPart.title}</Text>
      </Flex>
    </Flex>
  )
}

export default Part
