import { Button, Flex, Heading } from '@chakra-ui/react'

import Paragraph from '@components/Paragraph'

const Hero = () => (
  <Flex direction="column" alignItems="flex-start" marginTop={8}>
    <Heading fontWeight="normal" whiteSpace="pre-line" size="xl">
      {`Add Your Vehicle,
      Find and Research Parts,
      Flex.`}
    </Heading>

    <Paragraph marginTop={8}>
      Add your 4x4 and parts as you build out your ride.
      Find other vehicles that have fitted the parts you are considering to do your research.
    </Paragraph>

    <Button
      as="a"
      colorScheme="gray"
      href="/projects/new"
      marginTop={8}
      size="lg"
      width="auto"
    >
      Get Started
    </Button>
  </Flex>
)

export default Hero
