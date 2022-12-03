import { Flex } from '@chakra-ui/react'

import Field from './Field'

type FormProps = {
  children: React.ReactNode,
}

const Form = (props: FormProps) => {
  const { children } = props

  return (
    <Flex flexDirection="column" width="100%">
      {children}
    </Flex>
  )
}

Form.Field = Field

export default Form
