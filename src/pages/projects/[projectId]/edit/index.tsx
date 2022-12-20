import { useState } from 'react'

import type { GetServerSideProps } from 'next'
import type { Project } from '@prisma/client'

import processCallback from '@utils/processCallback'
import setupTrpcCaller from '@utils/setupTrpcCaller'

import useProjectForm from '@hooks/useProjectForm'

import MobileLayout from '@layouts/MobileLayout'

import CreateOrEditProjectAttributeModal from '@modals/CreateOrEditProjectAttributeModal'
import CreateOrEditProjectPartModal from '@modals/CreateOrEditProjectPartModal'

import Form from '@components/Form'

import Attributes from '@components/ProjectForm/components/Attributes'
import Description from '@components/ProjectForm/components/Description'
import MainImage from '@components/ProjectForm/components/MainImage'
import Parts from '@components/ProjectForm/components/Parts'
import ProjectImages from '@components/ProjectImages'

const showModal = (setState, payload?: object) => {
  setState(state => ({
    ...state,
    showCreateOrEditProjectPartModal: true,
    modalPayloads: {
      ...state.modalPayloads,
      CreateOrEditProjectPartModal: payload,
    },
  }))
}

const callbacks = (componentName: string | undefined, setState) => {
  const componentCallbacks = {
    CreateOrEditProjectPartModal: {
      closeModal: () => setState(s => ({ ...s, showCreateOrEditProjectPartModal: false })),
      createProjectsPart: payload => processCallback(payload),
      showModal: (payload?: object) => showModal(setState, payload),
    },
  }

  return componentCallbacks[componentName] || componentCallbacks
}

const defaultState = {
  showCreateOrEditProjectAttributeModal: false,
  showCreateOrEditProjectPartModal: false,
}

type EditProjectPageProps = {
  project: Project,
}

const EditProjectPage = (props: EditProjectPageProps) => {
  const { project } = props

  const [state, setState] = useState(defaultState)
  const { showCreateOrEditProjectAttributeModal, showCreateOrEditProjectPartModal } = state

  const projectFormPayload = useProjectForm({ project })
  const { callbacks: { updateProject }, formPayload } = projectFormPayload

  return (
    <MobileLayout>
      <Form callbacks={{ submitForm: updateProject }} formPayload={formPayload} id="project-form">
        <MainImage project={project} />
        <ProjectImages project={project} />
        <Description project={project} />
        <Attributes project={project} />
        <Parts callbacks={callbacks(undefined, setState)} project={project} />
      </Form>

      <CreateOrEditProjectAttributeModal
        callbacks={{ closeModal: () => setState(s => ({ ...s, showCreateOrEditProjectAttributeModal: false })) }}
        showModal={showCreateOrEditProjectAttributeModal}
      />

      <CreateOrEditProjectPartModal
        callbacks={callbacks('CreateOrEditProjectPartModal', setState)}
        project={project}
        showModal={showCreateOrEditProjectPartModal}
      />
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
