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

  return (
    <IconButton
      aria-label={format}
      icon={children}
      onMouseDown={(event) => {
        event.preventDefault()
        CustomEditor.toggleMark(editor, format)
      }}
      marginRight="1"
      variant="outline"
    />
  )
}

export default MarkButton
