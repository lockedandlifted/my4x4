import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc'

const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(({ ctx }) => ctx.session),
  getSecretMessage: protectedProcedure.query(() => 'you can now see this secret message!'),
})

export default authRouter
