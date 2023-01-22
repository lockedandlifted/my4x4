import { Flex } from '@chakra-ui/react'
import Head from 'next/head'
import { motion } from 'framer-motion'

import Footer from '@components/Footer'
import Header from '@components/Header'

interface MobileLayoutProps {
  children: React.ReactNode,
}

const MobileLayout = (props: MobileLayoutProps) => {
  const { children } = props

  return (
    <Flex justifyContent="center">
      <Head>
        <title>MY4X4 | Detailed info and specs of your favourite 4wds</title>
        <meta name="description" content="Add your build. Find and research similar builds to get inspiration." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex flexDirection="column" width={['100%', 600]}>
        <Header />

        <Flex flexDirection="column" paddingX="4" width="100%">
          <motion.div
            initial={{ x: 200, opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0.5 }}
            transition={{
              type: 'tween',
              ease: 'easeInOut',
              duration: 0.3,
            }}
          >
            {children}
          </motion.div>
        </Flex>

        <Footer />
      </Flex>
    </Flex>
  )
}

export default MobileLayout
