import { useRef, useState } from 'react'
import { Button, Flex } from '@chakra-ui/react'

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

type TagContainerProps = {
  containerRef: React.RefObject<HTMLDivElement>,
  height: number,
  scale: number,
  width: number,
}

const TagContainer = (props: TagContainerProps) => {
  const {
    containerRef, height, scale, width,
  } = props

  const [clickLocation, setClickLocation] = useState({})

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
      {!!clickLocation.x && (
        <>
          <Tag x={clickLocation.x * scale} y={clickLocation.y * scale} />

          <Flex
            backgroundColor="rgba(0, 0, 0, 0.8)"
            borderRadius="lg"
            padding={2}
            position="absolute"
            justifyContent="space-between"
            bottom={2}
            left={2}
            right={2}
          >
            <input
              ref={inputRef}
              onClick={e => e.stopPropagation()}
              placeholder="Find a part to tag..."
              type="text"
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                fontSize: 16,
                width: '100%',
              }}
            />

            <Button flexShrink={0} marginLeft={2} size="xs">Save</Button>
          </Flex>
        </>
      )}
    </Flex>
  )
}

export default TagContainer
