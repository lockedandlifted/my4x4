import { z } from 'zod'

import inngestClient from '@utils/inngestClient'

import createActivityItem from '@utils/createActivityItem'

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
      categoryKeys: z.array(z.string()).optional(),
      title: z.string(),
      postTypeKey: z.string(),
      published: z.boolean().optional(),
      relatedEntities: z.array(
        z.object({
          projectId: z.string().optional(),
          manufacturerId: z.string().optional(),
          manufacturerModelId: z.string().optional(),
          manufacturerPartId: z.string().optional(),
          imageId: z.string().optional(),
        })
          .refine(atLeastOneDefined),
      ).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const data: Prisma.PostCreateInput = {
        body: input.body,
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
          const firstKey = Object.keys(relatedEntity)[0]
          const key = relatedEntityKeys[firstKey]

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
            [firstKey]: relatedEntity[firstKey],
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
      if (post.published) {
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
      imageId: z.string().optional(),
      manufacturerId: z.string().optional(),
      manufacturerModelId: z.string().optional(),
      manufacturerPartId: z.string().optional(),
      postTypeKey: z.string().optional(),
      projectId: z.string().optional(),
      projectSlug: z.string().optional(),
      userId: z.string().optional(),
    }))
    .query(({ ctx, input }) => {
      const filters: Prisma.Enumerable<Prisma.PostWhereInput> = []

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
              postsComments: true,
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
          createdAt: 'desc',
        },
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
    })),

  updatePostById: protectedProcedure
    .input(z.object({
      body: z.string(),
      bodyData: z.array(z.any()).optional(),
      categoryKeys: z.array(z.string()).optional(),
      id: z.string(),
      title: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const post = ctx.prisma.post.update({
        where: {
          id: input.id,
        },
        data: {
          body: input.body,
          bodyData: input.bodyData,
          title: input.title,
        },
        include: {
          postType: true,
          postsProjects: {
            include: {
              project: true,
            },
          },
        },
      })

      return post
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
})

export default postsRouter
