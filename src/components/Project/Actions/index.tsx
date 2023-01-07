import { Button, Heading } from '@chakra-ui/react'

import type { Project } from '@prisma/client'

type ActionsProps = {
  project: Project,
}

const Actions = (props: ActionsProps) => {
  const { project } = props

  return (
    <>
      <Heading size="md" marginTop={8} marginBottom={4}>
        Actions
      </Heading>

      <Button
        as="a"
        href={`/projects/${project?.id}/edit/details`}
        size="lg"
      >
        Edit Build Details
      </Button>
    </>

  )
}

export default Actions
