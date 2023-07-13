import { Flex, Heading } from '@chakra-ui/react'

import MobileLayout from '@layouts/MobileLayout'

import Editor from '@components/Post/Editor'

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

const NewPostPage = () => {
  console.log('New Page')

  return (
    <MobileLayout>
      <Flex direction="column" marginTop={8} width="100%">
        <Heading as="h1" fontWeight="medium" marginBottom="4" size="lg">
          New Post
        </Heading>

        <Editor initialValue={initialValue}>
          <Editor.ToolBar />
          <Editor.Input />
        </Editor>
      </Flex>
    </MobileLayout>
  )
}

export default NewPostPage
