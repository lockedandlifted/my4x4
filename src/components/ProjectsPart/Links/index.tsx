import { Flex, Heading } from '@chakra-ui/react'

type LinksProps = {
  children: React.ReactNode,
}

const Links = (props: LinksProps) => {
  const { children } = props

  return (
    <Flex direction="column" marginTop="8">
      <Heading size="md" marginBottom="4">
        Links
      </Heading>
    </Flex>
  )
}

export default Links
