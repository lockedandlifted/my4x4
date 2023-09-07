import { Button, Flex } from '@chakra-ui/react'

import usePostForm from '@hooks/usePostForm'

import Form from '@components/Form'
import Tag from '@components/Category/Tag'

import Editor from '@components/Post/Editor'
import TogglePublishPost from '@components/Post/TogglePublishPost'

import type { Prisma } from '@prisma/client'

import Attachments from './Attachments'
import CoverImage from './CoverImage'
import RelatedEntities from './RelatedEntities'

type PostWithIncludes = Prisma.PostGetPayload<{
  include: {
    _count: {
      select: {
        postsComments: true,
        postLikes: true,
      },
    },
    postsCategories: {
      include: {
        category: {
          select: {
            key: true,
          },
        },
      },
    },
    postsComments: {
      include: {
        comment: {
          include: {
            _count: {
              select: {
                commentLikes: true,
              },
            },
            subComments: {
              include: {
                _count: {
                  select: {
                    commentLikes: true,
                  },
                },
                user: {
                  include: {
                    usersImages: {
                      include: {
                        image: true,
                      },
                      orderBy: {
                        sort: 'asc',
                      },
                      take: 1,
                    },
                  },
                },
              },
            },
            user: {
              include: {
                usersImages: {
                  include: {
                    image: true,
                  },
                  orderBy: {
                    sort: 'asc',
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    },
    postsImages: {
      include: {
        image: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 1,
    },
    postLikes: true,
    postsProjects: {
      include: {
        project: true,
      },
    },
    postType: true,
    user: {
      include: {
        usersImages: {
          include: {
            image: true,
          },
          orderBy: {
            sort: 'asc',
          },
          take: 1,
        },
      },
    },
  },
}>

type PostFormProps = {
  callbacks?: {
    AddPostRelatedEntitiesModal: {
      closeModal: VoidFunction,
    },
  },
  categoryKey?: string,
  post?: PostWithIncludes,
}

const PostForm = (props: PostFormProps) => {
  const { callbacks, categoryKey, post } = props

  const postFormPayload = usePostForm({ categoryKey, post })
  const {
    callbacks: {
      createPost: createFn,
      insertRelatedEntity,
      publishPost: publishFn,
      unpublishPost: unpublishFn,
      updatePost: updateFn,
      selectCategoryKey,
    },
    categories,
    categoryKeys,
    editor,
    formPayload,
    mutations: {
      createPost: {
        isLoading: isCreating,
      },
      updatePost: {
        isLoading: isUpdating,
      },
    },
    relatedEntities,
    shouldUsePostEditor,
  } = postFormPayload

  return (
    <Form
      callbacks={{
        submitForm: post?.id ? updateFn : createFn,
      }}
      formPayload={formPayload}
    >
      {!!post?.id && (
        <TogglePublishPost
          callbacks={{
            togglePublishPost: post?.published ? unpublishFn : publishFn,
          }}
          post={post}
        />
      )}

      {!!post?.id && (
        <Form.BasicField
          label="Cover Image"
          marginBottom="4"
          name="coverImage"
        >
          <Flex borderWidth="1px" borderRadius="lg" flexDirection="column" padding="2" width="100%">
            <CoverImage editMode post={post} />
          </Flex>
        </Form.BasicField>
      )}

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
              <Attachments editor={editor} editMode post={post} />
            </Flex>
          </Form.BasicField>

          <Form.BasicField
            label="References"
            marginTop="4"
            name="references"
          >
            <Flex borderWidth="1px" borderRadius="lg" flexDirection="column" padding="2" width="100%">
              <RelatedEntities
                callbacks={{
                  ...callbacks,
                  insertRelatedEntity,
                }}
                editMode
                relatedEntities={relatedEntities}
              />
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
        isDisabled={isCreating || isUpdating}
        isLoading={isCreating || isUpdating}
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
