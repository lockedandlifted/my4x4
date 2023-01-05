import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react'
import { FaHome, FaTruckMonster, FaUserEdit } from 'react-icons/fa'

import NavigationItem from './NavigationItem'

type MainNavigationModalProps = {
  callbacks: {
    closeModal: VoidFunction,
  },
  showModal: boolean,
}

const MainNavigationModal = (props: MainNavigationModalProps) => {
  const { callbacks: { closeModal }, showModal } = props

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
            href="/feed"
            icon={<FaTruckMonster />}
            title="Latest Builds"
          />

          <NavigationItem
            href="/users/account"
            icon={<FaUserEdit />}
            title="Account"
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default MainNavigationModal
