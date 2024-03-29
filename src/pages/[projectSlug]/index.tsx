import { useRouter } from 'next/router'
import { Flex, Text } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'

import type { GetServerSideProps } from 'next'

import { trpc } from '@utils/trpc'

import setReferreredByUserIdCookie from '@utils/setReferreredByUserIdCookie'
import setTemporaryUserIdCookie from '@utils/setTemporaryUserIdCookie'

import useProjectOgImage from '@hooks/useProjectOgImage'
import useValidateProjectOwner from '@hooks/useValidateProjectOwner'

import MobileLayout from '@layouts/MobileLayout'

import Actions from '@components/Project/Actions'
import Attributes from '@components/Project/Attributes'
import Comments from '@components/Project/Comments'
import Description from '@components/Project/Description'
import EditProjectBanner from '@components/Project/EditProjectBanner'
import Links from '@components/Project/Links'
import MainImage from '@components/Project/MainImage'
import Parts from '@components/Project/Parts'
import Posts from '@components/Project/Posts'
import ProjectOwner from '@components/Project/ProjectOwner'
import Questions from '@components/Project/Questions'
import SimilarProjects from '@components/Project/SimilarProjects'
import SocialActions from '@components/Project/SocialActions'

const BuildPage = (props: { temporaryUserId: string }) => {
  const { temporaryUserId } = props

  const { query: { projectSlug } } = useRouter()

  const { mutate: createPageViewFn } = trpc.projectPageViews.createProjectPageView.useMutation()

  const projectQuery = trpc.projects.getProjectBySlug.useQuery(
    { slug: projectSlug },
    {
      enabled: !!projectSlug,
      onSuccess(data) {
        if (!data?.published) return

        createPageViewFn({
          slug: projectSlug,
        })
      },
    },
  )

  const { data: project } = projectQuery

  const projectViewQuery = trpc.projectPageViews.getViewCountForProjectSlug.useQuery(
    { slug: projectSlug },
    { enabled: !!projectSlug },
  )

  const { data: projectViewCount } = projectViewQuery

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
        {isValidOwner && <EditProjectBanner project={project} projectViewCount={projectViewCount} />}
        <MainImage project={project} />
        <SocialActions project={project} />
        <Description project={project} />
        <Attributes project={project} />
        <Comments project={project} />
        <Questions project={project} />
        <Parts project={project} />
        <ProjectOwner user={project?.projectsUsers?.[0]?.user} />
        <Posts project={project} />
        <Links project={project} />
        <SimilarProjects project={project} />

        <Actions project={project} />

        <Flex
          borderTop="1px solid"
          borderColor="gray.200"
          color="gray.400"
          direction="column"
          paddingTop="4"
          marginTop="4"
        >
          <Flex direction="column" fontSize="sm" marginBottom="2">
            <Text fontWeight="bold">
              Build Viewed
            </Text>

            <Text>
              {projectViewCount} {projectViewCount === 1 ? 'Time' : 'Times'}
            </Text>
          </Flex>

          {!!project?.createdAt && (
            <Flex direction="column" fontSize="sm" marginBottom="2">
              <Text fontWeight="bold">
                Build Added
              </Text>

              <Text>
                {project.createdAt.toDateString()} at {project.createdAt.toTimeString()}
              </Text>
            </Flex>
          )}

          {!!project?.updatedAt && (
            <Flex direction="column" fontSize="sm">
              <Text fontWeight="bold">
                Last Updated
              </Text>

              <Text>
                {project.updatedAt.toDateString()} at {project.updatedAt.toTimeString()}
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </MobileLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  setReferreredByUserIdCookie(context)

  const temporaryUserId = setTemporaryUserIdCookie(context)

  return { props: { temporaryUserId } }
}

export default BuildPage
