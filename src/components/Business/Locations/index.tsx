import { Flex, Heading } from '@chakra-ui/react'

type LocationsProps = {
  children: React.ReactNode,
}

const Locations = (props: LocationsProps) => {
  const { children } = props

  return (
    <Flex flexDirection="column" marginTop={8}>
      <Heading size="md">Locations</Heading>
    </Flex>
  )
}

export default Locations
