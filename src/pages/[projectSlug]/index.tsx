import Head from 'next/head'
import { useRouter } from 'next/router'
import { Flex } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'

import type { GetServerSideProps } from 'next'

import { trpc } from '@utils/trpc'
import setTemporaryUserIdCookie from '@utils/setTemporaryUserIdCookie'

import useProjectOgImage from '@hooks/useProjectOgImage'
import useValidateProjectOwner from '@hooks/useValidateProjectOwner'

import MobileLayout from '@layouts/MobileLayout'

import Actions from '@components/Project/Actions'
import Attributes from '@components/Project/Attributes'
import Description from '@components/Project/Description'
import Links from '@components/Project/Links'
import MainImage from '@components/Project/MainImage'
import Parts from '@components/Project/Parts'
import ProjectImageThumbs from '@components/ProjectImageThumbs'
import SimilarProjects from '@components/Project/SimilarProjects'

const BuildPage = (props: { temporaryUserId: string }) => {
  const { temporaryUserId } = props

  const { query: { projectSlug } } = useRouter()

  const { mutate: createPageViewFn } = trpc.projectPageViews.createProjectPageView.useMutation()

  const projectQuery = trpc.projects.getProjectBySlug.useQuery(
    { slug: projectSlug },
    {
      enabled: !!projectSlug,
      onSuccess() {
        createPageViewFn({
          slug: projectSlug,
        })
      },
    },
  )

  const { data: project } = projectQuery

  const { isValidOwner } = useValidateProjectOwner({
    project,
    temporaryUserId,
  })

  const { ogImageUrl } = useProjectOgImage(project)

  return (
    <MobileLayout>
      <NextSeo
        title={`MY4X4 | ${project?.title}`}
        description={`View detailed specs and info for ${project?.title} on MY4X4.`}
        facebook={{
          appId: '100089112092156',
        }}
        openGraph={{
          description: project?.description || 'Checkout this build on MY4X4.info',
          images: [
            {
              url: ogImageUrl,
              alt: `Main Image for ${project?.title}`,
            },
          ],
          title: project?.title,
          type: 'website',
          url: `https://www.my4x4.info/${project?.slug}`,
        }}
      />

      <Flex direction="column">
        <MainImage project={project} />
        <ProjectImageThumbs project={project} />
        <Description project={project} />
        <Links project={project} />
        <Attributes project={project} />
        <Parts project={project} />

        <SimilarProjects project={project} />

        {isValidOwner && <Actions project={project} />}
      </Flex>
    </MobileLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const temporaryUserId = setTemporaryUserIdCookie(context)
  return { props: { temporaryUserId } }
}

export default BuildPage
