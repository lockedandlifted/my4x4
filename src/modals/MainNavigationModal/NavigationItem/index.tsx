import { Flex, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

type NavigationItemProps = {
  href?: string,
  icon: React.ReactNode,
  onClick?: VoidFunction,
  title: string,
}

const NavigationItem = (props: NavigationItemProps) => {
  const {
    href, icon, onClick, title,
  } = props

  return (
    <NextLink href={href || ''} onClick={onClick}>
      <Flex alignItems="center" marginBottom={4}>
        <Text color="gray.300" fontSize={24}>{icon}</Text>
        <Text color="gray.600" fontWeight="bold" marginLeft={4}>{title}</Text>
      </Flex>
    </NextLink>
  )
}

export default NavigationItem
