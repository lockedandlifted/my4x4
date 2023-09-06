import type { GetServerSideProps } from 'next'

import { appRouter } from '@server/trpc/router/_app'
import { createTRPCContext } from '@server/trpc/context'

const setupTrpcCaller = async (context: GetServerSideProps) => {
  const { req, res } = context

  const callerContext = await createTRPCContext({ req, res })
  const caller = appRouter.createCaller(callerContext)

  return caller
}

export default setupTrpcCaller
