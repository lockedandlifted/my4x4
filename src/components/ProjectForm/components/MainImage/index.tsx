import { useCallback } from 'react'
import { Button, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import Image from 'next/image'
import { DragDrop, FileInput, ProgressBar } from '@uppy/react'

import type { Project } from '@prisma/client'

import { trpc } from '@utils/trpc'

import useImageUrl from '@hooks/useImageUrl'
import useUppy from '@hooks/useUppy'

import CustomFileInput from '@components/FileInput'

import TempImage from './image.jpg'

type MainImageProps = {
  project: Project,
}

const MainImage = (props: MainImageProps) => {
  const { project } = props

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

  const createProjectsImageMutation = trpc.projectsImages.createProjectsImage.useMutation({
    onSuccess: (data) => {
      console.log('Created Image', data)
    },
  })

  const { mutate } = createProjectsImageMutation

  const uploadSuccess = useCallback((file) => {
    const params = {
      projectId: project?.id,
      image: {
        id: file?.meta?.fileId,
        fileKey: file?.meta?.fileKey,
        filename: file?.meta?.filename,
        originalFilename: file?.meta?.originalFilename,
      },
    }

    mutate(params)

    return params
  }, [project?.id])

  const uppy = useUppy(
    {
      callbacks: {
        uploadSuccess,
      },
    },
    [project?.id],
  )

  return (
    <>
      <Flex
        border="2px dashed"
        borderColor={hasImage ? 'white' : '#efefef'}
        borderRadius={20}
        flexDirection="column"
        overflow="hidden"
        position="relative"
        maxWidth="100%"
        style={{ aspectRatio: '4 / 5' }}
      >
        <Image alt="Project Main Image" fill src={imageUrl || TempImage} style={{ objectFit: 'cover' }} />

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
              marginBottom="8"
              width="75%"
            >
              {project?.title}
            </Text>

            <Link href={`/projects/${project?.id}/edit/details`} style={{ marginLeft: 'auto' }}>
              Edit
            </Link>
          </Flex>

          <Button
            backgroundColor="whiteAlpha.300"
            colorScheme="whiteAlpha"
            marginTop="auto"
            size="lg"
            zIndex="1"
            width="auto"
            _hover={{ backgroundColor: 'whiteAlpha.400' }}
          >
            {hasImage ? 'Change' : 'Add'} Photo
          </Button>
        </Flex>
      </Flex>

      {!!uppy && (
        <>
          <CustomFileInput uppy={uppy} />
          <FileInput pretty uppy={uppy} />
          <ProgressBar uppy={uppy} fixed hideAfterFinish />
        </>
      )}
    </>
  )
}

export default MainImage
