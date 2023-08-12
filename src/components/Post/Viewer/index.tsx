import { Flex, Text } from '@chakra-ui/react'

import usePostForm from '@hooks/usePostForm'

import Editor from '@components/Post/Editor'

import type { Prisma } from '@prisma/client'

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
    postLikes: true,
    postsManufacturers: {
      include: {
        manufacturer: true,
      },
    },
    postsManufacturerModels: {
      include: {
        manufacturerModel: true,
      },
    },
    postsManufacturerParts: {
      include: {
        manufacturerPart: true,
      },
    },
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

type ViewerProps = {
  post: PostWithIncludes,
}

const Viewer = (props: ViewerProps) => {
  const { post } = props

  const postFormPayload = usePostForm({ post })
  const { editor } = postFormPayload

  if (!post?.bodyData) {
    return (
      <Flex width="100%">
        <Text>
          {post?.body}
        </Text>
      </Flex>
    )
  }

  return (
    <Editor editor={editor} initialValue={post?.bodyData}>
      <Editor.Input readOnly />
    </Editor>
  )
}

export default Viewer
