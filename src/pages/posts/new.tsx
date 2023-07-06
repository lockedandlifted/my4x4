import { useCallback, useState } from 'react'
import { Button, Flex } from '@chakra-ui/react'
import {
  createEditor, BaseEditor, Descendant, Editor, Element, Transforms,
} from 'slate'
import {
  Slate, Editable, withReact, ReactEditor, useSlateStatic,
} from 'slate-react'

import withEmbeds from '@utils/withEmbeds'

import ProjectEmbed from '@components/Post/Editor/ProjectEmbed'
import YouTubeVideo from '@components/Post/Editor/YouTubeVideo'

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

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
  {
    type: 'youtube',
    youtubeId: '72_QrqUNXW4',
    children: [{ text: '' }],
  },
  {
    type: 'my4x4-project',
    projectId: '10796cdc-3063-4244-bd17-d157c2561306',
    children: [{ text: '' }],
  },
]

const embedRegexes = [
  {
    regex: /https:\/\/www\.youtube\.com\/watch\?v=(\w+)/,
    type: 'youtube',
  },
]

const CustomEditor = {
  handleEmbed(editor, event) {
    const text = event.clipboardData.getData('text/plain')

    embedRegexes.some(({ regex, type }) => {
      const match = text.match(regex)
      if (match) {
        event.preventDefault()

        Transforms.insertNodes(editor, [
          {
            children: [{ text: '' }],
            type,
            youtubeId: match[1],
          },
          {
            children: [{ text: 'hello' }],
            type: 'paragraphs',
          },
        ])

        return true
      }

      return false
    })
  },

  handlePaste(editor, event) {
    CustomEditor.handleEmbed(editor, event)

    console.log('onPaste', event.clipboardData.getData('text/plain'))
  },

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
  <pre {...props.attributes} style={{ backgroundColor: 'grey', color: 'white' }}>
    <code>{props.children}</code>
  </pre>
)

const CustomImage = props => (
  <img {...props.attributes} src={props.element.url} alt="img" />
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
  const [editor] = useState(() => withEmbeds(withReact(createEditor())))

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      case 'image':
        return <CustomImage {...props} />
      case 'my4x4-project':
        return <ProjectEmbed {...props} />
      case 'youtube':
        return <YouTubeVideo {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  return (
    <Flex direction="column" padding="4">
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
            Italic
          </Button>

          <Button
            onMouseDown={(event) => {
              event.preventDefault()
              CustomEditor.toggleCodeBlock(editor)
            }}
            marginLeft="1"
          >
            Link
          </Button>

          <Button
            onMouseDown={(event) => {
              event.preventDefault()
              CustomEditor.toggleCodeBlock(editor)
            }}
            marginLeft="1"
          >
            Numbered List
          </Button>

          <Button
            onMouseDown={(event) => {
              event.preventDefault()
              CustomEditor.toggleCodeBlock(editor)
            }}
            marginLeft="1"
          >
            Bullets
          </Button>

          <Button
            onMouseDown={(event) => {
              event.preventDefault()
              CustomEditor.toggleCodeBlock(editor)
            }}
            marginLeft="1"
          >
            H1
          </Button>

          <Button
            onMouseDown={(event) => {
              event.preventDefault()
              CustomEditor.toggleCodeBlock(editor)
            }}
            marginLeft="1"
          >
            H2
          </Button>

          <Button
            onMouseDown={(event) => {
              event.preventDefault()
              CustomEditor.toggleCodeBlock(editor)
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
          onPaste={(event) => {
            CustomEditor.handlePaste(editor, event)
          }}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </Slate>
    </Flex>
  )
}

export default NewPostPage
