import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import { motion } from 'framer-motion'

import Footer from '@components/Footer'
import Header from '@components/Header'

interface MobileLayoutProps {
  children: React.ReactNode,
}

const MobileLayout = (props: MobileLayoutProps) => {
  const { children } = props

  const { asPath } = useRouter()

  return (
    <Flex justifyContent="center">
      <DefaultSeo
        title="MY4X4 | Detailed info and specs of your favourite 4wds"
        description="Add your build. Find and research similar builds to get inspiration."
        canonical={`https://www.my4x4.info${asPath}`}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.ico',
          },
        ]}
        facebook={{
          appId: '100089112092156',
        }}
        openGraph={{
          description: 'Add your build. Find and research similar builds to get inspiration.',
          images: [
            {
              url: '/og-image.jpg',
            },
          ],
          title: 'MY4X4 | Detailed info and specs of your favourite 4wds',
          type: 'website',
          url: `https://www.my4x4.info${asPath}`,
        }}
      />

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
