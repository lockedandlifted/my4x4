import { Button, Flex, Heading } from '@chakra-ui/react'

import usePostForm from '@hooks/usePostForm'

import Form from '@components/Form'
import Tag from '@components/Category/Tag'

import Editor from '@components/Post/Editor'

import type { Prisma } from '@prisma/client'

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

type PostWithIncludes = Prisma.PostGetPayload<{
  include: {},
}>

type PostFormProps = {
  post?: PostWithIncludes,
}

const PostForm = (props: PostFormProps) => {
  const { post } = props

  const postFormPayload = usePostForm({ post })
  const {
    callbacks,
    callbacks: {
      selectCategoryKey,
    },
    categories,
    categoryKeys,
    formPayload,
  } = postFormPayload

  return (
    <Form callbacks={callbacks} formPayload={formPayload}>
      <Form.Field
        label="Title"
        name="title"
        validationRules={{ required: true }}
      >
        <input type="text" />
      </Form.Field>

      <Form.BasicField
        label="Tags"
        marginTop="4"
        name="tags"
      >
        {categories.map(category => (
          <Tag
            category={category}
            key={category.id}
            onClick={() => selectCategoryKey(category.key)}
            selected={categoryKeys.includes(category.key)}
          />
        ))}
      </Form.BasicField>

      {!!post?.id && (
        <Form.BasicField
          label="Body"
          marginTop="4"
          name="body"
        >
          <Flex borderWidth="1px" borderRadius="lg" flexDirection="column" padding="2" width="100%">
            <Editor initialValue={initialValue}>
              <Editor.ToolBar />
              <Editor.Input />
            </Editor>
          </Flex>
        </Form.BasicField>
      )}

      <Button
        colorScheme="green"
        // isDisabled={isLoading}
        // isLoading={isLoading}
        marginTop="4"
        size="lg"
        type="submit"
      >
        {post?.id ? 'Save Post' : 'Create Post'}
      </Button>
    </Form>
  )
}

export default PostForm
