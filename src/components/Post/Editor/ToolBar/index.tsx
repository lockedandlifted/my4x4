import {
  FaBold, FaItalic, FaUnderline, FaHeading,
} from 'react-icons/fa'
import { Button, Flex, Text } from '@chakra-ui/react'

import CustomEditor from '@utils/customEditor'

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

      <Button
        onMouseDown={(event) => {
          event.preventDefault()
        }}
        marginLeft="1"
      >
        Link
      </Button>

      <Button
        onMouseDown={(event) => {
          event.preventDefault()
        }}
        marginLeft="1"
      >
        Numbered List
      </Button>

      <Button
        onMouseDown={(event) => {
          event.preventDefault()
        }}
        marginLeft="1"
      >
        Bullets
      </Button>

      <Button
        onMouseDown={(event) => {
          event.preventDefault()
        }}
        marginLeft="1"
      >
        Image
      </Button>

      <Button
        onClick={(event) => {
          event.preventDefault()
          console.log(editor.children)
        }}
        marginLeft="1"
      >
        Save
      </Button>
    </Flex>
  )
}

export default ToolBar
