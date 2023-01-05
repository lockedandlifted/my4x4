import Image from 'next/image'
import {
  Flex, Link, useDisclosure,
} from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'

import MainNavigationModal from '@modals/MainNavigationModal'

import LoggedInUser from './LoggedInUser'

import LogoUrl from './assets/logo.svg'

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Flex
        alignItems="center"
        height="64px"
        justifyContent="space-evenly"
        paddingX={[4]}
        width="100%"
      >
        <Link onClick={onOpen} fontSize={28} width="28px">
          <FiMenu />
        </Link>

        <Link href="/" marginX="auto">
          <Image priority src={LogoUrl} width={82} alt="MY4X4 Logo" />
        </Link>

        <LoggedInUser />
      </Flex>

      <MainNavigationModal
        callbacks={{
          closeModal: onClose,
        }}
        showModal={isOpen}
      />
    </>
  )
}

export default Header
