import { Button, Flex, Heading } from '@chakra-ui/react'

import Paragraph from '@components/Paragraph'

const About = () => (
  <Flex direction="column" alignItems="flex-start">
    <Heading as="h2" fontWeight="normal" whiteSpace="pre-line" size="lg">
      About MY4X4
    </Heading>

    <Paragraph marginTop={8}>
      Built for the community by four wheel drive enthusiasts to gather creators, builders, travellers and lovers of mud, parts and progress. We're collecting all the best information and builds to make it easier to learn, research and share anything related to four wheel driving. Add your build today to start contributing.
    </Paragraph>

    <Button
      as="a"
      colorScheme="gray"
      href="/projects/new"
      marginTop={8}
      size="lg"
      width="auto"
    >
      Add your Build
    </Button>
  </Flex>
)

export default About
