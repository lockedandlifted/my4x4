import NextImage from 'next/image'
import { Flex, Text } from '@chakra-ui/react'
import { FaUser } from 'react-icons/fa'

import type { Prisma } from '@prisma/client'

import useImageUrl from '@hooks/useImageUrl'

type UserWithImage = Prisma.UserGetPayload<{
  include: {
    usersImages: {
      include: {
        image: true,
      },
      orderBy: {
        sort: 'asc',
      },
      take: 1,
    },
  },
}>

type UserImageProps = {
  height?: number,
  user?: UserWithImage,
  width?: number,
}

const UserImage = (props: UserImageProps) => {
  const { height = 40, user, width = 40 } = props

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

  return (
    <Flex
      alignItems="center"
      backgroundColor="gray.100"
      borderRadius="100%"
      flexShrink={0}
      height={`${height}px`}
      justifyContent="center"
      overflow="hidden"
      width={`${width}px`}
    >
      {!imageUrl && (
        <Text color="gray.500" fontSize={14}>
          <FaUser />
        </Text>
      )}

      {!!imageUrl && (
        <NextImage
          alt="User Profile Image"
          height={height}
          width={width}
          src={imageUrl || ''}
        />
      )}
    </Flex>
  )
}

export default UserImage
