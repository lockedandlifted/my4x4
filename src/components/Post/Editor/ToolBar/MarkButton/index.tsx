import { useSlate } from 'slate-react'
import { IconButton } from '@chakra-ui/react'

import CustomEditor from '@utils/customEditor'

type MarkButtonProps = {
  children: React.ReactElement,
  format: 'bold' | 'italic' | 'underline',
}

const MarkButton = (props: MarkButtonProps) => {
  const { children, format } = props

  const editor = useSlate()

  const isActive = CustomEditor.isMarkActive(editor, format)

  return (
    <IconButton
      aria-label={format}
      backgroundColor={isActive ? 'ButtonText' : undefined}
      color={isActive ? 'white' : undefined}
      icon={children}
      onMouseDown={(event) => {
        event.preventDefault()
        CustomEditor.toggleMark(editor, format)
      }}
      marginRight="1"
      variant={isActive ? 'solid' : 'outline'}
    />
  )
}

export default MarkButton
