import { useRouter } from 'next/router'
import { Flex } from '@chakra-ui/react'

import DefaultLayout from '@layouts/MobileLayout'

const BuildPartsPage = () => {
  const { query: { projectSlug } } = useRouter()

  return (
    <DefaultLayout>
      <Flex width="100%">{projectSlug} Parts</Flex>
    </DefaultLayout>
  )
}

export default BuildPartsPage
