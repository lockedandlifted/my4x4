import * as React from 'react'
import {
  Body, Container, Heading, Html, Img, Section, Tailwind, Text,
} from '@react-email/components'

const baseUrl = process.env.VERCEL_URL
  ? 'https://www.my4x4.info'
  : 'http://localhost:3001'

type DefaultLayoutProps = {
  children: React.ReactNode,
  footerContent?: React.ReactNode,
  generationDate: string,
  title: string,
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  const {
    children, footerContent, generationDate, title,
  } = props

  return (
    <Html>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded-xl mt-8 mx-auto p-6 pb-10 w-[465px]">
            <Section className="mt-[16px]">
              <Img
                src={`${baseUrl}/logo@2x.png`}
                width="90"
                height="40"
                alt="MY4X4"
                className="my-0 mx-auto"
              />
            </Section>

            <Section className="mt-8">
              <Text className="mb-0 text-gray-400">{generationDate}</Text>
              <Heading className="mt-0">{title}</Heading>
            </Section>

            {children}
          </Container>

          {footerContent && (
            <Container className="w-[465px] mb-8">
              <Text className="text-[12px] leading-snug">
                {footerContent}
              </Text>
            </Container>
          )}
        </Body>
      </Tailwind>
    </Html>
  )
}

export default DefaultLayout
