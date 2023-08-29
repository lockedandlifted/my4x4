import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react'
import {
  FaPlusCircle, FaComments, FaHome, FaSignOutAlt, FaTruckMonster, FaUserEdit,
} from 'react-icons/fa'

import useSession from '@hooks/useSession'

import NavigationItem from './NavigationItem'

type MainNavigationModalProps = {
  callbacks: {
    closeModal: VoidFunction,
  },
  showModal: boolean,
}

const MainNavigationModal = (props: MainNavigationModalProps) => {
  const { callbacks: { closeModal }, showModal } = props

  const { isAuthenticated } = useSession()

  return (
    <Drawer
      isOpen={showModal}
      placement="right"
      size="xl"
      onClose={closeModal}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Navigation</DrawerHeader>

        <DrawerBody paddingTop={12}>
          <NavigationItem
            href="/"
            icon={<FaHome />}
            title="Home"
          />

          <NavigationItem
            href="/posts"
            icon={<FaComments />}
            title="Forum"
          />

          <NavigationItem
            href="/recent"
            icon={<FaTruckMonster />}
            title="Latest Builds"
          />

          <NavigationItem
            href="/projects/new"
            icon={<FaPlusCircle />}
            title="Add a Build"
          />

          {isAuthenticated && (
            <>
              <NavigationItem
                href="/businesses/new"
                icon={<FaPlusCircle />}
                title="Add a Business"
              />

              <NavigationItem
                href="/users/account"
                icon={<FaUserEdit />}
                title="Account"
              />

              <NavigationItem
                href="/api/auth/logout"
                icon={<FaSignOutAlt />}
                title="Sign Out"
              />
            </>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default MainNavigationModal
