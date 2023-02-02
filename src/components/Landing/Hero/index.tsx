import { Button, Flex, Heading } from '@chakra-ui/react'

import Paragraph from '@components/Paragraph'

const Hero = () => (
  <Flex direction="column" alignItems="flex-start" marginTop={8}>
    <Heading fontWeight="normal" whiteSpace="pre-line" size="xl">
      {`Interested in 4x4 Builds?
      Add your build or browse other
      builds below.
      `}
    </Heading>

    <Paragraph marginTop={8}>
      Add your 4x4 and parts as you build out your ride.
      Make a detailed history of your vehicle.
      Find other vehicles that have fitted the parts you are considering to do your research.
    </Paragraph>

    <Paragraph marginTop={8}>
      Browse other peoples builds and research parts for your own build or add other builds you
      know all the info about.
    </Paragraph>

    <Button
      as="a"
      colorScheme="teal"
      href="/projects/new"
      marginTop={8}
      size="lg"
      width="auto"
    >
      Add your Build
    </Button>
  </Flex>
)

export default Hero
