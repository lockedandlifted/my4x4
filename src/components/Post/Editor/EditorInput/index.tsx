import { useCallback } from 'react'
import { Editable } from 'slate-react'

import { trpc } from '@utils/trpc'
import CustomEditor from '@utils/customEditor'

import AttachmentEmbed from '@components/Post/Editor/Elements/AttachmentEmbed'
import DefaultElement from '@components/Post/Editor/Elements/DefaultElement'
import Heading from '@components/Post/Editor/Elements/Heading'
import ImageEmbed from '@components/Post/Editor/Elements/ImageEmbed'
import Link from '@components/Post/Editor/Elements/Link'
import List from '@components/Post/Editor/Elements/List'
import ListItem from '@components/Post/Editor/Elements/ListItem'
import ManufacturerEmbed from '@components/Post/Editor/Elements/ManufacturerEmbed'
import ManufacturerModelEmbed from '@components/Post/Editor/Elements/ManufacturerModelEmbed'
import ManufacturerPartEmbed from '@components/Post/Editor/Elements/ManufacturerPartEmbed'
import ProjectEmbed from '@components/Post/Editor/Elements/ProjectEmbed'
import YouTubeVideo from '@components/Post/Editor/Elements/YouTubeVideo'

import Leaf from '@components/Post/Editor/Leaves/Leaf'

import styles from './styles.module.css'

type EditorInputProps = {
  editor?: any,
  readOnly?: boolean,
}

const EditorInput = (props: EditorInputProps) => {
  const { editor, readOnly = false } = props

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'heading-one':
        return <Heading as="h1" size="xl" {...props} />
      case 'heading-two':
        return <Heading as="h2" size="lg" {...props} />
      case 'image':
        return <ImageEmbed {...props} />
      case 'link':
        return <Link {...props} />
      case 'list-item':
        return <ListItem {...props} />
      case 'my4x4_attachment':
        return <AttachmentEmbed {...props} />
      case 'my4x4_manufacturer':
        return <ManufacturerEmbed {...props} />
      case 'my4x4_manufacturer_model':
        return <ManufacturerModelEmbed {...props} />
      case 'my4x4_manufacturer_part':
        return <ManufacturerPartEmbed {...props} />
      case 'my4x4_project':
        return <ProjectEmbed {...props} />
      case 'ordered-list':
        return <List {...props} />
      case 'unordered-list':
        return <List {...props} />
      case 'youtube':
        return <YouTubeVideo {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  const { client: trpcClient } = trpc.useContext()

  return (
    <Editable
      className={styles.root}
      onChange={(value) => {
        console.log('onChange', value)
      }}
      onKeyDown={(event) => {
        if (!event.ctrlKey) {
          return
        }

        // Replace the `onKeyDown` logic with our new commands.
        switch (event.key) {
          case 'b': {
            event.preventDefault()
            CustomEditor.toggleMark(editor, 'bold')
            break
          }
          case 'i': {
            event.preventDefault()
            CustomEditor.toggleMark(editor, 'italic')
            break
          }
        }
      }}
      onPaste={async (event) => {
        CustomEditor.handlePaste(editor, event, trpcClient)
      }}
      readOnly={readOnly}
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      style={{ minHeight: readOnly ? undefined : 180 }}
    />
  )
}

export default EditorInput
