import Image from 'next/image'
import { Flex, Link } from '@chakra-ui/react'

import LogoUrl from './assets/logo.svg'

const Header = () => {
  return (
    <Flex
      alignItems="center"
      height="64px"
      justifyContent={['center']}
      paddingX={[4, 8]}
      width="100%"
    >
      <Link href="/">
        <Image priority src={LogoUrl} width={82} alt="MY4X4 Logo" />
      </Link>
    </Flex>
  )
}

export default Header
