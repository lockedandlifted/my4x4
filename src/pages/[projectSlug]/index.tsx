import Head from 'next/head'
import { useRouter } from 'next/router'
import { Flex } from '@chakra-ui/react'

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
      <Head>
        <title>{project?.title} | MY4X4</title>
        <meta name="description" content="Add your build. Find and research similar builds to get inspiration." />
        <meta property="fb:app_id" content="100089112092156" />
        <meta property="og:description" content={project?.description || 'Checkout this build on MY4X4.info'} />
        <meta
          property="og:image"
          content={ogImageUrl}
        />
        <meta property="og:title" content={project?.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.my4x4.info/${project?.slug}`} />
      </Head>

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
