import { Flex } from '@chakra-ui/react'
import Image from 'next/image'

import type { User } from '@prisma/client'

import { trpc } from '@utils/trpc'

import useImageUrl from '@hooks/useImageUrl'
import useUserImageUpload from '@hooks/useUserImageUpload'

import FileUploadButton from '@components/FileUploadButton'

type ProfileImageProps = {
  user: User,
}

const ProfileImage = (props: ProfileImageProps) => {
  const { user } = props

  const { users: { getUserById: { invalidate } } } = trpc.useContext()

  const { uppy } = useUserImageUpload({
    callbacks: {
      onSuccess: () => invalidate({ id: user.id }),
    },
    userId: user.id,
  })

  console.log(uppy)

  const image = user.usersImages?.[0]?.image
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
          <Image
            alt="User Main Image"
            fill
            src={imageUrl}
            style={{ objectFit: 'cover' }}
          />
        )}
      </Flex>

      {!!uppy && (
        <FileUploadButton
          buttonProps={{
            colorScheme: 'gray',
            marginTop: 2,
            size: 'sm',
            zIndex: '1',
          }}
          buttonText={hasImage ? 'Change Photo' : 'Add Photo'}
          uppy={uppy}
        />
      )}
    </Flex>
  )
}

export default ProfileImage
