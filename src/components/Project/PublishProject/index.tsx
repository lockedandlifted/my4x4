import {
  Alert,
  AlertDescription,
  Button,
  Flex,
} from '@chakra-ui/react'

import type { Project } from '@prisma/client'

type PublishProjectProps = {
  callbacks: {
    publishProject: VoidFunction,
  },
  project: Project,
}

const PublishProject = (props: PublishProjectProps) => {
  const { callbacks: { publishProject }, project } = props

  if (project?.published) return null

  const image = project?.projectsImages?.[0]?.image
  const hasImage = !!image

  return (
    <Alert
      borderRadius="xl"
      marginTop={4}
      padding={8}
      status="info"
      variant="subtle"
    >
      <Flex alignItems="flex-start" direction="column">
        <AlertDescription>
          Build is not Published and therefore not visible to the public. {!hasImage && 'Add images to publish.'}
        </AlertDescription>

        {hasImage && (
          <Button
            as="a"
            colorScheme="blue"
            onClick={publishProject}
            marginTop={4}
            size="md"
          >
            Publish Project
          </Button>
        )}
      </Flex>
    </Alert>
  )
}

export default PublishProject
