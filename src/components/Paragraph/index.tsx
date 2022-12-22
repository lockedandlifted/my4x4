import { Text } from '@chakra-ui/react'

type ParagraphProps = {
  children: React.ReactNode,
}

const Paragraph = (props: ParagraphProps) => {
  const { children, ...restProps } = props

  return (
    <Text lineHeight="1.5" whiteSpace="pre-wrap" {...restProps}>
      {children}
    </Text>
  )
}

export default Paragraph
