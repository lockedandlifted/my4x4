import { useRouter } from 'next/router'

import { trpc } from '@utils/trpc'

import MobileLayout from '@layouts/MobileLayout'

import Actions from '@components/Business/Actions'
import BusinessForm from '@components/BusinessForm'
import Locations from '@components/Business/Locations'

const EditBusinessPage = () => {
  const { query: { businessId } } = useRouter()

  const businessQuery = trpc.businesses.getBusinessById.useQuery({ id: businessId }, {
    enabled: !!businessId,
  })
  const { data: business } = businessQuery

  return (
    <MobileLayout>
      <BusinessForm business={business} />
      <Locations business={business} />
      <Actions business={business} />
    </MobileLayout>
  )
}

export default EditBusinessPage
