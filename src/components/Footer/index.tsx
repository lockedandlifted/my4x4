import Image from 'next/image'
import { Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'

import LogoUrl from './assets/logo.svg'
import Instagram from './assets/instagram.svg'
import TikTok from './assets/tiktok.svg'

const Footer = () => {
  return (
    <Flex
      flexDirection="column"
      height="80px"
      marginTop="16"
      width="100%"
      paddingX={[4]}
    >
      <Flex>
        <Link href="/">
          <Image priority src={LogoUrl} width={60} alt="Locked and Lifted Logo" />
        </Link>
      </Flex>

      <Flex flexDirection="row" paddingTop="2" justifyContent="space-between">
        <Flex>
          <Link href="/">
            <Text fontSize='xs' color='gray.400'>Got a suggestion?</Text>
          </Link>

          <Text fontSize='xs' color='gray.400' marginLeft="1">My4x4.info © 2021</Text>
        </Flex>

        <Flex flexDirection="row">
          <Link href="https://www.instagram.com/locked.and.lifted/">
            <Image priority src={Instagram} width={14} alt="Instagram Account" />
          </Link>

          <Link href="https://www.tiktok.com/@lockedandlifted" style={{marginLeft:'8px'}}>
            <Image priority src={TikTok} width={14} alt="Tik Tok Account" />
          </Link>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Footer
