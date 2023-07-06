import {
  Button, Flex, Image,
} from '@chakra-ui/react'

import Paragraph from '@components/Paragraph'

import BackgroundImage from './assets/background.svg'
import GraphicImage from './assets/graphic.svg'

const Hero = () => (
  <Flex
    alignItems="flex-start"
    backgroundColor="black"
    backgroundImage={BackgroundImage.src}
    borderRadius="xl"
    color="white"
    direction="column"
    marginTop="2"
    padding={8}
  >
    <Image
      alt="Post Your Build"
      src={GraphicImage.src}
      width="100%"
    />

    <Paragraph marginTop={8}>
      Join the community and share your 4x4, connect and become part of the ultimate hub for all things off-road. Add your ride today.
    </Paragraph>

    <Button
      as="a"
      backgroundColor="#FFF500"
      color="black"
      href="/projects/new"
      marginTop={8}
      size="lg"
      width="100%"
    >
      Add your Build
    </Button>
  </Flex>
)

export default Hero
