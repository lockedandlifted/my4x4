import { Editor, Element as SlateElement, Transforms } from 'slate'

import asyncSome from '@utils/asyncSome'

const LIST_TYPES = ['ordered-list', 'unordered-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

const urlRegex = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g

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

const CustomEditor = {
  handleEmbed: async (editor, event, client) => {
    event.preventDefault()

    const text = event.clipboardData.getData('text/plain')

    const matchedItem = await asyncSome(embedRegexes, async ({ regex, type }) => {
      const match = text.match(regex)

      if (match) {
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

    // Matched Embed Regex - Don't continue
    if (matchedItem) return

    // Url Match
    if (text.match(urlRegex)) {
      Transforms.insertNodes(editor, [
        {
          children: [{ text }],
          href: text,
          type: 'link',
        },
      ])

      return
    }

    // No Regex Match or Item wasn't found in DB
    Transforms.insertNodes(editor, [
      {
        children: [{ text }],
        type: 'paragraph',
      },
    ])
  },

  handlePaste: async (editor, event, client) => {
    CustomEditor.handleEmbed(editor, event, client)

    console.log('onPaste', event.clipboardData.getData('text/plain'))
  },

  isBlockActive(editor, format, blockType = 'type') {
    const { selection } = editor
    if (!selection) return false

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: n => !Editor.isEditor(n)
          && SlateElement.isElement(n)
          && n[blockType] === format,
      }),
    )

    return !!match
  },

  isMarkActive(editor, type: string) {
    const marks = Editor.marks(editor)
    return marks ? marks[type] === true : false
  },

  toggleBlock(editor, format) {
    const isActive = CustomEditor.isBlockActive(
      editor,
      format,
      TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
    )
    const isList = LIST_TYPES.includes(format)
    console.log({ format, isList, isActive })

    Transforms.unwrapNodes(editor, {
      match: n => !Editor.isEditor(n)
        && SlateElement.isElement(n)
        && LIST_TYPES.includes(n.type)
        && !TEXT_ALIGN_TYPES.includes(format),
      split: true,
    })
    let newProperties: Partial<SlateElement>
    if (TEXT_ALIGN_TYPES.includes(format)) {
      newProperties = {
        align: isActive ? undefined : format,
      }
    } else {
      newProperties = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
      }
    }

    Transforms.setNodes<SlateElement>(editor, newProperties)

    if (!isActive && isList) {
      const block = { type: format, children: [] }
      Transforms.wrapNodes(editor, block)
    }
  },

  toggleMark(editor, type: string) {
    const isActive = CustomEditor.isMarkActive(editor, type)
    if (isActive) {
      Editor.removeMark(editor, type)
    } else {
      Editor.addMark(editor, type, true)
    }
  },
}

export default CustomEditor
