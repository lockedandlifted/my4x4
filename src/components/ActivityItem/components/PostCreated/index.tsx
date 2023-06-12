import { Flex } from '@chakra-ui/react'

type PostCreatedProps = {
  children: React.ReactNode,
}

const PostCreated = (props: PostCreatedProps) => {
  const { children } = props

  console.log(props)

  return (
    <Flex>
      Post Created!
    </Flex>
  )
}

export default PostCreated
