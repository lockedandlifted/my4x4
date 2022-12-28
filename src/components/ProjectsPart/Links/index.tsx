import { Flex, Heading } from '@chakra-ui/react'

import Link from './Link'

type LinksProps = {
  children: React.ReactNode,
}

const Links = (props: LinksProps) => {
  const { children } = props

  return (
    <Flex direction="column" marginTop="8">
      <Heading size="md">
        Links
      </Heading>

      <Link externalLink={{ url: 'https://www.google.com', title: 'Buy this Part' }} />
      <Link externalLink={{ url: 'https://www.youtube.com/watch?v=N6so0I0cF48', title: 'Installation Video' }} />
    </Flex>
  )
}

export default Links
