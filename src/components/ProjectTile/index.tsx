import {
  Badge, Flex, LinkBox, LinkOverlay, Text,
} from '@chakra-ui/react'
import Image from 'next/image'

import type { Project } from '@prisma/client'

import useImageUrl from '@hooks/useImageUrl'

type ProjectTileProps = {
  boxProps?: object,
  compact?: boolean,
  project: Project,
}

const ProjectTile = (props: ProjectTileProps) => {
  const { boxProps, compact = false, project } = props

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
    <LinkBox>
      <Flex
        boxShadow="base"
        borderRadius="xl"
        flexDirection="column"
        overflow="hidden"
        position="relative"
        maxWidth="100%"
        marginBottom={compact ? 0 : 4}
        style={{ aspectRatio: '4 / 5' }}
        {...boxProps}
      >
        {hasImage && !!imageUrl && (
          <Image alt="Project Main Image" fill src={imageUrl} style={{ objectFit: 'cover' }} />
        )}

        <Flex
          background={
            hasImage
              ? 'linear-gradient(0deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.8) 60%, rgba(255,255,255,0) 100%)'
              : undefined
          }
          direction="column"
          marginTop="auto"
          padding={compact ? 6 : 8}
          paddingBottom={compact ? 4 : undefined}
          zIndex="1"
        >
          <Flex alignItems="center">
            <LinkOverlay href={`/${project?.slug}`}>
              {project?.createdByOwner && (
                <Badge
                  colorScheme="teal"
                  fontSize={compact ? '2xs' : 'xs'}
                  lineHeight={1.4}
                  marginBottom={2}
                >
                  Verified
                </Badge>
              )}

              {!project?.createdByOwner && (
                <Badge
                  fontSize={compact ? '2xs' : 'xs'}
                  lineHeight={1.4}
                  marginBottom={2}
                  variant="subtle"
                >
                  Community Build
                </Badge>
              )}

              <Text
                color={hasImage ? 'white' : 'black'}
                fontSize={compact ? 'xl' : '3xl'}
                fontWeight="bold"
                lineHeight={1.3}
                marginBottom={1}
                noOfLines={compact ? 2 : undefined}
                width={compact ? '100%' : '75%'}
              >
                {project?.title}
              </Text>

              {!compact && project?.manufacturerModel && (
                <Text
                  color={hasImage ? 'white' : 'black'}
                  fontSize="s"
                  lineHeight={1.3}
                  marginBottom={4}
                >
                  {project?.manufacturerModel?.manufacturer?.title} {project?.manufacturerModel?.title}
                </Text>
              )}

            </LinkOverlay>
          </Flex>
        </Flex>
      </Flex>
    </LinkBox>

  )
}

export default ProjectTile
