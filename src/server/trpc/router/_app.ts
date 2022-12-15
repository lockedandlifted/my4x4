import { router } from '../trpc'

import { authRouter } from './auth'
import { manufacturerModelsRouter } from './manufacturerModels'
import { manufacturerPartsRouter } from './manufacturerParts'
import { manufacturersRouter } from './manufacturers'
import { projectsRouter } from './projects'
import { usersRouter } from './users'

export const appRouters = {
  auth: authRouter,
  manufacturerModels: manufacturerModelsRouter,
  manufacturerParts: manufacturerPartsRouter,
  manufacturers: manufacturersRouter,
  projects: projectsRouter,
  users: usersRouter,
}

export const appRouter = router(appRouters)

// export type definition of API
export type AppRouter = typeof appRouter
