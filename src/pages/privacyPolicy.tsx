import {
  Flex, Heading, ListItem, OrderedList, UnorderedList,
} from '@chakra-ui/react'

import MobileLayout from '@layouts/MobileLayout'

import Paragraph from '@components/Paragraph'

const PrivacyPolicyPage = () => (
  <MobileLayout>
    <Flex direction="column" marginTop={8}>
      <Heading fontWeight="medium" size="lg">
        Privacy Policy
      </Heading>

      <Paragraph marginTop={4}>
        Effective Date: 1st January 2023
      </Paragraph>

      <Paragraph marginTop={4}>
        This privacy policy ("Policy") explains how Locked & Lifted ("we", "us", "our") collects, uses, and shares information about you when you use our website, mobile application, and any other online services that link to this Policy (collectively, the "Services").
      </Paragraph>

      <Paragraph marginTop={4}>
        Please read this Policy carefully to understand our policies and practices regarding your information and how we will treat it. If you do not agree with our policies and practices, do not use the Services. By using the Services, you agree to the collection, use, and sharing of your information as described in this Policy.
      </Paragraph>

      <Paragraph marginTop={4}>
        This Policy may change from time to time. We encourage you to review the Policy whenever you access the Services to stay informed about our information practices and the choices available to you.
      </Paragraph>

      <Heading fontWeight="medium" marginTop={8} size="md">
        1. Information We Collect and How We Collect It
      </Heading>

      <Paragraph marginTop={4}>
        We collect several types of information from and about users of the Services, including information:
      </Paragraph>

      <UnorderedList marginTop={4}>
        <ListItem>
          By which you may be personally identified, such as name and e-mail address, or any other identifier by which you may be contacted online or offline ("personal information").
        </ListItem>

        <ListItem>
          That is about you but individually does not identify you, such as age, gender, and interests ("demographic information").
        </ListItem>
      </UnorderedList>

      <Paragraph marginTop={4}>
        We collect this information:
      </Paragraph>

      <UnorderedList marginTop={4}>
        <ListItem>
          Directly from you when you provide it to us.
        </ListItem>

        <ListItem>
          Automatically as you navigate through the Services. Information collected automatically may include usage details, IP addresses, and information collected through cookies, web beacons, and other tracking technologies.
        </ListItem>
      </UnorderedList>

      <Heading fontWeight="medium" marginTop={8} size="md">
        2. How We Use Your Information
      </Heading>

      <Paragraph marginTop={4}>
        We use information that we collect about you or that you provide to us, including any personal information:
      </Paragraph>

      <Heading fontWeight="medium" marginTop={8} size="md">
        3. Sharing Your Information
      </Heading>

      <Heading fontWeight="medium" marginTop={8} size="md">
        4. Your Choices and Opt-Out Rights
      </Heading>

      <Heading fontWeight="medium" marginTop={8} size="md">
        5. Children's Privacy
      </Heading>

      <Heading fontWeight="medium" marginTop={8} size="md">
        6. Data Retention
      </Heading>

      <Heading fontWeight="medium" marginTop={8} size="md">
        7. Changes to This Policy
      </Heading>

      <Heading fontWeight="medium" marginTop={8} size="md">
        8. Contact Us
      </Heading>

      <Heading fontWeight="medium" marginTop={8} size="md">
        9. Data Security
      </Heading>

      <Heading fontWeight="medium" marginTop={8} size="md">
        10. Third-Party Links
      </Heading>

      <Heading fontWeight="medium" marginTop={8} size="md">
        11. International Transfer
      </Heading>

      <Heading fontWeight="medium" marginTop={8} size="md">
        12. Privacy Policy Changes
      </Heading>

      <Heading fontWeight="medium" marginTop={8} size="md">
        13. California Privacy Rights
      </Heading>

      <Heading fontWeight="medium" marginTop={8} size="md">
        14. EU Data Subject Rights
      </Heading>

      <Heading fontWeight="medium" marginTop={8} size="md">
        15. International Users
      </Heading>

      <Heading fontWeight="medium" marginTop={8} size="md">
        16. Do Not Track Disclosure
      </Heading>

      <Heading fontWeight="medium" marginTop={8} size="md">
        17. Questions or Concerns
      </Heading>

      <Paragraph marginTop={4}>
        If you have any questions or concerns about our Privacy Policy or data processing, please contact us at support@lockedandlifted4x4.com. You may also contact us to make any requests regarding your personal data as outlined in this Policy.
      </Paragraph>
    </Flex>
  </MobileLayout>
)

export default PrivacyPolicyPage
