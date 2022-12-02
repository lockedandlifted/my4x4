import { useRouter } from 'next/router'
import { Flex } from '@chakra-ui/react'

import MobileLayout from '@layouts/MobileLayout'

const BuildPartsPage = () => {
  const { query: { projectSlug } } = useRouter()

  return (
    <MobileLayout>
      <Flex width="100%">{projectSlug} Parts</Flex>
    </MobileLayout>
  )
}

export default BuildPartsPage
