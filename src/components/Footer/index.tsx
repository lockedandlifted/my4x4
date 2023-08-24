import { Flex, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FaInstagram, FaTiktok } from 'react-icons/fa'

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
    <Flex flexDirection="column" marginBottom="4">
      <Flex marginBottom="2">
        <NextLink href="/">
          <Text fontSize="sm" fontWeight="bold">MY4X4 Builds, Parts and Community</Text>
        </NextLink>
      </Flex>

      <NextLink href="/posts">
        <Text color="gray.600" fontSize="sm">All Forum Posts</Text>
      </NextLink>

      <NextLink href="posts?categoryKey=competitions">
        <Text color="gray.600" fontSize="sm">Latest 4X4 Competitions</Text>
      </NextLink>

      <NextLink href="posts?categoryKey=events">
        <Text color="gray.600" fontSize="sm">Upcoming 4X4 Events</Text>
      </NextLink>

      <NextLink href="/search">
        <Text color="gray.600" fontSize="sm">Browse all 4X4 Builds by Manufacturer</Text>
      </NextLink>

      <NextLink href="/searchByPart">
        <Text color="gray.600" fontSize="sm">Browse all 4X4 Builds by Parts</Text>
      </NextLink>
    </Flex>

    <Flex flexDirection="column" marginBottom="4">
      <Flex marginBottom="2">
        <NextLink href="/">
          <Text fontSize="sm" fontWeight="bold">Company</Text>
        </NextLink>
      </Flex>

      <NextLink href="/about">
        <Text color="gray.600" fontSize="sm">About Us</Text>
      </NextLink>

      <NextLink href="/privacyPolicy">
        <Text color="gray.600" fontSize="sm">Privacy Policy</Text>
      </NextLink>

      <NextLink href="mailto:support@lockedandlifted4x4.com?subject=Suggestion for MY4X4">
        <Text color="gray.600" fontSize="sm">Got a Suggestion?</Text>
      </NextLink>
    </Flex>

    <Flex alignItems="center" flexDirection="row" paddingY="2" justifyContent="space-between" marginBottom="2">
      <Flex>
        <Text fontSize="sm" color="gray.400">
          MY4X4.INFO © 2023
        </Text>

        <NextLink href="https://www.kengreeff.com">
          <Text fontSize="sm" color="gray.400" marginLeft={1}>by Initium Studio</Text>
        </NextLink>
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
      <Flex borderTopWidth="1px" color="gray.300" fontSize="xs" paddingY="2">
        Generated at {generatedAt}
      </Flex>
    )}
  </Flex>
)

export default Footer
