import { Flex, Heading } from '@chakra-ui/react'

type PartsProps = {
  children: React.ReactNode,
}

const Parts = (props: PartsProps) => {
  const { children } = props

  return (
    <Flex direction="column" marginTop="8">
      <Heading size="md" marginBottom="4">Parts & Upgrades</Heading>
      Parts
    </Flex>
  )
}

export default Parts
