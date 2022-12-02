import { Flex } from '@chakra-ui/react'
import Head from 'next/head'

import Footer from '@components/Footer'
import Header from '@components/Header'

interface MobileLayoutProps {
  children: React.ReactNode
}

const MobileLayout = (props: MobileLayoutProps) => {
  const { children } = props

  return (
    <Flex justifyContent="center">
      <Head>
        <title>MY4X4 | Detailed info and specs of your favourite 4wds</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex flexDirection="column" width={['100%', 600]}>
        <Header />

        <Flex flexDirection="column" padding="4" width="100%">
          {children}
        </Flex>

        <Footer />
      </Flex>
    </Flex>
  )
}

export default MobileLayout
