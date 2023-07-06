import { Flex, Heading } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

import FilterGroup from '@components/BrowseProjects/FilterGroup'

const BrowseManufacturers = () => {
  // Load Manufacturers
  const manufacturersQuery = trpc.manufacturers.getManufacturers.useQuery({
    manufacturerTypeKey: 'vehicle',
  })

  const { data: manufacturers = [] } = manufacturersQuery

  return (
    <Flex
      borderTopWidth="1px"
      borderStyle="dashed"
      direction="column"
      marginTop="8"
      paddingTop="8"
      width="100%"
    >
      <Heading as="h1" fontWeight="medium" marginBottom="4" size="lg">
        Browse Manufacturers
      </Heading>

      <FilterGroup title="Manufacturer">
        <FilterGroup.Tag
          href="/search"
          isSelected={false}
        >
          All Builds
        </FilterGroup.Tag>

        {manufacturers.map((manufacturer) => {
          const { id, title } = manufacturer

          return (
            <FilterGroup.Tag
              href={`/search?manufacturerId=${id}`}
              key={id}
              isSelected={false}
            >
              {title}
            </FilterGroup.Tag>
          )
        })}
      </FilterGroup>
    </Flex>
  )
}

export default BrowseManufacturers
