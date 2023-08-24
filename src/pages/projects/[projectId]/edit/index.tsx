import { useState } from 'react'
import { useRouter } from 'next/router'

import { Button } from '@chakra-ui/react'

import processCallback from '@utils/processCallback'
import { trpc } from '@utils/trpc'

import useProjectForm from '@hooks/useProjectForm'
import useProjectsPosts from '@hooks/useProjectsPosts'

import MobileLayout from '@layouts/MobileLayout'

import CreateOrEditProjectAttributeModal from '@modals/CreateOrEditProjectAttributeModal'
import CreateOrEditProjectPartModal from '@modals/CreateOrEditProjectPartModal'
import CreateOrEditProjectExternalLinkModal from '@modals/CreateOrEditProjectExternalLinkModal'

import Form from '@components/Form'

import Actions from '@components/Project/Actions'
import Attributes from '@components/Project/Attributes'
import CreateAccountNotice from '@components/Project/CreateAccountNotice'
import EditProjectBanner from '@components/Project/EditProjectBanner'
import LegacyDescription from '@components/Project/LegacyDescription'
import Links from '@components/Project/Links'
import MainImage from '@components/ProjectForm/components/MainImage'
import Parts from '@components/Project/Parts'
import ProjectImageThumbs from '@components/ProjectImageThumbs'
import PublishProject from '@components/Project/PublishProject'
import Share from '@components/Project/Share'

const showModal = (modalKey: string, setState, payload?: object) => {
  setState(state => ({
    ...state,
    [`show${modalKey}`]: true,
    modalPayloads: {
      ...state.modalPayloads,
      CreateOrEditProjectPartModal: payload,
    },
  }))
}

const callbacks = (componentName: string | undefined, setState) => {
  const componentCallbacks = {
    CreateOrEditProjectExternalLinkModal: {
      closeModal: () => setState(s => ({ ...s, showCreateOrEditProjectExternalLinkModal: false })),
      createProjectsExternalLink: payload => processCallback(payload),
      showModal: (payload?: object) => showModal('CreateOrEditProjectExternalLinkModal', setState, payload),
    },
    CreateOrEditProjectPartModal: {
      closeModal: () => setState(s => ({ ...s, showCreateOrEditProjectPartModal: false })),
      createProjectsPart: payload => processCallback(payload),
      showModal: (payload?: object) => showModal('CreateOrEditProjectPartModal', setState, payload),
    },
  }

  return componentCallbacks[componentName] || componentCallbacks
}

const defaultState = {
  showCreateOrEditProjectAttributeModal: false,
  showCreateOrEditProjectExternalLinkModal: false,
  showCreateOrEditProjectPartModal: false,
}

const EditProjectPage = () => {
  const { query: { projectId } } = useRouter()

  const [state, setState] = useState(defaultState)
  const {
    showCreateOrEditProjectAttributeModal,
    showCreateOrEditProjectExternalLinkModal,
    showCreateOrEditProjectPartModal,
  } = state

  const projectQuery = trpc.projects.getProjectById.useQuery(
    { id: projectId },
    { enabled: !!projectId },
  )
  const { data: project } = projectQuery

  const projectViewQuery = trpc.projectPageViews.getViewCountForProjectSlug.useQuery(
    { slug: project?.slug },
    { enabled: !!project?.slug },
  )

  const { data: projectViewCount } = projectViewQuery

  const projectFormPayload = useProjectForm({ project })
  const {
    callbacks: {
      updateProject,
      publishProject,
      unpublishProject,
    },
    formPayload,
  } = projectFormPayload

  const projectPostsPayload = useProjectsPosts({ project })
  const {
    callbacks: { createPost },
  } = projectPostsPayload

  return (
    <MobileLayout>
      <Form callbacks={{ submitForm: updateProject }} formPayload={formPayload} id="project-form">
        <CreateAccountNotice project={project} />
        <EditProjectBanner editMode project={project} projectViewCount={projectViewCount} />
        <MainImage project={project} />
        <PublishProject callbacks={{ publishProject }} project={project} />
        <ProjectImageThumbs editMode project={project} />
        <LegacyDescription editMode project={project} />
        <Parts editMode callbacks={callbacks(undefined, setState)} project={project} />

        <Button
          colorScheme="gray"
          marginTop="4"
          onClick={() => createPost({ categoryKey: 'shed_time' })}
          size="lg"
          width="auto"
        >
          Create Shed Time Post
        </Button>

        <Share editMode project={project} />
        <Attributes editMode project={project} />
        <Links callbacks={callbacks(undefined, setState)} editMode project={project} />
        <Actions callbacks={{ publishProject, unpublishProject }} editMode project={project} />
      </Form>

      <CreateOrEditProjectAttributeModal
        callbacks={{ closeModal: () => setState(s => ({ ...s, showCreateOrEditProjectAttributeModal: false })) }}
        showModal={showCreateOrEditProjectAttributeModal}
      />

      <CreateOrEditProjectExternalLinkModal
        callbacks={callbacks('CreateOrEditProjectExternalLinkModal', setState)}
        project={project}
        showModal={showCreateOrEditProjectExternalLinkModal}
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
