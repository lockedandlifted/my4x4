import * as React from 'react'
import {
  Button, Heading, Img, Section, Text,
} from '@react-email/components'

import type { Project } from '@prisma/client'

import DefaultLayout from '../layouts/DefaultLayout'

const baseUrl = process.env.VERCEL_URL
  ? 'https://www.my4x4.info'
  : 'http://localhost:3001'

const defaultProject = {
  slug: 'next-gen-raptor',
  title: '2023 Ford Ranger Raptor Next Gen',
}

type NewProjectQuestionEmailProps = {
  generationDate: string,
  postBody: string,
  postId: string,
  postUserImageUrl: string,
  postUserName: string,
  project: Project,
  projectImageUrl: string,
  userEmail: string,
}

const NewProjectQuestionEmail = (props: NewProjectQuestionEmailProps) => {
  const {
    generationDate = '12th May 2023',
    postBody = 'Hi all, if anyone is interested in a sailplane and electric roller cover, let me know. I bought a new one from someone who put a canopy on their wildtrack from new but I didn’t end up installing it. Selling for $1500',
    postId = 'b16f6f48-a980-499f-8b18-fa8a5eeec217',
    postUserName = 'John Smith',
    postUserImageUrl = 'https://ik.imagekit.io/lockedandlifted/development/tr:fo-auto,h-100,w-100/images/e44a11af-27fc-4638-a71e-126481747dde.png',
    project = defaultProject,
    projectImageUrl = 'https://ik.imagekit.io/lockedandlifted/development/tr:fo-auto,h-200,w-200/images/7d150f97-28dd-44d0-9854-7ba4af307316.png',
    userEmail = 'name@email.com',
  } = props

  return (
    <DefaultLayout
      footerContent={(
        <span>
          This message was sent to {userEmail}. If you don't want to receive these emails from MY4X4 in the future, you can edit your profile.
        </span>
      )}
      generationDate={generationDate}
      title="New Question"
    >
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
      </Section>

      <Section className="mt-4">
        <Text className="flex items-center">
          <Img
            src={postUserImageUrl}
            width="40"
            height="40"
            alt={postUserName}
            className="rounded-full"
          />

          <span className="ml-2">
            <span className="font-bold">{postUserName}</span> asked:
          </span>
        </Text>

        <Text>
          {postBody}
        </Text>
      </Section>

      <Section className="mt-0">
        <Button
          className="bg-[#000000] rounded text-white text-[16px] mt-4 py-4 px-8"
          href={`${baseUrl}/${project?.slug}/questions/${postId}`}
        >
          View Question
        </Button>
      </Section>
    </DefaultLayout>
  )
}

export default NewProjectQuestionEmail
