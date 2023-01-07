import { Flex, Text } from '@chakra-ui/react'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { FaUser } from 'react-icons/fa'

import type { User } from '@prisma/client'

import useImageUrl from '@hooks/useImageUrl'

type OwnerProfileProps = {
  invertTextColor: boolean,
  user: User,
}

const OwnerProfile = (props: OwnerProfileProps) => {
  const { invertTextColor = false, user } = props

  const image = user?.usersImages?.[0]?.image
  const hasImage = !!image

  const { imageUrl } = useImageUrl({
    enabled: hasImage,
    path: image?.fileKey,
    transformation: [{
      focus: 'auto',
      height: '710',
      width: '568',
    }],
  })

  if (!user) {
    return null
  }

  return (
    <Flex alignItems="center">
      <Flex
        alignItems="center"
        backgroundColor="gray.100"
        borderRadius="100%"
        height="40px"
        justifyContent="center"
        overflow="hidden"
        width="40px"
      >
        {!imageUrl && (
          <Text color="gray.500" fontSize={14}>
            <FaUser />
          </Text>
        )}

        {!!imageUrl && (
          <NextImage
            alt="User Profile Image"
            height={40}
            width={40}
            src={imageUrl || ''}
          />
        )}
      </Flex>

      <NextLink href={`/users/${user?.username}`}>
        <Flex direction="column" color={invertTextColor ? 'black' : 'white'} justifyContent="center" marginLeft={4}>
          <Text fontSize="md" fontWeight="bold">{user.name}</Text>
          <Text fontSize="sm">{user.username}</Text>
        </Flex>
      </NextLink>
    </Flex>
  )
}

export default OwnerProfile
