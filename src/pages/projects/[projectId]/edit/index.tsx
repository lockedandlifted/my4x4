import type { GetServerSideProps } from 'next'
import type { Project } from '@prisma/client'

import setupTrpcCaller from '@utils/setupTrpcCaller'

import useProjectForm from '@components/ProjectForm/hooks/useProjectForm'

import MobileLayout from '@layouts/MobileLayout'

import Form from '@components/Form'

import Attributes from '@components/ProjectForm/components/Attributes'
import Description from '@components/ProjectForm/components/Description'
import MainImage from '@components/ProjectForm/components/MainImage'
import Parts from '@components/ProjectForm/components/Parts'

type EditProjectPageProps = {
  project: Project,
}

const EditProjectPage = (props: EditProjectPageProps) => {
  const { project } = props

  const projectFormPayload = useProjectForm({ project })
  const { callbacks: { updateProject }, formPayload } = projectFormPayload

  return (
    <MobileLayout>
      <Form callbacks={{ submitForm: updateProject }} formPayload={formPayload}>
        <MainImage project={project} />
        <Description project={project} />
        <Attributes project={project} />
        <Parts project={project} />
      </Form>
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
