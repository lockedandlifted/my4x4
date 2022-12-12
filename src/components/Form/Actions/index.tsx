import { Flex } from '@chakra-ui/react'

type ActionsProps = {
  children: React.ReactNode,
}

const Actions = (props: ActionsProps) => {
  const { children } = props

  return (
    <Flex justifyContent="flex-end" marginTop="2">
      {children}
    </Flex>
  )
}

export default Actions
