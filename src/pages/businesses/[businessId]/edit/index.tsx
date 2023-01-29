import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { trpc } from '@utils/trpc'

import MobileLayout from '@layouts/MobileLayout'

import BackToBusinessButton from '@components/Business/BackToBusinessButton'
import BusinessForm from '@components/BusinessForm'

const EditBusinessPage = () => {
  const { query: { businessId } } = useRouter()

  const businessQuery = trpc.businesses.getBusinessById.useQuery({ id: businessId }, {
    enabled: !!businessId,
  })
  const { data: business } = businessQuery

  console.log(business)

  return (
    <MobileLayout>
      <BusinessForm business={business} />
    </MobileLayout>
  )
}

export default EditBusinessPage
