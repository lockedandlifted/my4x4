import type { GetServerSideProps } from 'next'
import type { Project } from '@prisma/client'

import setupTrpcCaller from '@utils/setupTrpcCaller'

import MobileLayout from '@layouts/MobileLayout'

import BackToProjectButton from '@components/Project/BackToProjectButton'
import ProjectForm from '@components/ProjectForm'

type EditProjectDetailsPageProps = {
  project: Project,
}

const EditProjectDetailsPage = (props: EditProjectDetailsPageProps) => {
  const { project } = props

  return (
    <MobileLayout>
      <BackToProjectButton editMode project={project} />
      <ProjectForm project={project} />
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

export default EditProjectDetailsPage
