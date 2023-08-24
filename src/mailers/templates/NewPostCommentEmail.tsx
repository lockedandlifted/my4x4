import * as React from 'react'
import {
  Button, Heading, Img, Section, Text,
} from '@react-email/components'

import type { Prisma } from '@prisma/client'

import DefaultLayout from '../layouts/DefaultLayout'

type PostWithIncludes = Prisma.PostGetPayload<{
  include: {
    postType: true,
    user: {
      include: {
        usersImages: {
          include: {
            image: true,
          },
          orderBy: {
            sort: 'asc',
          },
          take: 1,
        },
      },
    },
  },
}>

const baseUrl = process.env.VERCEL_URL
  ? 'https://www.my4x4.info'
  : 'http://localhost:3001'

const defaultPost = {
  title: 'Question about 2021 Ford Ranger',
  body: 'Did you look at any other options for canopies? The one you ended up with is sick!',
  postType: {
    key: 'question',
  },
}

type NewPostCommentEmailProps = {
  commentBody: string,
  commentUserImageUrl: string,
  commentUserName: string,
  generationDate: string,
  post: PostWithIncludes,
  postPath: string,
  userEmail: string,
}

const NewPostCommentEmail = (props: NewPostCommentEmailProps) => {
  const {
    commentBody = 'Yeah bro. Considered so many options. Wished Shannon’s engineering did anything other than 79 canopies as that would have been first choice but realistically the steel tray would have been too heavy. Narrowed it down to Mits, Gworks and another brand. Ended up choosing gworks and very happy with the choice.',
    commentUserImageUrl = 'https://ik.imagekit.io/lockedandlifted/development/tr:fo-auto,h-100,w-100/images/e44a11af-27fc-4638-a71e-126481747dde.png',
    commentUserName = 'Darrell Smith',
    generationDate = '12th May 2023',
    userEmail = 'name@email.com',
    post = defaultPost,
    postPath = '/next-gen-raptor/questions/b16f6f48-a980-499f-8b18-fa8a5eeec217',
  } = props

  return (
    <DefaultLayout
      footerContent={(
        <span>
          This message was sent to {userEmail}. If you don't want to receive these emails from MY4X4 in the future, you can edit your profile.
        </span>
      )}
      generationDate={generationDate}
      title="New Post Reply"
    >
      <Section className="mt-0">
        <Heading className="text-[16px]">
          {post?.postType?.key === 'question' ? post.body : post.title}
        </Heading>
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
            <span className="font-bold">{commentUserName}</span> replied to you:
          </span>
        </Text>

        <Text>
          {commentBody}
        </Text>
      </Section>

      <Section className="mt-0">
        <Button
          className="bg-[#000000] rounded text-white text-[16px] mt-4 py-4 px-8"
          href={`${baseUrl}${postPath}`}
        >
          View Post
        </Button>
      </Section>
    </DefaultLayout>
  )
}

export default NewPostCommentEmail
