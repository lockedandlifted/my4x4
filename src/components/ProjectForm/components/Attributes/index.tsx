import { Flex, Heading } from '@chakra-ui/react'

import type { Prisma } from '@prisma/client'

type ProjectWithAttributes = Prisma.ProjectGetPayload<{
  include: {
    projectsAttributes: {
      include: {
        attribute: true,
      },
    },
  },
}>

type AttributesProps = {
  project: ProjectWithAttributes,
}

const Attributes = (props: AttributesProps) => {
  const { project } = props
  const projectsAttributes = project?.projectsAttributes || []

  return (
    <Flex direction="column" marginTop="8">
      <Heading size="md" marginBottom="4">Attributes</Heading>

      <table>
        <tbody>
          {projectsAttributes.map((projectsAttribute) => {
            const { attribute, id, value } = projectsAttribute

            return (
              <tr key={id}>
                <td style={{ fontWeight: 'bold', width: '30%' }}>{attribute.title}</td>
                <td style={{ width: '70%' }}>{value}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Flex>
  )
}

export default Attributes
