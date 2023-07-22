import {
  FaBold, FaItalic, FaUnderline, FaListOl, FaListUl,
} from 'react-icons/fa'
import { Button, Flex, Text } from '@chakra-ui/react'

import BlockButton from './BlockButton'
import MarkButton from './MarkButton'

type ToolBarProps = {
  editor?: any,
}

const ToolBar = (props: ToolBarProps) => {
  const { editor } = props

  return (
    <Flex borderBottomWidth="1px" paddingBottom="2" marginBottom="2">
      <MarkButton format="bold"><FaBold /></MarkButton>
      <MarkButton format="italic"><FaItalic /></MarkButton>
      <MarkButton format="underline"><FaUnderline /></MarkButton>

      <BlockButton format="heading-one"><Text>H1</Text></BlockButton>
      <BlockButton format="heading-two"><Text>H2</Text></BlockButton>

      <BlockButton format="ordered-list"><FaListOl /></BlockButton>
      <BlockButton format="unordered-list"><FaListUl /></BlockButton>

      <Button
        onMouseDown={(event) => {
          event.preventDefault()
        }}
        marginLeft="1"
      >
        Image
      </Button>
    </Flex>
  )
}

export default ToolBar
