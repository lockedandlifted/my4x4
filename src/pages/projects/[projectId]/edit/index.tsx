import { useState } from 'react'
import { useRouter } from 'next/router'

import processCallback from '@utils/processCallback'
import { trpc } from '@utils/trpc'

import useProjectForm from '@hooks/useProjectForm'

import MobileLayout from '@layouts/MobileLayout'

import CreateOrEditProjectAttributeModal from '@modals/CreateOrEditProjectAttributeModal'
import CreateOrEditProjectPartModal from '@modals/CreateOrEditProjectPartModal'

import Form from '@components/Form'

import Attributes from '@components/Project/Attributes'
import Description from '@components/Project/Description'
import MainImage from '@components/ProjectForm/components/MainImage'
import Parts from '@components/ProjectForm/components/Parts'
import ProjectImageThumbs from '@components/ProjectImageThumbs'

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

const EditProjectPage = () => {
  const { query: { projectId } } = useRouter()

  const [state, setState] = useState(defaultState)
  const { showCreateOrEditProjectAttributeModal, showCreateOrEditProjectPartModal } = state

  const projectQuery = trpc.projects.getProjectById.useQuery({ id: projectId })
  const { data: project } = projectQuery

  const projectFormPayload = useProjectForm({ project })
  const { callbacks: { updateProject }, formPayload } = projectFormPayload

  return (
    <MobileLayout>
      <Form callbacks={{ submitForm: updateProject }} formPayload={formPayload} id="project-form">
        <MainImage project={project} />
        <ProjectImageThumbs editMode project={project} />
        <Description editMode project={project} />
        <Attributes editMode project={project} />
        <Parts editMode callbacks={callbacks(undefined, setState)} project={project} />
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

export default EditProjectPage
