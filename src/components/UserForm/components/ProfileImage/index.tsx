import { Flex } from '@chakra-ui/react'

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
      onSuccess: () => invalidate({ id: user?.id }),
    },
    userId: user?.id,
  })

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
    <Flex>
      <Flex
        alignItems="center"
        borderRadius="100%"
        boxShadow="base"
        flexDirection="column"
        overflow="hidden"
        position="relative"
        marginTop={4}
        justifyContent="center"
        height="100px"
        width="100px"
        style={{ aspectRatio: '4 / 5' }}
      >
        Image
      </Flex>

      {!hasImage && !!uppy && (
        <FileUploadButton
          buttonProps={{
            backgroundColor: hasImage ? 'whiteAlpha.300' : 'blackAlpha.300',
            colorScheme: hasImage ? 'whiteAlpha' : 'blackAlpha',
            marginTop: 'auto',
            size: 'lg',
            zIndex: '1',
            width: '100%',
            _hover: {
              backgroundColor: hasImage ? 'whiteAlpha.400' : 'blackAlpha.400',
            },
          }}
          buttonText="Add Photo"
          uppy={uppy}
        />
      )}
    </Flex>
  )
}

export default ProfileImage
