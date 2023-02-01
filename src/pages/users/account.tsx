import { useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'

import type { GetServerSideProps } from 'next'

import processCallback from '@utils/processCallback'
import { trpc } from '@utils/trpc'
import setTemporaryUserIdCookie from '@utils/setTemporaryUserIdCookie'

import MobileLayout from '@layouts/MobileLayout'

import CreateOrEditUsersExternalLinkModal from '@modals/CreateOrEditUsersExternalLinkModal'

import Account from '@components/User/Account'
import Businesses from '@components/User/Businesses'
import Links from '@components/User/Links'
import Projects from '@components/User/Projects'
import UserForm from '@components/UserForm'

const showModal = (setState, payload?: object) => {
  setState(state => ({
    ...state,
    showCreateOrEditUsersExternalLinkModal: true,
    modalPayloads: {
      ...state.modalPayloads,
      CreateOrEditUsersExternalLinkModal: payload,
    },
  }))
}

const callbacks = (componentName: string | undefined, setState) => {
  const componentCallbacks = {
    CreateOrEditUsersExternalLinkModal: {
      closeModal: () => setState(s => ({ ...s, showCreateOrEditUsersExternalLinkModal: false })),
      createUsersExternalLink: payload => processCallback(payload),
      showModal: (payload?: object) => showModal(setState, payload),
    },
  }

  return componentCallbacks[componentName] || componentCallbacks
}

const defaultState = {
  showCreateOrEditUsersExternalLinkModal: false,
}

const UserAccountPage = (props: { temporaryUserId: string }) => {
  const { temporaryUserId } = props

  const { data: sessionData } = useSession()

  const [state, setState] = useState(defaultState)
  const { showCreateOrEditUsersExternalLinkModal } = state

  const userQuery = trpc.users.getUserById.useQuery({
    id: sessionData?.user?.id,
  }, { enabled: !!sessionData?.user?.id })

  const { data: user } = userQuery

  return (
    <MobileLayout>
      <Flex direction="column">
        {!!user?.id && (<UserForm user={user} />)}

        <Links callbacks={callbacks(undefined, setState)} editMode user={user} />

        <Projects editMode temporaryUserId={temporaryUserId} user={user} />

        <Businesses editMode user={user} />

        <Account />
      </Flex>

      {!!user && (
        <CreateOrEditUsersExternalLinkModal
          callbacks={callbacks('CreateOrEditUsersExternalLinkModal', setState)}
          showModal={showCreateOrEditUsersExternalLinkModal}
          user={user}
        />
      )}
    </MobileLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const temporaryUserId = setTemporaryUserIdCookie(context)
  return { props: { temporaryUserId } }
}

export default UserAccountPage
