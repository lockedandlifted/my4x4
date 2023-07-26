import { Flex, Heading } from '@chakra-ui/react'

import type { Business } from '@prisma/client'

import { trpc } from '@utils/trpc'

import Location from './Location'

type LocationsProps = {
  business: Business,
  editMode?: boolean,
}

const Locations = (props: LocationsProps) => {
  const { business, editMode = false } = props

  const businessLocationsQuery = trpc.businessLocations.getBusinessLocations.useQuery(
    { businessId: business?.id },
    { enabled: !!business?.id },
  )
  const { data: businessLocations = [] } = businessLocationsQuery

  if (!editMode && businessLocations.length === 0) {
    return null
  }

  return (
    <Flex flexDirection="column" marginTop={8}>
      <Heading size="sm">
        Locations
      </Heading>

      {businessLocations.map(businessLocation => (
        <Location
          businessLocation={businessLocation}
          key={businessLocation.id}
        />
      ))}
    </Flex>
  )
}

export default Locations
