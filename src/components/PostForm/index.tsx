import { Button, Flex } from '@chakra-ui/react'

import usePostForm from '@hooks/usePostForm'

import Form from '@components/Form'
import Tag from '@components/Category/Tag'

import Editor from '@components/Post/Editor'

import type { Prisma } from '@prisma/client'

import Attachments from './Attachments'

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
    callbacks: {
      createPost: createFn,
      updatePost: updateFn,
      selectCategoryKey,
    },
    categories,
    categoryKeys,
    editor,
    formPayload,
    mutations: {
      createPost: {
        isLoading,
      },
    },
    shouldUsePostEditor,
  } = postFormPayload

  return (
    <Form
      callbacks={{
        submitForm: post?.id ? updateFn : createFn,
      }}
      formPayload={formPayload}
    >
      <Form.Field
        label="Title"
        name="title"
        validationRules={{ required: true }}
      >
        <input type="text" />
      </Form.Field>

      <Form.BasicField
        label="* Tags"
        marginTop="4"
        name="tags"
      >
        <Flex flexWrap="wrap">
          {categories.map(category => (
            <Tag
              category={category}
              key={category.id}
              onClick={() => selectCategoryKey(category.key)}
              selected={categoryKeys.includes(category.key)}
            />
          ))}
        </Flex>
      </Form.BasicField>

      {!!post?.id && shouldUsePostEditor && editor && (
        <>
          <Form.BasicField
            label="* Body"
            marginTop="4"
            name="body"
          >
            <Flex borderWidth="1px" borderRadius="lg" flexDirection="column" padding="2" width="100%">
              <Editor editor={editor} initialValue={post?.bodyData}>
                <Editor.ToolBar />
                <Editor.Input />
              </Editor>
            </Flex>
          </Form.BasicField>

          <Form.BasicField
            label="Attachments"
            marginTop="4"
            name="attachments"
          >
            <Flex borderWidth="1px" borderRadius="lg" flexDirection="column" padding="2" width="100%">
              <Attachments editMode post={post} />
            </Flex>
          </Form.BasicField>
        </>
      )}

      {!!post?.id && !shouldUsePostEditor && (
        <Form.Field
          label="Body"
          name="body"
          marginTop="4"
          validationRules={{ required: true }}
        >
          <textarea style={{ height: 180 }} />
        </Form.Field>
      )}

      <Button
        colorScheme="green"
        isDisabled={isLoading}
        isLoading={isLoading}
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
