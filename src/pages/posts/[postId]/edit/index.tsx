import { useState } from 'react'
import { useRouter } from 'next/router'
import { Flex, Heading } from '@chakra-ui/react'

import processCallback from '@utils/processCallback'
import { trpc } from '@utils/trpc'

import MobileLayout from '@layouts/MobileLayout'

import AddPostRelatedEntitiesModal from '@modals/AddPostRelatedEntitiesModal'

import PostForm from '@components/PostForm'

const showModal = (modalKey: string, setState, payload?: object) => {
  setState(state => ({
    ...state,
    [`show${modalKey}`]: true,
    modalPayloads: {
      ...state.modalPayloads,
      [modalKey]: payload,
    },
  }))
}

const callbacks = (componentName: string | undefined, setState) => {
  const componentCallbacks = {
    AddPostRelatedEntitiesModal: {
      closeModal: () => setState(s => ({ ...s, showAddPostRelatedEntitiesModal: false })),
      // createProjectsExternalLink: payload => processCallback(payload),
      showModal: (payload?: object) => showModal('AddPostRelatedEntitiesModal', setState, payload),
    },
  }

  return componentCallbacks[componentName] || componentCallbacks
}

const defaultState = {
  showAddPostRelatedEntitiesModal: false,
}

const EditPostPage = () => {
  const { query: { postId } } = useRouter()

  const [state, setState] = useState(defaultState)
  const {
    showAddPostRelatedEntitiesModal,
  } = state

  const postQuery = trpc.posts.getPostById.useQuery(
    { id: postId },
    { enabled: !!postId },
  )
  const { data: post } = postQuery

  return (
    <MobileLayout>
      <Flex direction="column" marginTop={8} width="100%">
        <Heading as="h1" fontWeight="medium" marginBottom="4" size="lg">
          Edit Post
        </Heading>

        <PostForm
          callbacks={callbacks(undefined, setState)}
          post={post}
        />
      </Flex>

      <AddPostRelatedEntitiesModal
        callbacks={{
          closeModal: () => setState(s => ({ ...s, showAddPostRelatedEntitiesModal: false })),
        }}
        post={post}
        showModal={showAddPostRelatedEntitiesModal}
      />
    </MobileLayout>
  )
}

export default EditPostPage
