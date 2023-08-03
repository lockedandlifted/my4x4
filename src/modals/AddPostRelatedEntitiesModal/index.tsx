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
  Prisma, Manufacturer, ManufacturerModel, ManufacturerPart,
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
  },
  post: PostWithIncludes,
  showModal: boolean,
}

const AddPostRelatedEntitiesModal = (props: AddPostRelatedEntitiesModalProps) => {
  const { callbacks: { closeModal, createEntity }, post, showModal } = props

  const formPayload = usePostForm(post)
  const {
    callbacks: {
      toggleRelatedEntity,
    },
    relatedEntities,
  } = formPayload

  const relatedEntitiesPayload = useAddPostRelatedEntities()
  const {
    callbacks: {
      setState,
    },
    relatedEntityType,
    manufacturerId,
  } = relatedEntitiesPayload
  // const saveFn = newRecord ? createFn : updateFn

  // const processCallbackPayload = {
  //   action: saveFn,
  //   afterAction: closeModal,
  // }

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
                  manufacturerTypeKey: relatedEntityType === 'manufacturerModelId' ? 'vehicle' : 'part',
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

                    toggleRelatedEntity({
                      key: 'manufacturerModelId',
                      title: result.title,
                      value: result.id,
                    })
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

                    toggleRelatedEntity({
                      key: 'manufacturerPartId',
                      title: result.title,
                      value: result.id,
                    })
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
        </DrawerBody>

        <DrawerFooter borderTopWidth={1}>
          <Button variant="outline" mr={3} onClick={closeModal}>
            Cancel
          </Button>

          <Button
            colorScheme="green"
            form="post-part-form"
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
