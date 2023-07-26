import { Flex } from '@chakra-ui/react'
import NextImage from 'next/image'

import type { User } from '@prisma/client'

import useImageUrl from '@hooks/useImageUrl'

import PlaceholderUrl from './assets/placeholder.png'

type ProfileImageProps = {
  user: User,
}

const ProfileImage = (props: ProfileImageProps) => {
  const { user } = props

  const image = user?.usersImages?.[0]?.image
  const hasImage = !!image

  const { imageUrl } = useImageUrl({
    enabled: hasImage,
    path: image?.fileKey,
    transformation: [{
      focus: 'auto',
      height: '400',
      width: '400',
    }],
  })

  return (
    <Flex alignItems="center" direction="column">
      <Flex
        alignItems="center"
        borderRadius="100%"
        boxShadow="base"
        flexDirection="column"
        overflow="hidden"
        position="relative"
        marginTop={4}
        justifyContent="center"
        height="200px"
        width="200px"
        style={{ aspectRatio: '4 / 5' }}
      >
        {hasImage && (
          <NextImage
            alt="User Main Image"
            fill
            src={imageUrl}
            style={{ objectFit: 'cover' }}
          />
        )}

        {!hasImage && (
          <NextImage
            alt="Placeholder Image"
            fill
            src={PlaceholderUrl}
            style={{ objectFit: 'cover' }}
          />
        )}
      </Flex>
    </Flex>
  )
}

export default ProfileImage
