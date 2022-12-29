import { Button, Heading } from '@chakra-ui/react'

import type { GetServerSideProps } from 'next'

import setupTrpcCaller from '@utils/setupTrpcCaller'

import MobileLayout from '@layouts/MobileLayout'

const ExternalLink = () => (
  <MobileLayout>
    <Heading marginTop={8} textAlign="center">
      Whoops... looks like you are offroading.
    </Heading>

    <Button as="a" colorScheme="gray" href="/" marginTop={8} size="lg">
      Back Home
    </Button>
  </MobileLayout>
)

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { params: { externalLinkId } } = context

  const trpcCaller = await setupTrpcCaller(context)
  const externalLink = await trpcCaller.externalLinks.getExternalLinkById({
    id: externalLinkId,
  })

  if (!externalLink) {
    return {
      props: {},
    }
  }

  // Add View
  await trpcCaller.externalLinkViews.createExternalLinkView({
    externalLinkId: externalLink.id,
  })

  return {
    redirect: {
      destination: externalLink.url,
      permanent: true,
    },
  }
}

export default ExternalLink
