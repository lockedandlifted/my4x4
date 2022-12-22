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
      direction="column"
      alignItems="center"
      marginBottom={last ? 0 : 4}
      _after={{
        display: last ? 'none' : 'block',
        content: '""',
        backgroundColor: 'whiteAlpha.300',
        height: '1px',
        marginTop: 4,
        width: '50px',
      }}
    >
      <Heading color="whiteAlpha.700" size="xs">{attribute.title}</Heading>
      <Text color="white">{value}</Text>
    </Flex>
  )
}

export default Attribute
