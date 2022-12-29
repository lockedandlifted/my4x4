import { router } from '../trpc'

import authRouter from './auth'
import awsRouter from './aws'
import categoriesRouter from './categories'
import manufacturerModelsRouter from './manufacturerModels'
import manufacturerPartsRouter from './manufacturerParts'
import manufacturersRouter from './manufacturers'
import projectPageViewsRouter from './projectPageViews'
import projectPartsExternalLinksRouter from './projectPartsExternalLinks'
import projectsImagesRouter from './projectsImages'
import projectsPartsRouter from './projectsParts'
import projectsRouter from './projects'
import usersRouter from './users'

export const appRouters = {
  auth: authRouter,
  aws: awsRouter,
  categories: categoriesRouter,
  manufacturerModels: manufacturerModelsRouter,
  manufacturerParts: manufacturerPartsRouter,
  manufacturers: manufacturersRouter,
  projectPageViews: projectPageViewsRouter,
  projectPartsExternalLinks: projectPartsExternalLinksRouter,
  projects: projectsRouter,
  projectsImages: projectsImagesRouter,
  projectsParts: projectsPartsRouter,
  users: usersRouter,
}

export const appRouter = router(appRouters)

// export type definition of API
export type AppRouter = typeof appRouter
