import Image from 'next/image'
import { Flex, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FaInstagram, FaTiktok } from 'react-icons/fa'

import LogoUrl from './assets/logo.svg'

type FooterProps = {
  generatedAt?: string,
}

const Footer = ({ generatedAt }: FooterProps) => (
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

    <Flex alignItems="center" flexDirection="row" paddingTop="2" justifyContent="space-between">
      <Flex direction="column">
        <Flex>
          <NextLink href="mailto:support@lockedandlifted4x4.com?subject=Suggestion for MY4X4">
            <Text fontSize="sm" color="gray.400">Got a suggestion?</Text>
          </NextLink>

          <Text fontSize="sm" color="gray.400" marginLeft={1}>
            MY4X4.info © 2023
          </Text>
        </Flex>

        <Flex>
          <NextLink href="/privacyPolicy">
            <Text fontSize="sm" color="gray.600">Privacy Policy</Text>
          </NextLink>

          <Text fontSize="sm" color="gray.400" marginLeft={1}>
            |
          </Text>

          <NextLink href="https://www.kengreeff.com">
            <Text fontSize="sm" color="gray.600" marginLeft={1}>Site by Ken Greeff</Text>
          </NextLink>
        </Flex>
      </Flex>

      <Flex flexDirection="row" fontSize={18}>
        <NextLink href="https://www.instagram.com/locked.and.lifted/" rel="nofollow">
          <FaInstagram />
        </NextLink>

        <NextLink
          href="https://www.tiktok.com/@lockedandlifted"
          rel="nofollow"
          style={{ marginLeft: '8px' }}
        >
          <FaTiktok />
        </NextLink>
      </Flex>
    </Flex>

    {!!generatedAt && (
      <Flex borderTopWidth="1px" color="gray.300" fontSize="xs" marginTop="2" paddingY="2">
        Generated at {generatedAt}
      </Flex>
    )}
  </Flex>
)

export default Footer
