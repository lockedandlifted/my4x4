import { Flex } from '@chakra-ui/react'

type ActivityBodyProps = {
  children: React.ReactNode,
}

const ActivityBody = (props: ActivityBodyProps) => {
  const { children } = props

  return (
    <Flex direction="column" marginTop="4" width="100%">
      {children}
    </Flex>
  )
}

export default ActivityBody
