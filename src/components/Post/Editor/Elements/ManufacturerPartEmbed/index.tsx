import { Flex, Heading } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

type ManufacturerPartEmbedProps = {
  attributes: object,
  children: React.ReactNode,
  element: object,
}

const ManufacturerPartEmbed = (props: ManufacturerPartEmbedProps) => {
  const { attributes, children, element } = props

  const manufacturerPartQuery = trpc.manufacturerParts.getManufacturerPartById.useQuery(
    { id: element.manufacturerPartId },
    { enabled: !!element.manufacturerPartId },
  )

  const { data: manufacturerPart } = manufacturerPartQuery

  if (!element.manufacturerPartId) return null

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <Flex alignItems="center" borderWidth="1px" borderRadius="lg" padding="2">
          <Flex direction="column">
            <Heading size="md">
              {manufacturerPart?.title}
            </Heading>
          </Flex>
        </Flex>
      </div>
      {children}
    </div>
  )
}

export default ManufacturerPartEmbed
