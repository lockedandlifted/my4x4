import { Flex, Heading } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

type ManufacturerModelEmbedProps = {
  attributes: object,
  children: React.ReactNode,
  element: object,
}

const ManufacturerModelEmbed = (props: ManufacturerModelEmbedProps) => {
  const { attributes, children, element } = props

  const manufacturerModelQuery = trpc.manufacturerModels.getManufacturerModelById.useQuery(
    { id: element.manufacturerModelId },
    { enabled: !!element.manufacturerModelId },
  )

  const { data: manufacturerModel } = manufacturerModelQuery

  if (!element.manufacturerModelId) return null

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <Flex alignItems="center" borderWidth="1px" borderRadius="lg" padding="2">
          <Flex direction="column">
            <Heading size="md">
              {manufacturerModel?.title}
            </Heading>
          </Flex>
        </Flex>
      </div>
      {children}
    </div>
  )
}

export default ManufacturerModelEmbed
