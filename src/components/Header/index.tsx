import Image from 'next/image'
import {
  Box, Flex, Link, useDisclosure,
} from '@chakra-ui/react'
import { FiMenu, FiSearch } from 'react-icons/fi'

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
        <Flex width="60px">
          <Link onClick={onOpen} fontSize={28} width="28px">
            <FiMenu />
          </Link>
        </Flex>

        <Link href="/" marginX="auto">
          <Image priority src={LogoUrl} width={82} alt="MY4X4 Logo" />
        </Link>

        <Flex>
          <Flex
            as="a"
            alignItems="center"
            justifyContent="center"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="100%"
            fontSize="sm"
            height="28px"
            href="/search"
            marginRight="1"
            width="28px"
          >
            <FiSearch />
          </Flex>

          <LoggedInUser />
        </Flex>
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
