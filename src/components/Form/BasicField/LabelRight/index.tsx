import { Text } from '@chakra-ui/react'

type LabelRightProps = {
  children: React.ReactNode,
}

const LabelRight = (props: LabelRightProps) => {
  const { children } = props

  return (
    <Text color="#C5CDCA" fontSize={12} width="auto">
      {children}
    </Text>
  )
}

export default LabelRight
