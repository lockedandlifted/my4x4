import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
} from '@chakra-ui/react'
import { FiTrash2 } from 'react-icons/fi'

import type {
  Prisma, Manufacturer, ManufacturerModel, ManufacturerPart, Project,
} from '@prisma/client'

import usePostForm from '@hooks/usePostForm'

import AutocompleteField from '@components/AutocompleteField'
import Form from '@components/Form'

import useAddPostRelatedEntities from './hooks/useAddPostRelatedEntities'

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

type AddPostRelatedEntitiesModalProps = {
  callbacks: {
    closeModal: VoidFunction,
    updatePost: (data: object) => void,
  },
  post: PostWithIncludes,
  showModal: boolean,
}

const AddPostRelatedEntitiesModal = (props: AddPostRelatedEntitiesModalProps) => {
  const { callbacks: { closeModal, updatePost }, post, showModal } = props

  const postFormPayload = usePostForm({ post, shouldRedirect: false })
  const {
    callbacks: {
      toggleRelatedEntity,
      updatePost: updateFn,
    },
    formPayload,
    mutations: {
      updatePost: {
        isLoading: isUpdating,
      },
    },
    relatedEntities,
  } = postFormPayload

  const relatedEntitiesPayload = useAddPostRelatedEntities()
  const {
    callbacks: {
      setState,
    },
    relatedEntityType,
    manufacturerId,
  } = relatedEntitiesPayload

  const processCallbackPayload = {
    action: updateFn,
    afterAction: closeModal,
  }

  return (
    <Drawer
      isOpen={showModal}
      placement="right"
      size="xl"
      onClose={closeModal}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Add Post Reference</DrawerHeader>

        <DrawerBody>
          <Form
            callbacks={{
              submitForm: (data) => {
                updatePost({
                  ...processCallbackPayload,
                  actionPayload: data,
                })
              },
            }}
            formPayload={formPayload}
            id="post-related-entities-form"
          >
            <Form.BasicField
              label="Type"
              name="relatedEntityType"
            >
              <select
                onChange={e => setState({
                  relatedEntityType: e.target.value,
                  manufacturerId: undefined,
                  manufacturerModelId: undefined,
                })}
                value={relatedEntityType}
              >
                <option value="">Please Select...</option>
                <option value="manufacturerId">Manufacturer</option>
                <option value="manufacturerModelId">Model</option>
                <option value="manufacturerPartId">Part</option>
                <option value="projectId">Project</option>
              </select>
            </Form.BasicField>

            {['manufacturerId', 'manufacturerModelId', 'manufacturerPartId'].includes(relatedEntityType) && (
              <Form.BasicField
                label="Manufacturer"
                marginTop={4}
                name="manufacturerId"
              >
                <AutocompleteField
                  callbacks={{
                    selectItem: (result: Manufacturer) => {
                      setState({
                        manufacturerId: result.id,
                      })

                      if (relatedEntityType === 'manufacturerId') {
                        setState({
                          relatedEntityType: '',
                        })

                        toggleRelatedEntity({
                          key: 'manufacturerId',
                          title: result.title,
                          value: result.id,
                        })
                      }
                    },
                  }}
                  retainSelection
                  routerKey="manufacturers"
                  queryKey="getManufacturers"
                  queryParams={{
                    manufacturerTypeKey: relatedEntityType === 'manufacturerPartId' ? 'part' : 'vehicle',
                    limit: 10,
                  }}
                />
              </Form.BasicField>
            )}

            {['manufacturerModelId'].includes(relatedEntityType) && manufacturerId && (
              <Form.BasicField
                label="Model"
                marginTop={4}
                name="manufacturerModelId"
              >
                <AutocompleteField
                  callbacks={{
                    selectItem: (result: ManufacturerModel) => {
                      setState({
                        manufacturerModelId: result.id,
                      })

                      if (relatedEntityType === 'manufacturerModelId') {
                        setState({
                          relatedEntityType: '',
                        })

                        toggleRelatedEntity({
                          key: 'manufacturerModelId',
                          title: result.title,
                          value: result.id,
                        })
                      }
                    },
                  }}
                  retainSelection
                  routerKey="manufacturerModels"
                  queryKey="getManufacturerModels"
                  queryParams={{
                    limit: 10,
                    manufacturerId,
                  }}
                />
              </Form.BasicField>
            )}

            {['manufacturerPartId'].includes(relatedEntityType) && manufacturerId && (
              <Form.BasicField
                label="Part"
                marginTop={4}
                name="manufacturerPartId"
              >
                <AutocompleteField
                  callbacks={{
                    selectItem: (result: ManufacturerPart) => {
                      setState({
                        manufacturerPartId: result.id,
                      })

                      if (relatedEntityType === 'manufacturerPartId') {
                        setState({
                          relatedEntityType: '',
                        })

                        toggleRelatedEntity({
                          key: 'manufacturerPartId',
                          title: result.title,
                          value: result.id,
                        })
                      }
                    },
                  }}
                  retainSelection
                  routerKey="manufacturerParts"
                  queryKey="getManufacturerParts"
                  queryParams={{
                    limit: 10,
                    manufacturerId,
                  }}
                />
              </Form.BasicField>
            )}

            {['projectId'].includes(relatedEntityType) && (
              <Form.BasicField
                label="Project"
                marginTop={4}
                name="projectId"
              >
                <AutocompleteField
                  callbacks={{
                    selectItem: (result: Project) => {
                      setState({
                        projectId: result.id,
                      })

                      if (relatedEntityType === 'projectId') {
                        setState({
                          relatedEntityType: '',
                        })

                        toggleRelatedEntity({
                          key: 'projectId',
                          title: result.title,
                          value: result.id,
                        })
                      }
                    },
                  }}
                  retainSelection
                  routerKey="projects"
                  queryKey="getProjects"
                  queryParams={{
                    limit: 10,
                  }}
                />
              </Form.BasicField>
            )}

            {relatedEntities && !!relatedEntities.length && (
              <Form.BasicField
                label="References"
                marginTop={4}
              >
                <Flex direction="column" width="100%">
                  {relatedEntities && relatedEntities.map((relatedEntity) => {
                    const { key, value, title } = relatedEntity

                    return (
                      <Flex
                        alignItems="center"
                        borderWidth="1px"
                        borderRadius="md"
                        paddingX="2"
                        paddingY="2"
                        marginBottom="2"
                        width="100%"
                        key={`${key}_${value}`}
                      >
                        <Flex direction="column">
                          <Text fontSize="sm">
                            {title}
                          </Text>
                        </Flex>

                        <Text
                          cursor="pointer"
                          onClick={() => toggleRelatedEntity(relatedEntity)}
                          marginLeft="auto"
                        >
                          <FiTrash2 />
                        </Text>
                      </Flex>
                    )
                  })}
                </Flex>
              </Form.BasicField>
            )}
          </Form>
        </DrawerBody>

        <DrawerFooter borderTopWidth={1}>
          <Button variant="outline" mr={3} onClick={closeModal}>
            Cancel
          </Button>

          <Button
            colorScheme="green"
            isDisabled={isUpdating}
            isLoading={isUpdating}
            form="post-related-entities-form"
            type="submit"
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default AddPostRelatedEntitiesModal
