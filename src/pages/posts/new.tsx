import { useCallback, useState } from 'react'
import { Button, Flex } from '@chakra-ui/react'
import {
  createEditor, BaseEditor, Descendant, Editor, Element, Transforms,
} from 'slate'
import {
  Slate, Editable, withReact, ReactEditor,
} from 'slate-react'

type CustomElement = { type: 'code' | 'paragraph', children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor,
    Element: CustomElement,
    Text: CustomText,
  }
}

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

const CustomEditor = {
  isBoldMarkActive(editor) {
    const marks = Editor.marks(editor)
    return marks ? marks.bold === true : false
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code',
    })

    return !!match
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    if (isActive) {
      Editor.removeMark(editor, 'bold')
    } else {
      Editor.addMark(editor, 'bold', true)
    }
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Element.isElement(n) && Editor.isBlock(editor, n) },
    )
  },
}

const CodeElement = props => (
  <pre {...props.attributes} style={{ backgroundColor: 'black', color: 'white' }}>
    <code>{props.children}</code>
  </pre>
)

const DefaultElement = props => <p {...props.attributes}>{props.children}</p>

const Leaf = props => (
  <span
    {...props.attributes}
    style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
  >
    {props.children}
  </span>
)

const NewPostPage = () => {
  const [editor] = useState(() => withReact(createEditor()))

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  return (
    <Flex direction="column">
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
        <Flex borderBottom="1px solid">
          <Button
            onMouseDown={(event) => {
              event.preventDefault()
              CustomEditor.toggleBoldMark(editor)
            }}
          >
            Bold
          </Button>

          <Button
            onMouseDown={(event) => {
              event.preventDefault()
              CustomEditor.toggleCodeBlock(editor)
            }}
            marginLeft="1"
          >
            Code Block
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

        <Editable
          onChange={(value) => {
            console.log('onChange', value)
          }}
          onKeyDown={(event) => {
            if (!event.ctrlKey) {
              return
            }

            // Replace the `onKeyDown` logic with our new commands.
            switch (event.key) {
              case '`': {
                event.preventDefault()
                CustomEditor.toggleCodeBlock(editor)
                break
              }

              case 'b': {
                event.preventDefault()
                CustomEditor.toggleBoldMark(editor)
                break
              }
            }
          }}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </Slate>
    </Flex>
  )
}

export default NewPostPage
