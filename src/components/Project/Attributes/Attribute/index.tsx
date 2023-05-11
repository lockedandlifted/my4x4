import { Flex, Heading, Text } from '@chakra-ui/react'

type AttributeProps = {
  attribute: Attribute,
  last?: boolean,
  value: string,
}

const Attribute = (props: AttributeProps) => {
  const { attribute, last = false, value } = props

  return (
    <Flex
      alignItems="center"
      marginBottom={last ? 0 : 2}
    >
      <Heading color="blackAlpha.500" size="sm" width="140px">{attribute.title}</Heading>
      <Text color="black">{value}</Text>
    </Flex>
  )
}

export default Attribute
