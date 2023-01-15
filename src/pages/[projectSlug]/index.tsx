import { useRouter } from 'next/router'
import { Flex } from '@chakra-ui/react'

import type { GetServerSideProps } from 'next'

import { trpc } from '@utils/trpc'
import setTemporaryUserIdCookie from '@utils/setTemporaryUserIdCookie'

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

  return (
    <MobileLayout>
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
