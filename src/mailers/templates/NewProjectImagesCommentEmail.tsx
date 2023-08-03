import * as React from 'react'
import {
  Button, Img, Section, Text,
} from '@react-email/components'

import DefaultLayout from '../layouts/DefaultLayout'

const baseUrl = process.env.VERCEL_URL
  ? 'https://www.my4x4.info'
  : 'http://localhost:3001'

type NewProjectsImageCommentEmailProps = {
  commentBody: string,
  commentUserImageUrl: string,
  commentUserName: string,
  generationDate: string,
  imageUrl: string,
  imagePath: string,
  userEmail: string,
}

const NewProjectImagesCommentEmail = (props: NewProjectsImageCommentEmailProps) => {
  const {
    commentBody = 'Great shot of the ranger here',
    commentUserImageUrl = 'https://ik.imagekit.io/lockedandlifted/development/tr:fo-auto,h-100,w-100/images/e44a11af-27fc-4638-a71e-126481747dde.png',
    commentUserName = 'Darrell Smith',
    generationDate = '12th May 2023',
    userEmail = 'name@email.com',
    imageUrl = 'https://ik.imagekit.io/lockedandlifted/development/tr:fo-auto,h-200,w-200/images/7d150f97-28dd-44d0-9854-7ba4af307316.png',
    imagePath = '/2016-nissan-navara-d22-clkkee3i200083b6ozatjsjpq/images/ed5ee257-7076-4526-8ff2-bffb0e8642cb',
  } = props

  return (
    <DefaultLayout
      footerContent={(
        <span>
          This message was sent to {userEmail}. If you don't want to receive these emails from MY4X4 in the future, you can edit your profile.
        </span>
      )}
      generationDate={generationDate}
      title="New Comment"
    >
      <Section className="mt-0">
        <Img
          src={imageUrl}
          width="100"
          height="100"
          alt="MY4X4"
          className="rounded-full mt-4"
        />
      </Section>

      <Section className="mt-4">
        <Text className="flex items-center">
          <Img
            src={commentUserImageUrl}
            width="40"
            height="40"
            alt={commentUserName}
            className="rounded-full"
          />

          <span className="ml-2">
            <span className="font-bold">{commentUserName}</span> commented on your image:
          </span>
        </Text>

        <Text>
          {commentBody}
        </Text>
      </Section>

      <Section className="mt-0">
        <Button
          className="bg-[#000000] rounded text-white text-[16px] mt-4 py-4 px-8"
          href={`${baseUrl}${imagePath}`}
        >
          View
        </Button>
      </Section>
    </DefaultLayout>
  )
}

export default NewProjectImagesCommentEmail
