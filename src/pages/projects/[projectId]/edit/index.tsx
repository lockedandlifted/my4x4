import type { GetServerSideProps } from 'next'
import type { Project } from '@prisma/client'

import setupTrpcCaller from '@utils/setupTrpcCaller'

import MobileLayout from '@layouts/MobileLayout'

import MainImage from '@components/ProjectForm/components/MainImage'

type EditProjectPageProps = {
  project: Project,
}

const EditProjectPage = (props: EditProjectPageProps) => {
  const { project } = props

  return (
    <MobileLayout>
      <MainImage project={project} />
    </MobileLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query: { projectId } } = context

  const trpcCaller = await setupTrpcCaller(context)
  const project = await trpcCaller.projects.getProjectById({
    id: projectId,
  })

  return { props: { project } }
}

export default EditProjectPage
