import {
  Button, Flex, Heading, SimpleGrid,
} from '@chakra-ui/react'

import type { User } from '@prisma/client'

import { trpc } from '@utils/trpc'

import Business from './Business'

type BusinessesProps = {
  editMode: boolean,
  user: User,
}

const Businesses = (props: BusinessesProps) => {
  const { editMode = false, user } = props

  // Query
  const businessesQuery = trpc.businesses.getBusinesses.useQuery({
    userId: user?.id,
  }, { enabled: !!user?.id })

  const { data: businesses = [] } = businessesQuery

  return (
    <Flex flexDirection="column" marginTop={8}>
      <Flex justifyContent="space-between">
        <Heading size="md">Businesses</Heading>
      </Flex>

      {businesses.map(business => (
        <Business
          business={business}
          href={editMode ? `/businesses/${business.id}/edit` : ''}
          key={business.id}
        />
      ))}

      {editMode && (
        <Button
          as="a"
          href="/businesses/new"
          marginTop={2}
          size="lg"
        >
          New Business
        </Button>
      )}
    </Flex>
  )
}

export default Businesses
