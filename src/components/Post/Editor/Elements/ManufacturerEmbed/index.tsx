import { Flex, Heading } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

type ManufacturerEmbedProps = {
  attributes: object,
  children: React.ReactNode,
  element: object,
}

const ManufacturerEmbed = (props: ManufacturerEmbedProps) => {
  const { attributes, children, element } = props

  const manufacturerQuery = trpc.manufacturers.getManufacturerById.useQuery(
    { id: element.manufacturerId },
    { enabled: !!element.manufacturerId },
  )

  const { data: manufacturer } = manufacturerQuery

  if (!element.manufacturerId) return null

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <Flex alignItems="center" borderWidth="1px" borderRadius="lg" padding="2">
          <Flex direction="column">
            <Heading size="md">
              {manufacturer?.title}
            </Heading>
          </Flex>
        </Flex>
      </div>
      {children}
    </div>
  )
}

export default ManufacturerEmbed
