import Image from 'next/image'
import { Flex, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

import LogoUrl from './assets/logo.svg'
import Instagram from './assets/instagram.svg'
import TikTok from './assets/tiktok.svg'

const Footer = () => (
  <Flex
    flexDirection="column"
    height="80px"
    marginTop="16"
    width="100%"
    paddingX={[4]}
  >
    <Flex>
      <NextLink href="/">
        <Image src={LogoUrl} width={60} alt="Locked and Lifted Logo" />
      </NextLink>
    </Flex>

    <Flex flexDirection="row" paddingTop="2" justifyContent="space-between">
      <Flex>
        <NextLink href="mailto:support@lockedandlifted4x4.com?subject=Suggestion for MY4X4">
          <Text fontSize="sm" color="gray.400">Got a suggestion?</Text>
        </NextLink>

        <Text fontSize="sm" color="gray.400" marginLeft={1}>
          MY4X4.info © 2023
        </Text>

        <Text fontSize="sm" color="gray.400" marginLeft={1}>
          |
        </Text>

        <NextLink href="/privacyPolicy">
          <Text fontSize="sm" color="gray.600" marginLeft={1}>Privacy Policy</Text>
        </NextLink>

        <Text fontSize="sm" color="gray.400" marginLeft={1}>
          |
        </Text>

        <NextLink href="https://www.kengreeff.com">
          <Text fontSize="sm" color="gray.600" marginLeft={1}>Site by Ken Greeff</Text>
        </NextLink>
      </Flex>

      <Flex flexDirection="row">
        <NextLink href="https://www.instagram.com/locked.and.lifted/">
          <Image src={Instagram} width={14} alt="Instagram Account" />
        </NextLink>

        <NextLink href="https://www.tiktok.com/@lockedandlifted" style={{ marginLeft: '8px' }}>
          <Image src={TikTok} width={14} alt="Tik Tok Account" />
        </NextLink>
      </Flex>
    </Flex>
  </Flex>
)

export default Footer
