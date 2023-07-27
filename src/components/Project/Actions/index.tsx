import { Button, Heading } from '@chakra-ui/react'

import type { Project } from '@prisma/client'

type ActionsProps = {
  callbacks?: {
    publishProject: VoidFunction,
    unpublishProject: VoidFunction,
  },
  editMode?: boolean,
  project: Project,
}

const Actions = (props: ActionsProps) => {
  const { callbacks, editMode = false, project } = props

  return (
    <>
      <Heading size="sm" marginTop={8} marginBottom={4}>
        Actions
      </Heading>

      {editMode && !project?.published && callbacks?.publishProject && (
        <Button
          as="a"
          onClick={callbacks.publishProject}
          size="lg"
        >
          Publish Project
        </Button>
      )}

      {editMode && project?.published && callbacks?.unpublishProject && (
        <Button
          as="a"
          onClick={callbacks.unpublishProject}
          size="lg"
        >
          Unpublish Project
        </Button>
      )}

      {!editMode && (
        <>
          <Button
            as="a"
            colorScheme="blue"
            href={`/${project?.slug}/questions`}
            size="lg"
          >
            Ask a Question
          </Button>

          <Button
            as="a"
            href="/projects/new"
            marginTop={2}
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
      )}
    </>

  )
}

export default Actions
