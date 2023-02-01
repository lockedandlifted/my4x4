import NextLink from 'next/link'
import { FaAngleLeft } from 'react-icons/fa'

import { Flex, Text } from '@chakra-ui/react'

import type { Business } from '@prisma/client'

type BackToBusinessButtonProps = {
  editMode: boolean,
  path?: string,
  business: Business,
}

const BackToBusinessButton = (props: BackToBusinessButtonProps) => {
  const { editMode = false, path = '', business } = props

  const baseHref = editMode ? `/businesses/${business?.id}/edit` : `/businesses/${business?.id}`
  const href = `${baseHref}${path}`

  return (
    <NextLink href={href}>
      <Flex
        alignItems="center"
        borderBottomWidth={1}
        justifyContent="flex-start"
        marginBottom={4}
        paddingY={4}
        width="100%"
      >
        <Text fontSize="xl">
          <FaAngleLeft />
        </Text>

        <Text fontWeight="bold" marginLeft={1}>{business?.title}</Text>
      </Flex>
    </NextLink>
  )
}

export default BackToBusinessButton
