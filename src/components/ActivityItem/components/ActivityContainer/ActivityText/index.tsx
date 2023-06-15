import { Text } from '@chakra-ui/react'

type ActivityTextProps = {
  children: React.ReactNode,
}

const ActivityText = (props: ActivityTextProps) => {
  const { children } = props

  return (
    <Text marginTop="4">
      {children}
    </Text>
  )
}

export default ActivityText
