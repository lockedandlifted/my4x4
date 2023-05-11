import { Button, Heading } from '@chakra-ui/react'

import type { Project } from '@prisma/client'

type ActionsProps = {
  project: Project,
}

const Actions = (props: ActionsProps) => {
  const { project } = props

  return (
    <>
      <Heading size="sm" marginTop={8} marginBottom={4}>
        Actions
      </Heading>

      <Button
        as="a"
        colorScheme="blue"
        href="/projects/new"
        size="lg"
      >
        Add a Build
      </Button>

      <Button
        as="a"
        href="/search"
        marginTop={2}
        size="lg"
      >
        Browse Builds
      </Button>
    </>

  )
}

export default Actions
