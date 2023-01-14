import NextLink from 'next/link'
import { FaAngleLeft } from 'react-icons/fa'

import { Flex, Text } from '@chakra-ui/react'

import type { Project } from '@prisma/client'

type BackToProjectButtonProps = {
  editMode: boolean,
  path?: string,
  project: Project,
}

const BackToProjectButton = (props: BackToProjectButtonProps) => {
  const { editMode = false, path = '', project } = props

  const baseHref = editMode ? `/projects/${project?.id}/edit` : `/${project?.slug}`
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

        <Text fontWeight="bold" marginLeft={1}>{project?.title}</Text>
      </Flex>
    </NextLink>
  )
}

export default BackToProjectButton
