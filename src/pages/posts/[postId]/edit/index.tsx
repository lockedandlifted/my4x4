import { Flex, Heading } from '@chakra-ui/react'

import MobileLayout from '@layouts/MobileLayout'

import Editor from '@components/Post/Editor'

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

const EditPostPage = () => {
  console.log('New Page')

  return (
    <MobileLayout>
      <Flex direction="column" marginTop={8} width="100%">
        <Heading as="h1" fontWeight="medium" marginBottom="4" size="lg">
          Edit Post
        </Heading>

        <Flex borderWidth="1px" borderRadius="lg" flexDirection="column" padding="2">
          <Editor initialValue={initialValue}>
            <Editor.ToolBar />
            <Editor.Input />
          </Editor>
        </Flex>
        {/* </Form> */}
      </Flex>
    </MobileLayout>
  )
}

export default EditPostPage
