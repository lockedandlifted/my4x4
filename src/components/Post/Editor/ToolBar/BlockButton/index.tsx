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

  return (
    <IconButton
      aria-label={format}
      icon={children}
      onMouseDown={(event) => {
        event.preventDefault()
        CustomEditor.toggleBlock(editor, format)
      }}
      marginRight="1"
      variant="outline"
    />
  )
}

export default BlockButton
