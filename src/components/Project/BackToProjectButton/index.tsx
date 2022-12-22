import NextLink from 'next/link'

import { Flex, Text } from '@chakra-ui/react'

import type { Project } from '@prisma/client'

type BackToProjectButtonProps = {
  project: Project,
}

const BackToProjectButton = (props: BackToProjectButtonProps) => {
  const { project } = props

  return (
    <NextLink href={`/${project?.slug}`}>
      <Flex
        borderRadius="lg"
        backgroundColor="gray.50"
        justifyContent="center"
        marginBottom={4}
        padding="4"
        width="100%"
      >
        <Text fontWeight="bold">{project?.title}</Text>
      </Flex>
    </NextLink>
  )
}

export default BackToProjectButton
