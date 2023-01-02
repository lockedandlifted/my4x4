import { Flex } from '@chakra-ui/react'

export const TAG_HEIGHT = 20
export const TAG_WIDTH = 20

type TagProps = {
  children: React.ReactNode,
  x: number,
  y: number,
}

const Tag = (props: TagProps) => {
  const { children, x, y } = props

  return (
    <Flex
      alignItems="center"
      backgroundColor="black"
      borderRadius="100%"
      color="white"
      fontWeight="bold"
      fontSize="sm"
      height={`${TAG_HEIGHT}px`}
      justifyContent="center"
      left={`${x - (TAG_WIDTH / 2)}px`}
      position="absolute"
      top={`${y - (TAG_HEIGHT / 2)}px`}
      width={`${TAG_WIDTH}px`}
      _after={{
        backgroundColor: 'white',
        borderRadius: '100%',
        content: '""',
        display: 'block',
        height: `${TAG_HEIGHT + 4}px`,
        left: '-2px',
        position: 'absolute',
        zIndex: -1,
        top: '-2px',
        width: `${TAG_WIDTH + 4}px`,
      }}
    >
      {children}
    </Flex>
  )
}

export default Tag
