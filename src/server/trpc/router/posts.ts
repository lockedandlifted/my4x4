import { z } from 'zod'

import inngestClient from '@utils/inngestClient'

import createActivityItem from '@utils/createActivityItem'
import deleteActivityItem from '@utils/deleteActivityItem'

import type { Prisma } from '@prisma/client'

import { router, publicProcedure, protectedProcedure } from '../trpc'

const relatedEntityKeys = {
  projectId: 'postsProjects',
  manufacturerId: 'postsManufacturers',
  manufacturerModelId: 'postsManufacturerModels',
  manufacturerPartId: 'postsManufacturerParts',
  imageId: 'postsImages',
}

const atLeastOneDefined = (
  obj: Record<string | number | symbol, unknown>,
) => Object.values(obj).some(v => v !== undefined)

const postsRouter = router({
  createPost: protectedProcedure
    .input(z.object({
      body: z.string(),
      bodyData: z.array(z.any()).optional(),
      categoryKeys: z.array(z.string()).optional(),
      isRichText: z.boolean().optional(),
      title: z.string(),
      postTypeKey: z.string(),
      published: z.boolean().optional(),
      relatedEntities: z.array(z.object({
        key: z.string(),
        title: z.string().optional(),
        value: z.string(),
      })).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const data: Prisma.PostCreateInput = {
        body: input.body,
        bodyData: input.bodyData,
        isRichText: input.isRichText || false,
        postType: {
          connect: {
            key: input.postTypeKey,
          },
        },
        published: input.published,
        title: input.title,
        user: {
          connect: {
            id: ctx.session.user.id,
          },
        },
      }

      // Categories
      if (input.categoryKeys) {
        data.postsCategories = {
          create: input.categoryKeys.map(categoryKey => ({
            category: {
              connect: {
                key: categoryKey,
              },
            },
          })),
        }
      }

      // Related Entities
      let relatedEntityData = {}

      if (input.relatedEntities) {
        relatedEntityData = input.relatedEntities.reduce((acc, relatedEntity) => {
          const { key: relatedEntityKey, value } = relatedEntity

          const key = relatedEntityKeys[relatedEntityKey]

          // Setup Object if it doesnt exist
          if (!acc[key]) {
            // acc[postsProjects]
            acc[key] = {
              createMany: {
                data: [],
              },
            }
          }

          // acc[postsProjects].createMany.data.push({ projectId: 'a' })
          acc[key].createMany.data.push({
            [relatedEntityKey]: value,
          })

          return acc
        }, {})
      }

      const mergedData = {
        ...data,
        ...relatedEntityData,
      }

      const post = await ctx.prisma.post.create({
        data: mergedData,
        include: {
          postType: true,
          postsProjects: {
            include: {
              project: true,
            },
          },
        },
      })

      // Create Activity - if Published
      if (post?.published) {
        await createActivityItem({
          eventType: 'posts.created',
          ownerId: ctx.session?.user?.id || '',
          ownerType: 'User',
          subjectId: post.id,
          subjectType: 'Post',
        })
      }

      // Queue Notification Email - Questions
      if (post.postType.key === 'question' && post.postsProjects[0]?.project) {
        await inngestClient.send({
          name: 'mailers/new-project-question-email',
          data: {
            projectId: post.postsProjects[0]?.projectId,
            postId: post.id,
          },
        })
      }

      return post
    }),

  getPosts: publicProcedure
    .input(z.object({
      categoryId: z.string().optional(),
      categoryKey: z.string().optional(),
      imageId: z.string().optional(),
      limit: z.number().optional(),
      manufacturerId: z.string().optional(),
      manufacturerModelId: z.string().optional(),
      manufacturerPartId: z.string().optional(),
      postTypeKey: z.string().optional(),
      projectId: z.string().optional(),
      projectSlug: z.string().optional(),
      published: z.boolean().optional(),
      userId: z.string().optional(),
    }))
    .query(({ ctx, input }) => {
      const filters: Prisma.Enumerable<Prisma.PostWhereInput> = []

      // Category
      if (input.categoryId) {
        filters.push({
          postsCategories: {
            some: {
              categoryId: input.categoryId,
            },
          },
        })
      }

      if (input.categoryKey) {
        filters.push({
          postsCategories: {
            some: {
              category: {
                key: input.categoryKey,
              },
            },
          },
        })
      }

      // Image ID
      if (input.imageId) {
        filters.push({
          postsImages: {
            some: {
              imageId: input.imageId,
            },
          },
        })
      }

      // Manufacturer ID
      if (input.manufacturerId) {
        filters.push({
          postsManufacturers: {
            some: {
              manufacturerId: input.manufacturerId,
            },
          },
        })
      }

      // Manufacturer Model ID
      if (input.manufacturerModelId) {
        filters.push({
          postsManufacturerModels: {
            some: {
              manufacturerModelId: input.manufacturerModelId,
            },
          },
        })
      }

      // Manufacturer Part ID
      if (input.manufacturerPartId) {
        filters.push({
          postsManufacturerParts: {
            some: {
              manufacturerPartId: input.manufacturerPartId,
            },
          },
        })
      }

      // Post Type Key
      if (input.postTypeKey) {
        filters.push({
          postType: {
            key: input.postTypeKey,
          },
        })
      }

      // Project ID
      if (input.projectId) {
        filters.push({
          postsProjects: {
            some: {
              projectId: input.projectId,
            },
          },
        })
      }

      // Project Slug
      if (input.projectSlug) {
        filters.push({
          postsProjects: {
            some: {
              project: {
                slug: input.projectSlug,
              },
            },
          },
        })
      }

      // Published
      if (input.published !== undefined) {
        filters.push({
          published: input.published,
        })
      }

      // User ID
      if (input.userId) {
        filters.push({
          userId: input.userId,
        })
      }

      return ctx.prisma.post.findMany({
        where: {
          AND: filters,
        },
        include: {
          _count: {
            select: {
              postLikes: true,
              postsComments: true,
            },
          },
          postsCategories: {
            include: {
              category: true,
            },
          },
          postsComments: {
            include: {
              comment: true,
            },
            orderBy: {
              createdAt: 'asc',
            },
            take: 1,
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
        orderBy: {
          updatedAt: 'desc',
        },
        take: input.limit || 100,
      })
    }),

  getPostById: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.post.findUnique({
      where: {
        id: input.id,
      },
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
                title: true,
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
            project: {
              include: {
                manufacturerModel: {
                  include: {
                    manufacturer: true,
                  },
                },
                manufacturerModelSeries: true,
                projectsImages: {
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
    })),

  getSimilarPosts: publicProcedure
    .input(z.object({
      limit: z.number().optional(),
      postId: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      const post = (await ctx.prisma.post.findFirst({
        where: { id: input.postId },
        include: {
          postsCategories: {
            include: {
              category: true,
            },
          },
        },
      }))

      const categories = post?.postsCategories.map(postsCategory => ({
        categoryId: postsCategory?.category?.id,
      }))

      return ctx.prisma.post.findMany({
        where: {
          postsCategories: {
            some: {
              OR: categories,
            },
          },
          published: true,
          NOT: {
            id: post?.id,
          },
        },
        include: {
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
        orderBy: {
          updatedAt: 'desc',
        },
        take: input.limit || 3,
      })
    }),

  updatePostById: protectedProcedure
    .input(z.object({
      body: z.string(),
      bodyData: z.array(z.any()).optional(),
      categoryKeys: z.array(z.string()).optional(),
      id: z.string(),
      relatedEntities: z.array(z.object({
        key: z.string(),
        title: z.string().optional(),
        value: z.string(),
      })).optional(),
      title: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const data: Prisma.PostUpdateInput = {
        body: input.body || undefined,
        title: input.title || undefined,
        updatedAt: new Date(),
      }

      // Body Data
      if (input.bodyData && input.bodyData.length) {
        data.bodyData = input.bodyData
      }

      // Categories
      if (input.categoryKeys) {
        data.postsCategories = {
          create: input.categoryKeys.map(categoryKey => ({
            category: {
              connect: {
                key: categoryKey,
              },
            },
          })),
        }
      }

      // Related Entities
      let relatedEntityData = {}

      if (input.relatedEntities) {
        relatedEntityData = input.relatedEntities.reduce((acc, relatedEntity) => {
          const { key: relatedEntityKey, value } = relatedEntity

          const key = relatedEntityKeys[relatedEntityKey]

          // Setup Object if it doesnt exist
          if (!acc[key]) {
            // acc[postsProjects]
            acc[key] = {
              createMany: {
                data: [],
              },
            }
          }

          // acc[postsProjects].createMany.data.push({ projectId: 'a' })
          acc[key].createMany.data.push({
            [relatedEntityKey]: value,
          })

          return acc
        }, {})
      }

      // Merge Data
      const mergedData = {
        ...data,
        ...relatedEntityData,
      }

      const result = ctx.prisma.$transaction([
        // Delete existing postsCategory
        ctx.prisma.postsCategory.deleteMany({
          where: {
            postId: input.categoryKeys ? input.id : 'undefined',
          },
        }),
        // Delete existing postsProjects
        ctx.prisma.postsProject.deleteMany({
          where: {
            postId: input.relatedEntities ? input.id : 'undefined',
          },
        }),
        // Delete existing postsManufacturers
        ctx.prisma.postsManufacturer.deleteMany({
          where: {
            postId: input.relatedEntities ? input.id : 'undefined',
          },
        }),
        // Delete existing postsManufacturerModels
        ctx.prisma.postsManufacturerModel.deleteMany({
          where: {
            postId: input.relatedEntities ? input.id : 'undefined',
          },
        }),
        // Delete existing postsManufacturerParts
        ctx.prisma.postsManufacturerPart.deleteMany({
          where: {
            postId: input.relatedEntities ? input.id : 'undefined',
          },
        }),
        // Update Post
        ctx.prisma.post.update({
          where: {
            id: input.id,
          },
          data: mergedData,
          include: {
            postType: true,
            postsProjects: {
              include: {
                project: true,
              },
            },
          },
        }),
      ])

      return result
    }),

  publishPostById: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.update({
        where: {
          id: input.id,
        },
        data: {
          published: true,
        },
      })

      // Create Activity
      await createActivityItem({
        eventType: 'posts.published',
        ownerId: ctx.session?.user?.id || '',
        ownerType: 'User',
        subjectId: post.id,
        subjectType: 'Post',
      })

      return post
    }),

  unpublishPostById: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.update({
        where: {
          id: input.id,
        },
        data: {
          published: false,
        },
      })

      // Delete Activity
      await deleteActivityItem({
        subjects: [
          {
            eventType: 'posts.published',
            subjectId: post.id,
            subjectType: 'Post',
          },
        ],
      })

      return post
    }),
})

export default postsRouter
