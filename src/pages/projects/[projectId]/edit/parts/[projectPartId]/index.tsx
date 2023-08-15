import { useState } from 'react'
import { useRouter } from 'next/router'

import processCallback from '@utils/processCallback'
import { trpc } from '@utils/trpc'

import useProjectsPartForm from '@hooks/useProjectsPartForm'

import MobileLayout from '@layouts/MobileLayout'

import CreateOrEditProjectPartExternalLinkModal from '@modals/CreateOrEditProjectPartExternalLinkModal'

import Actions from '@components/ProjectsPart/Actions'
import BackToProjectButton from '@components/Project/BackToProjectButton'
import Description from '@components/ProjectsPart/Description'
import Links from '@components/ProjectsPart/Links'
import Overview from '@components/ProjectsPart/Overview'
import TaggedImages from '@components/ProjectsPart/TaggedImages'

const showModal = (setState, payload?: object) => {
  setState(state => ({
    ...state,
    showCreateOrEditProjectPartExternalLinkModal: true,
    modalPayloads: {
      ...state.modalPayloads,
      CreateOrEditProjectPartExternalLinkModal: payload,
    },
  }))
}

const callbacks = (componentName: string | undefined, setState) => {
  const componentCallbacks = {
    CreateOrEditProjectPartExternalLinkModal: {
      closeModal: () => setState(s => ({ ...s, showCreateOrEditProjectPartExternalLinkModal: false })),
      createProjectPartsExternalLink: payload => processCallback(payload),
      showModal: (payload?: object) => showModal(setState, payload),
    },
  }

  return componentCallbacks[componentName] || componentCallbacks
}

const defaultState = {
  showCreateOrEditProjectPartExternalLinkModal: false,
}

const EditProjectsPartPage = () => {
  const { query: { projectId, projectPartId } } = useRouter()

  const [state, setState] = useState(defaultState)
  const { showCreateOrEditProjectPartExternalLinkModal } = state

  const projectQuery = trpc.projects.getProjectById.useQuery({ id: projectId }, { enabled: !!projectId })
  const { data: project } = projectQuery

  const projectsPartQuery = trpc.projectsParts.getProjectsPartById.useQuery({
    id: projectPartId || '',
    include: {
      manufacturerPart: {
        include: {
          category: true,
          manufacturer: true,
        },
      },
      status: true,
    },
  }, { enabled: !!projectPartId })
  const { data: projectsPart } = projectsPartQuery

  const projectsPartFormPayload = useProjectsPartForm({ projectsPart })
  const {
    callbacks: {
      deleteProjectsPart,
      updateProjectsPart,
    },
  } = projectsPartFormPayload

  return (
    <MobileLayout>
      <BackToProjectButton editMode project={project} />

      <Overview editMode projectsPart={projectsPart} />
      <Description editMode projectsPart={projectsPart} />
      <Links callbacks={callbacks(undefined, setState)} editMode projectsPart={projectsPart} />
      <TaggedImages editMode project={project} projectsPart={projectsPart} />
      <Actions
        boxProps={{
          marginTop: 8,
        }}
        callbacks={{
          deleteProjectsPart: () => deleteProjectsPart(),
          updateProjectsPart: projectsPart?.status?.key !== 'removed'
            ? () => updateProjectsPart({ ...projectsPart, statusKey: 'removed' })
            : undefined,
        }}
      />

      <CreateOrEditProjectPartExternalLinkModal
        callbacks={callbacks('CreateOrEditProjectPartExternalLinkModal', setState)}
        projectsPart={projectsPart}
        showModal={showCreateOrEditProjectPartExternalLinkModal}
      />
    </MobileLayout>
  )
}

export default EditProjectsPartPage
