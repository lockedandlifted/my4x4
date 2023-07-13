import React, { useState } from 'react'
import { createEditor, BaseEditor, Descendant } from 'slate'
import { Slate, withReact, ReactEditor } from 'slate-react'

import withEmbeds from '@utils/withEmbeds'

import EditorInput from '@components/Post/Editor/EditorInput'
import ToolBar from '@components/Post/Editor/ToolBar'

type CustomElement = {
  type: 'code' | 'paragraph' | 'youtube',
  children: CustomText[],
}

type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor,
    Element: CustomElement,
    Text: CustomText,
  }
}

type EditorProps = {
  children: React.ReactNode,
  initialValue: Descendant[],
}

const Editor = (props: EditorProps) => {
  const { children, initialValue } = props
  const [editor] = useState(() => withEmbeds(withReact(createEditor())))

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          op => op.type !== 'set_selection',
        )

        if (isAstChange) {
          // Save the value to Local Storage.
          const content = JSON.stringify(value)
          localStorage.setItem('content', content)
        }
      }}
    >
      {React.Children.map(children, child => React.cloneElement(child, { editor }))}
    </Slate>
  )
}

Editor.Input = EditorInput
Editor.ToolBar = ToolBar

export default Editor
