import { Flex, Text } from '@chakra-ui/react'
import NextImage from 'next/image'
import { ProgressBar } from '@uppy/react'

import type { Project } from '@prisma/client'

import { trpc } from '@utils/trpc'

import useImageUrl from '@hooks/useImageUrl'
import useProjectImageUpload from '@hooks/useProjectImageUpload'

import FileUploadButton from '@components/FileUploadButton'

import PlaceholderUrl from './assets/placeholder.png'

type MainImageProps = {
  project: Project,
}

const MainImage = (props: MainImageProps) => {
  const { project } = props

  const { projects: { getProjectById: { invalidate } } } = trpc.useContext()

  const { uppy } = useProjectImageUpload({
    callbacks: {
      onSuccess: () => invalidate({ id: project?.id }),
    },
    projectId: project?.id,
  })

  const image = project?.projectsImages?.[0]?.image
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
    <>
      <Flex
        borderRadius={20}
        boxShadow="base"
        flexDirection="column"
        overflow="hidden"
        position="relative"
        maxWidth="100%"
        style={{ aspectRatio: '4 / 5' }}
      >
        {hasImage && <NextImage alt="Project Main Image" fill src={imageUrl} style={{ objectFit: 'cover' }} />}
        {!hasImage && (
          <NextImage
            alt="Image Placeholder"
            fill
            src={PlaceholderUrl}
            style={{ marginTop: 'auto', objectFit: 'cover', opacity: 0.3 }}
          />
        )}

        <Flex
          background={
            hasImage
              ? 'linear-gradient(0deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.8) 60%, rgba(255,255,255,0) 100%)'
              : undefined
          }
          direction="column"
          marginTop="auto"
          padding="8"
          zIndex="1"
        >
          <Flex alignItems="center">
            <Text
              color={hasImage ? 'white' : 'black'}
              fontSize="3xl"
              fontWeight="bold"
              lineHeight={1.3}
              marginBottom={hasImage ? 4 : 8}
              width="75%"
            >
              {project?.title}
            </Text>
          </Flex>

          {!hasImage && !!uppy && (
            <FileUploadButton
              buttonProps={{
                colorScheme: 'blue',
                marginTop: 'auto',
                size: 'lg',
                zIndex: '1',
                width: '100%',
              }}
              buttonText="Upload a Photo"
              uppy={uppy}
            />
          )}
        </Flex>
      </Flex>

      {!!uppy && (
        <ProgressBar uppy={uppy} fixed hideAfterFinish />
      )}
    </>
  )
}

export default MainImage
