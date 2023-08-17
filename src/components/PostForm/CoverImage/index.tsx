import { useState } from 'react'
import { Button, Flex, Image } from '@chakra-ui/react'
import { FiUploadCloud } from 'react-icons/fi'
import { DashboardModal } from '@uppy/react'

import type { Post } from '@prisma/client'

import { trpc } from '@utils/trpc'

import useImageUrl from '@hooks/useImageUrl'
import usePostImageUpload from '@hooks/usePostImageUpload'

type CoverImageProps = {
  editMode: boolean,
  post: Post,
}

const CoverImage = (props: CoverImageProps) => {
  const { editMode, post } = props

  const [uploadModalOpen, setUploadModalOpen] = useState(false)

  const { posts: { getPostById: { invalidate } } } = trpc.useContext()

  const { uppy } = usePostImageUpload({
    callbacks: {
      onSuccess: () => invalidate({ id: post?.id }),
    },
    postId: post?.id,
  })

  const image = post?.postsImages?.[0]?.image

  const hasImage = !!image

  const { imageUrl } = useImageUrl({
    enabled: hasImage,
    path: image?.fileKey,
    transformation: [{
      focus: 'auto',
      height: '480',
      width: '1000',
    }],
  })

  return (
    <Flex direction="column">
      {uppy && (
        <DashboardModal
          doneButtonHandler={() => setUploadModalOpen(false)}
          onRequestClose={() => setUploadModalOpen(false)}
          open={uploadModalOpen}
          uppy={uppy}
        />
      )}

      {hasImage && (
        <Flex
          alignItems="center"
          flexDirection="column"
          overflow="hidden"
          position="relative"
          justifyContent="center"
          height="240px"
          width="100%"
        >
          <Image
            alt="Post Cover Image"
            backgroundPosition="center center"
            objectFit="cover"
            src={imageUrl}
            width="100%"
          />
        </Flex>
      )}

      {editMode && !!uppy && (
        <Button
          borderRadius="md"
          colorScheme="gray"
          leftIcon={<FiUploadCloud size={18} />}
          marginTop="2"
          onClick={() => setUploadModalOpen(true)}
          size="md"
          zIndex="1"
          variant="outline"
          width="100%"
        >
          {hasImage ? 'Change Cover Photo' : 'Add Cover Photo'}
        </Button>
      )}
    </Flex>
  )
}

export default CoverImage
