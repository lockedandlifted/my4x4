import { useRef, useState } from 'react'
import { Flex } from '@chakra-ui/react'

import type { ProjectsImage } from '@prisma/client'

import { trpc } from '@utils/trpc'

import ProjectsPartSearch from './ProjectsPartSearch'
import Tag from './Tag'

type HandleClickParams = {
  containerRef: React.RefObject<HTMLDivElement>,
  inputRef: React.RefObject<HTMLInputElement>,
  e: MouseEvent,
  scale: number,
  setClickLocation: Function,
}

const handleClick = (params: HandleClickParams) => {
  const {
    containerRef, e, inputRef, scale, setClickLocation,
  } = params
  const { clientX, clientY } = e

  const { x: containerX, y: containerY } = containerRef.current.getBoundingClientRect()

  const clickLocation = {
    x: (clientX - containerX) / scale,
    y: (clientY - containerY) / scale,
  }

  setClickLocation(clickLocation)

  inputRef.current?.focus()
}

const defaultState = {
  x: 0,
  y: 0,
}

const selectItem = (params) => {
  const {
    clickLocation, createProjectPartsImageTagMutation, projectsImage, selectedItem, setClickLocation,
  } = params

  if (selectedItem.id) {
    const data = {
      imageId: projectsImage.imageId,
      projectsPartId: selectedItem.id,
      x: clickLocation.x,
      y: clickLocation.y,
    }

    createProjectPartsImageTagMutation.mutate(data)

    setClickLocation(defaultState)
  }
}

type TagContainerProps = {
  containerRef: React.RefObject<HTMLDivElement>,
  height: number,
  projectsImage: ProjectsImage,
  scale: number,
  width: number,
}

const TagContainer = (props: TagContainerProps) => {
  const {
    containerRef, height, projectsImage, scale, width,
  } = props

  const [clickLocation, setClickLocation] = useState(defaultState)

  // Query
  const projectPartsImageTagsQuery = trpc.projectPartsImageTags.getProjectPartsImageTags.useQuery({
    include: {
      imageTag: true,
      projectPart: {
        include: {
          manufacturerPart: {
            include: {
              manufacturer: true,
            },
          },
        },
      },
    },
    imageId: projectsImage?.imageId,
  }, { enabled: !!projectsImage?.imageId })

  const { data: projectPartsImageTags = [] } = projectPartsImageTagsQuery

  // Mutation
  const createProjectPartsImageTagMutation = trpc.projectPartsImageTags.createProjectPartsImageTag.useMutation()

  const inputRef = useRef<HTMLInputElement>(null)

  if (!containerRef.current) {
    return null
  }

  return (
    <Flex
      onClick={e => handleClick({
        containerRef, e, inputRef, scale, setClickLocation,
      })}
      position="absolute"
      width={width}
      height={height}
      zIndex={1}
    >
      {projectPartsImageTags.map((projectPartsImageTag) => {
        const { id, imageTag: { x, y } } = projectPartsImageTag

        return (
          <Tag key={id} x={x * scale} y={y * scale} />
        )
      })}

      {!!clickLocation.x && (
        <>
          <Tag x={clickLocation.x * scale} y={clickLocation.y * scale} />

          <ProjectsPartSearch
            callbacks={{
              selectItem: result => selectItem({
                clickLocation,
                createProjectPartsImageTagMutation,
                projectsImage,
                selectedItem: result,
                setClickLocation,
              }),
            }}
            inputRef={inputRef}
            projectsImage={projectsImage}
          />
        </>
      )}
    </Flex>
  )
}

TagContainer.displayName = 'TagContainer'

export default TagContainer
