import { useCallback, useState } from 'react'
import { Button, Flex, Heading } from '@chakra-ui/react'
import {
  createEditor, BaseEditor, Editor, Element, Transforms,
} from 'slate'
import {
  Slate, Editable, withReact, ReactEditor,
} from 'slate-react'

import withEmbeds from '@utils/withEmbeds'
import { trpc } from '@utils/trpc'

import MobileLayout from '@layouts/MobileLayout'

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
]

const embedRegexes = [
  {
    regex: /https?:\/\/(www\.my4x4\.info|localhost:3001)\/([-a-z-A-Z0-9]+)$/,
    type: 'my4x4_project',
  },
  {
    regex: /https:\/\/www\.youtube\.com\/watch\?v=(\w+)/,
    type: 'youtube',
  },
]

const asyncSome = async (arr, predicate) => {
  for (const e of arr) {
    if (await predicate(e)) return true
  }
  return false
}

const CustomEditor = {
  handleEmbed: async (editor, event, client) => {
    const text = event.clipboardData.getData('text/plain')

    const matchedItem = await asyncSome(embedRegexes, async ({ regex, type }) => {
      const match = text.match(regex)

      if (match) {
        event.preventDefault()

        // Find Project by slug
        if (type === 'my4x4_project') {
          const projectSlug = match[2]
          const project = await client.projects.getProjectBySlug.query({ slug: projectSlug })

          if (project) {
            Transforms.insertNodes(editor, [
              {
                children: [{ text: '' }],
                type,
                projectId: project.id,
              },
              {
                children: [{ text: '' }],
                type: 'paragraph',
              },
            ])

            Transforms.move(editor)

            return true
          }
        }

        if (type === 'youtube') {
          Transforms.insertNodes(editor, [
            {
              children: [{ text: '' }],
              type,
              youtubeId: match[1],
            },
            {
              children: [{ text: '' }],
              type: 'paragraph',
            },
          ])

          return true
        }

        return false
      }

      return false
    })

    // No Regex Match or Item wasn't found in DB
    if (!matchedItem) {
      Transforms.insertNodes(editor, [
        {
          children: [{ text }],
          type: 'paragraph',
        },
      ])
    }
  },

  handlePaste: async (editor, event, client) => {
    CustomEditor.handleEmbed(editor, event, client)

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
      case 'my4x4_project':
        return <ProjectEmbed {...props} />
      case 'youtube':
        return <YouTubeVideo {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  const { client } = trpc.useContext()

  return (
    <MobileLayout>
      <Flex direction="column" marginTop={8} width="100%">
        <Heading as="h1" fontWeight="medium" marginBottom="4" size="lg">
          New Post
        </Heading>

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
          <Flex borderBottomWidth="1px" paddingBottom="2" marginBottom="2">
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
            disableDefaultStyles
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
            onPaste={async (event) => {
              CustomEditor.handlePaste(editor, event, client)
            }}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
          />
        </Slate>
      </Flex>
    </MobileLayout>
  )
}

export default NewPostPage
