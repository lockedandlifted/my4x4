import * as React from 'react'
import {
  Button, Column, Heading, Img, Row, Section, Text,
} from '@react-email/components'

import DefaultLayout from '../layouts/DefaultLayout'

import PlaceHolderImage from '../assets/project_placeholder.png'

const baseUrl = process.env.VERCEL_URL
  ? 'https://www.my4x4.info'
  : 'http://localhost:3001'

const defaultProjects = [
  {
    id: 'cljqfvw7500043b63jz00zphw',
    slug: 'next-gen-raptor',
    title: '2023 Ford Ranger Raptor Next Gen',
    imageUrl: 'https://ik.imagekit.io/lockedandlifted/development/tr:fo-auto,h-200,w-200/images/7d150f97-28dd-44d0-9854-7ba4af307316.png',
  },
  {
    id: 'cljqfvw7512043b63jz00zphw',
    slug: '1993-toyota-hilux-l-n106-clisb3fa600063b6mlovufqpd',
    title: '1993 Toyota Hilux LN106',
    imageUrl: '',
  },
]

type UnpublishedProjectsEmailProps = {
  generationDate: string,
  projects: { id: string, slug: string, title: string, imageUrl: string }[],
  userEmail: string,
}

const UnpublishedProjectsEmail = (props: UnpublishedProjectsEmailProps) => {
  const {
    generationDate = '12th May 2023',
    projects = defaultProjects,
    userEmail = 'name@email.com',
  } = props

  const manyProjects = projects.length > 1

  return (
    <DefaultLayout
      footerContent={(
        <span>
          This message was sent to {userEmail}. If you don't want to receive
          these emails from MY4X4 in the future, you can edit your profile.
        </span>
      )}
      generationDate={generationDate}
      title={`Unpublished ${manyProjects ? 'Builds' : 'Build'}`}
    >
      {projects.map(project => (
        <Section className="mt-0" key={project.id}>
          <Row className="mt-4">
            <Column style={{ width: '100px' }}>
              {!!project.imageUrl && (
                <Img
                  src={project.imageUrl}
                  width="100"
                  height="100"
                  alt="MY4X4"
                  className="rounded-full"
                />
              )}

              {!project.imageUrl && (
                <Img
                  src={`${baseUrl}${PlaceHolderImage.src}`}
                  width="100"
                  height="100"
                  alt="Image Placeholder"
                  className="rounded-full"
                />
              )}
            </Column>

            <Column className="pl-4">
              <Heading className="text-[16px] text-left">
                {project.title}
              </Heading>
            </Column>
          </Row>
        </Section>
      ))}

      <Section className="mt-4">
        <Text>
          Thanks for being part of the community!
        </Text>

        <Text>
          The {manyProjects ? "builds above aren't" : "build above isn't"} published yet.
          If you've had problems with publishing please reach out to us so we can help you.
        </Text>

        <Text>
          Otherwise you can hit the button below to head to your profile and publish the build.
        </Text>
      </Section>

      <Section className="mt-0">
        <Button
          className="bg-[#000000] rounded text-white text-[16px] mt-4 py-4 px-8"
          href={`${baseUrl}/users/account`}
        >
          Manage {manyProjects ? 'Builds' : 'Build'}
        </Button>
      </Section>
    </DefaultLayout>
  )
}

export default UnpublishedProjectsEmail
