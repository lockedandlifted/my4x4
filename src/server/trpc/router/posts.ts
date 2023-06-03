import { z } from 'zod'

import type { AttributeValue, Prisma } from '@prisma/client'

import { router, publicProcedure, protectedProcedure } from '../trpc'

const postsRouter = router({
  // createPost: protectedProcedure({

  // }),

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
            createdAt: 'asc',
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
