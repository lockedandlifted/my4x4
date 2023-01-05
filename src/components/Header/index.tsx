import Image from 'next/image'
import {
  Flex, Link, useDisclosure,
} from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import NextLink from 'next/link'

import MainNavigationModal from '@modals/MainNavigationModal'

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

        <NextLink href="/users/account">
          <Flex
            backgroundColor="black"
            borderRadius="100%"
            height="28px"
            width="28px"
          />
        </NextLink>
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
