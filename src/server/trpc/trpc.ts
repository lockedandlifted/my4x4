import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'

import { type Context } from './context'

// Initialize TRPC
const trpc = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape
  },
})

// this is a middleware that checks if the user is authenticated
// middleware: https://trpc.io/docs/middlewares
// TLDR: middleware is a function that runs before the procedure
// and can modify the context.

// What is a context? https://trpc.io/docs/context
// but TLDR: context is an object that is passed to every procedure
// and can be modified by middleware
const isAuthenticatedMiddleware = trpc.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  })
})

/**
 * Protected procedure
 * */
export const createTRPCRouter = trpc.router
export const publicProcedure = trpc.procedure
export const protectedProcedure = trpc.procedure.use(isAuthenticatedMiddleware)
