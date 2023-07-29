import { useSlate } from 'slate-react'
import { IconButton } from '@chakra-ui/react'

import CustomEditor from '@utils/customEditor'

type BlockButtonProps = {
  children: React.ReactElement,
  format: 'heading-one' | 'heading-two' | 'ordered-list' | 'unordered-list',
}

const BlockButton = (props: BlockButtonProps) => {
  const { children, format } = props

  const editor = useSlate()

  const isActive = CustomEditor.isBlockActive(editor, format)

  return (
    <IconButton
      aria-label={format}
      backgroundColor={isActive ? 'ButtonText' : undefined}
      color={isActive ? 'white' : undefined}
      icon={children}
      onMouseDown={(event) => {
        event.preventDefault()
        CustomEditor.toggleBlock(editor, format)
      }}
      marginRight="1"
      variant="outline"
      _hover={{ backgroundColor: isActive ? 'ButtonText' : undefined }}
    />
  )
}

export default BlockButton
