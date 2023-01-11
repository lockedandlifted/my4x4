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

      <UnorderedList marginTop={4}>
        <ListItem>
          To present the Services to you.
        </ListItem>

        <ListItem>
          To provide you with information, products, or services that you request from us.
        </ListItem>

        <ListItem>
          To fulfill any other purpose for which you provide it.
        </ListItem>

        <ListItem>
          To provide you with notices about your account.
        </ListItem>

        <ListItem>
          To carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection.
        </ListItem>

        <ListItem>
          To notify you about changes to the Services.
        </ListItem>

        <ListItem>
          To allow you to participate in interactive features on the Services.
        </ListItem>

        <ListItem>
          In any other way we may describe when you provide the information.
        </ListItem>

        <ListItem>
          For any other purpose with your consent.
        </ListItem>
      </UnorderedList>

      <Paragraph marginTop={4}>
        We may also use your information to contact you for market research purposes. We may contact you by email.
      </Paragraph>

      <Heading fontWeight="medium" marginTop={8} size="md">
        3. Sharing Your Information
      </Heading>

      <Paragraph marginTop={4}>
        We may share your information with third parties in the following circumstances:
      </Paragraph>

      <UnorderedList marginTop={4}>
        <ListItem>
          With vendors, consultants, and other service providers who need access to your information to carry out work on our behalf.
        </ListItem>

        <ListItem>
          In response to a request for information if we believe disclosure is in accordance with, or required by, any applicable law, regulation, or legal process.
        </ListItem>

        <ListItem>
          If we believe your actions are inconsistent with the spirit or language of our user agreements or policies, or to protect the rights, property, and safety of Locked & Lifted or others.
        </ListItem>

        <ListItem>
          In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
        </ListItem>
      </UnorderedList>

      <Heading fontWeight="medium" marginTop={8} size="md">
        4. Your Choices and Opt-Out Rights
      </Heading>

      <Paragraph marginTop={4}>
        You have the right to opt-out of certain uses of your information. If you do not want us to use your information to contact you for promotional purposes, you can opt-out by adjusting your communication preferences in your account settings or by following the unsubscribe instructions provided in any promotional communications that we send to you.
      </Paragraph>

      <Paragraph marginTop={4}>
        You can also control the information that we collect and share through the Services by adjusting your privacy settings in your account settings. Please note that even if you opt-out of receiving promotional communications, we may still send you non-promotional communications, such as those about your account or our ongoing business relations.
      </Paragraph>

      <Heading fontWeight="medium" marginTop={8} size="md">
        5. Children's Privacy
      </Heading>

      <Paragraph marginTop={4}>
        The Services are not intended for children under the age of 18. We do not knowingly collect personal information from children under the age of 18. If we become aware that we have collected personal information from a child under the age of 18, we will take steps to delete such information from our files as soon as possible.
      </Paragraph>

      <Heading fontWeight="medium" marginTop={8} size="md">
        6. Data Retention
      </Heading>

      <Paragraph marginTop={4}>
        We will retain your information for as long as your account is active or as needed to provide you the Services. We will retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.
      </Paragraph>

      <Heading fontWeight="medium" marginTop={8} size="md">
        7. Changes to This Policy
      </Heading>

      <Paragraph marginTop={4}>
        We may update this Policy from time to time. We encourage you to review the Policy whenever you access the Services to stay informed about our information practices and the choices available to you. If we make any material changes to this Policy, we will post the revised policy on this page and update the "Effective Date" at the top of this Policy.
      </Paragraph>

      <Heading fontWeight="medium" marginTop={8} size="md">
        8. Contact Us
      </Heading>

      <Paragraph marginTop={4}>
        If you have any questions about this Policy, please contact us at support@lockedandlifted4x4.com
      </Paragraph>

      <Heading fontWeight="medium" marginTop={8} size="md">
        9. Data Security
      </Heading>

      <Paragraph marginTop={4}>
        We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on secure servers behind firewalls.
      </Paragraph>

      <Paragraph marginTop={4}>
        However, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted through the Services. Any transmission of personal information is at your own risk. We are not responsible for circumvention of any privacy settings or security measures contained on the Services.
      </Paragraph>

      <Heading fontWeight="medium" marginTop={8} size="md">
        10. Third-Party Links
      </Heading>

      <Paragraph marginTop={4}>
        The Services may contain links to third-party websites, services, and applications that are not owned or controlled by Locked & Lifted. We are not responsible for the privacy practices of these third parties. We encourage you to be aware when you leave the Services and to read the privacy policies of each website, service, and application that you visit.
      </Paragraph>

      <Heading fontWeight="medium" marginTop={8} size="md">
        11. International Transfer
      </Heading>

      <Paragraph marginTop={4}>
        Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.
      </Paragraph>

      <Paragraph marginTop={4}>
        If you are located outside Australia and choose to provide information to us, please note that we transfer the information, including personal information, to Australia and process it there. Your consent to this Policy followed by your submission of such information represents your agreement to that transfer.
      </Paragraph>

      <Heading fontWeight="medium" marginTop={8} size="md">
        12. Privacy Policy Changes
      </Heading>

      <Paragraph marginTop={4}>
        Locked & Lifted reserves the right to change this policy and our Terms of Service at any time. We will post any changes on this page and, if the changes are significant, we will provide a more prominent notice (including, for certain Services, email notification of privacy policy changes). We encourage you to review our privacy policy whenever you access the Services to stay informed about our information practices and the choices available to you.
      </Paragraph>

      <Heading fontWeight="medium" marginTop={8} size="md">
        13. California Privacy Rights
      </Heading>

      <Paragraph marginTop={4}>
        If you are a California resident, you have the right to request information from us regarding the manner in which we share certain categories of personal information with third parties for their direct marketing purposes. California law requires us to provide you with a list of the categories of personal information that we have shared with third parties for their direct marketing purposes during the immediately preceding calendar year, along with the names and addresses of these third parties. If you are a California resident and would like to request this information, please contact us at support@lockedandlifted4x4.com
      </Paragraph>

      <Paragraph marginTop={4}>
        This policy was last modified on 10th January 2023.
      </Paragraph>

      <Heading fontWeight="medium" marginTop={8} size="md">
        14. EU Data Subject Rights
      </Heading>

      <Paragraph marginTop={4}>
        If you are a European Union data subject, you have the following rights under the General Data Protection Regulation (GDPR) and the Data Protection Act 2018:
      </Paragraph>

      <UnorderedList marginTop={4}>
        <ListItem>
          The right to be informed about our collection and use of your personal data. This Privacy Policy should provide you with all the information you need.
        </ListItem>

        <ListItem>
          The right of access to your personal data. You can request access to your personal data by contacting us at support@lockedandlifted4x4.com.
        </ListItem>

        <ListItem>
          The right to rectification. If you believe any of your personal data that we process is incorrect or incomplete, you can request that we correct or complete it.
        </ListItem>

        <ListItem>
          The right to erasure (also known as the right to be forgotten). You can request that we erase your personal data in certain circumstances, such as when it is no longer needed for the purposes for which it was collected or when you withdraw your consent.
        </ListItem>

        <ListItem>
          The right to restrict processing. You can request that we restrict the processing of your personal data in certain circumstances, such as when you contest the accuracy of the data or when you have objected to us using your data for marketing purposes.
        </ListItem>

        <ListItem>
          The right to data portability. You have the right to request that we transfer your personal data to another organization or to you in a structured, commonly used, and machine-readable format in certain circumstances.
        </ListItem>

        <ListItem>
          The right to object. You have the right to object to our processing of your personal data in certain circumstances, such as for marketing purposes or when we are processing your data based on our legitimate interests.
        </ListItem>

        <ListItem>
          Rights in relation to automated decision-making and profiling. You have the right not to be subject to a decision based solely on automated processing, including profiling, that produces legal effects concerning you or similarly significantly affects you.
        </ListItem>
      </UnorderedList>

      <Paragraph marginTop={4}>
        You can exercise these rights by contacting us at support@lockedandlifted4x4.com. If you have any concerns about how we process your personal data, you can also make a complaint to the relevant supervisory authority.
      </Paragraph>

      <Heading fontWeight="medium" marginTop={8} size="md">
        15. International Users
      </Heading>

      <Paragraph marginTop={4}>
        The Services are designed for users located in Australia. If you are accessing the Services from outside Australia, please be aware that your information may be transferred to, stored, and processed in Australia where our servers are located and our central database is operated. The data protection and other laws of Australia and other countries might not be as comprehensive as those in your country.
      </Paragraph>

      <Paragraph marginTop={4}>
        By using the Services, you understand and consent to the collection, storage, processing, and transfer of your information to our facilities and to those third parties with whom we share your information as described in this Policy.
      </Paragraph>

      <Heading fontWeight="medium" marginTop={8} size="md">
        16. Do Not Track Disclosure
      </Heading>

      <Paragraph marginTop={4}>
        We do not support Do Not Track ("DNT"). Do Not Track is a preference you can set in your web browser to inform websites that you do not want to be tracked. You can enable or disable Do Not Track by visiting the Preferences or Settings page of your web browser.
      </Paragraph>

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
