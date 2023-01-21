import { Divider, Flex, Text } from '@chakra-ui/react'

type SectionDividerProps = {
  children: React.ReactNode,
}

const SectionDivider = (props: SectionDividerProps) => {
  const { children } = props

  return (
    <Flex align="center" marginTop="2">
      <Divider />

      <Text letterSpacing={1} padding="4" fontSize="xs" color="gray.500">
        {children}
      </Text>

      <Divider />
    </Flex>
  )
}

export default SectionDivider
