import {
  Flex, Heading, ListItem, OrderedList, UnorderedList,
} from '@chakra-ui/react'

import MobileLayout from '@layouts/MobileLayout'

import Paragraph from '@components/Paragraph'

const AboutUsPage = () => (
  <MobileLayout>
    <Flex direction="column" marginTop={8}>
      <Heading fontWeight="medium" size="lg">
        About Us
      </Heading>

      <Heading fontWeight="medium" marginTop={8} size="md">
        My4x4 - Bringing 4x4 Enthusiasts Together
      </Heading>

      <Paragraph marginTop={4}>
        G'day and welcome to My4x4, the ultimate destination for Aussie 4x4 enthusiasts to gather, share, and celebrate their passion. We're a tight-knit crew of four, once immersed in the world of software, now dedicated to uniting our love for 4x4 vehicles with our fellow enthusiasts.
      </Paragraph>

      <Heading fontWeight="medium" marginTop={8} size="md">
        Our Journey: From Code to Crawling
      </Heading>

      <Paragraph marginTop={4}>
        We kicked off our journey crafting code and software solutions that soared. But deep down, we were drawn to the untamed roads and trails that crisscross Australia's landscapes. My4x4 emerged from this fusion, a platform where tech smarts meet our genuine affection for rugged rides.
      </Paragraph>

      <Heading fontWeight="medium" marginTop={8} size="md">
        Our Vision: Fostering Connections
      </Heading>

      <Paragraph marginTop={4}>
        At My4x4, we're more than just a virtual garage. We're an Aussie hangout, where 4x4 devotees from across the land can gather, chat, and revel in the off-road lifestyle. Whether you're a seasoned desert explorer or a city slicker looking to dip your toes into the mud, My4x4 is your spot to bond, learn, and embrace the 4x4 spirit.
      </Paragraph>

      <Heading fontWeight="medium" marginTop={8} size="md">
        Join the Convoy
      </Heading>

      <Paragraph marginTop={4}>
        We're calling on you to join our journey. My4x4 blends our software expertise with our yearning to build a 4x4 community. Let's put your rigs in the spotlight, swap stories from the tracks, and create connections that stretch from coast to desert.
      </Paragraph>

      <Paragraph marginTop={4}>
        Your My4x4 Team
      </Paragraph>
    </Flex>
  </MobileLayout>
)

export default AboutUsPage
