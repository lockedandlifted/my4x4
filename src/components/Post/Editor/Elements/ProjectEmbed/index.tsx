import { Flex, Heading } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

import ImageThumb from '@components/Image/ImageThumb'
import Tags from '@components/Project/Tags'

type ProjectEmbedProps = {
  attributes: object,
  children: React.ReactNode,
  element: object,
}

const ProjectEmbed = (props: ProjectEmbedProps) => {
  const { attributes, children, element } = props

  const projectQuery = trpc.projects.getProjectById.useQuery(
    { id: element.projectId },
    { enabled: !!element.projectId },
  )

  const { data: project } = projectQuery

  if (!element.projectId) return null

  const image = project?.projectsImages?.[0]?.image

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <Flex alignItems="center" borderWidth="1px" borderRadius="lg" padding="2">
          <ImageThumb href="" image={image} />

          <Flex direction="column" marginLeft="4">
            <Heading size="md">
              {project?.title}
            </Heading>

            <Tags marginTop="2" project={project} />
          </Flex>
        </Flex>
      </div>
      {children}
    </div>
  )
}

export default ProjectEmbed
