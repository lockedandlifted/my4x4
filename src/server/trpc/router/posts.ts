import { z } from 'zod'

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
      title: z.string(),
      postTypeKey: z.string(),
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
    .mutation(({ ctx, input }) => {
      const data: Prisma.PostCreateInput = {
        body: input.body,
        postType: {
          connect: {
            key: input.postTypeKey,
          },
        },
        postsProjects: {
          createMany: {
            data: [
              { projectId: 'a' },
            ],
          },
        },
        title: input.title,
        user: {
          connect: {
            id: ctx.session.user.id,
          },
        },
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

      return ctx.prisma.post.create({
        data: mergedData,
      })
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

  getPost: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.post.findUnique({
      where: {
        id: input.id,
      },
      include: {
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
})

export default postsRouter
