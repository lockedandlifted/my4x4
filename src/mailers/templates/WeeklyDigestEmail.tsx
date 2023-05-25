import * as React from 'react'
import {
  Body, Button, Container, Heading, Html, Img, Link, Section, Tailwind, Text,
} from '@react-email/components'

import type { Project } from '@prisma/client'

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3001'

const defaultProject = {
  manufacturerModelId: '74773060-9352-4b6a-85a5-20784c41ad56',
  title: '2023 Ford Ranger Raptor Next Gen',
}

type WeeklyDigestEmailProps = {
  daysSinceCreation: number,
  generationDate: string,
  project: Project,
  projectImageUrl: string,
  manufacturerId: string,
  newLikeCount: number,
  newViewCount: number,
  totalViewCount: number,
  totalLikeCount: number,
  similarNewProjectsCount: number,
  userEmail: string,
}

const WeeklyDigestEmail = (props: WeeklyDigestEmailProps) => {
  const {
    daysSinceCreation = 124,
    generationDate = '12th May 2023',
    project = defaultProject,
    projectImageUrl = 'https://ik.imagekit.io/lockedandlifted/development/tr:fo-auto,h-200,w-200/images/7d150f97-28dd-44d0-9854-7ba4af307316.png',
    manufacturerId = 'b451a6e2-a95e-431f-bc10-4463111aba3f',
    newLikeCount = 4,
    newViewCount = 46,
    totalViewCount = 1253,
    totalLikeCount = 23,
    similarNewProjectsCount = 0,
    userEmail = 'name@email.com',
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
              <Heading className="mt-0">Weekly Update</Heading>
            </Section>

            <Section className="mt-0">
              <Img
                src={projectImageUrl}
                width="100"
                height="100"
                alt="MY4X4"
                className="rounded-full mt-4"
              />

              <Heading className="text-[16px]">
                {project.title}
              </Heading>

              <Text className="flex items-center border rounded border-solid border-[#eaeaea] p-2 mb-0 mt-4">
                <Img className="mr-2" height="14" width="16" alt="Heart" src={`${baseUrl}/heart.png`} />
                +{newLikeCount}<span>&nbsp;</span>Likes
              </Text>

              <Text className="flex items-center border rounded border-solid border-[#eaeaea] p-2 mt-2">
                <Img className="mr-2" height="14" width="18" alt="Eye" src={`${baseUrl}/eye.png`} />
                +{newViewCount}<span>&nbsp;</span>Views
              </Text>
            </Section>

            <Section className="mt-0">
              <>
                <Text>Your build has been on the site for {daysSinceCreation} days.</Text>
                <Text>
                  In that time you have received a total of {totalViewCount} views and {totalLikeCount} likes.
                </Text>

                {similarNewProjectsCount > 0 && (
                  <Text>
                    In the last week there have been {similarNewProjectsCount} new builds matching your make & model uploaded.
                  </Text>
                )}
              </>

              <Button
                className="bg-[#000000] rounded text-white text-[16px] mt-4 py-4 px-8"
                href={`${baseUrl}/search?manufacturerId=${manufacturerId}&manufacturerModelId=${project.manufacturerModelId}`}
              >
                View Similar Builds
              </Button>
            </Section>
          </Container>

          <Container className="w-[465px] mb-8">
            <Text className="text-[12px] leading-snug">
              This message was sent to {userEmail}. If you don't want to receive these emails from MY4X4 in the future, you can edit your profile or <Link href={`${baseUrl}/api/projects/${project.id}/disableNotifications?token=${project.authToken}`}>unsubscribe</Link>.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default WeeklyDigestEmail
