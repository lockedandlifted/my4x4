import { Flex } from '@chakra-ui/react'
import NextImage from 'next/image'

import type { Business } from '@prisma/client'

import { trpc } from '@utils/trpc'

import useImageUrl from '@hooks/useImageUrl'
import useUserImageUpload from '@hooks/useUserImageUpload'

import FileUploadButton from '@components/FileUploadButton'

type ProfileImageProps = {
  business: Business,
}

const ProfileImage = (props: ProfileImageProps) => {
  const { business } = props

  const { businesses: { getBusinessById: { invalidate } } } = trpc.useContext()

  const { uppy } = useUserImageUpload({
    callbacks: {
      onSuccess: () => invalidate({ id: business.id }),
    },
    userId: business.id,
  })

  const image = business.businessesImages?.[0]?.image
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
    <Flex alignItems="center" direction="column" marginBottom={8}>
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
            alt="Business Main Image"
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
