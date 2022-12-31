import { useRef } from 'react'
import { Button, Flex } from '@chakra-ui/react'

export const TAG_HEIGHT = 20
export const TAG_WIDTH = 20

type TagProps = {
  x: number,
  y: number,
}

const Tag = (props: TagProps) => {
  const { x, y } = props

  const inputRef = useRef(null)

  return (
    <Flex
      alignItems="center"
      backgroundColor="white"
      borderRadius="100%"
      height={`${TAG_HEIGHT}px`}
      justifyContent="center"
      left={`${x - (TAG_WIDTH / 2)}px`}
      position="absolute"
      top={`${y - (TAG_HEIGHT / 2)}px`}
      width={`${TAG_WIDTH}px`}
      _before={{
        backgroundColor: 'black',
        borderRadius: '100%',
        content: '""',
        display: 'block',
        height: '16px',
        left: '2px',
        postion: 'absolute',
        top: '5px',
        width: '16px',
      }}
    />
  )
}

export default Tag
