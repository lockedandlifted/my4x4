import { router } from '../trpc'

import authRouter from './auth'
import awsRouter from './aws'
import categoriesRouter from './categories'
import externalLinkViewsRouter from './externalLinkViews'
import externalLinksRouter from './externalLinks'
import imagesRouter from './images'
import manufacturerModelsRouter from './manufacturerModels'
import manufacturerPartsRouter from './manufacturerParts'
import manufacturersRouter from './manufacturers'
import projectPageViewsRouter from './projectPageViews'
import projectPartsExternalLinksRouter from './projectPartsExternalLinks'
import projectPartsImageTagsRouter from './projectPartsImageTags'
import projectsExternalLinksRouter from './projectsExternalLinks'
import projectsImagesRouter from './projectsImages'
import projectsPartsRouter from './projectsParts'
import projectsRouter from './projects'
import usersExternalLinksRouter from './usersExternalLinks'
import usersImagesRouter from './usersImages'
import usersRouter from './users'

export const appRouters = {
  auth: authRouter,
  aws: awsRouter,
  categories: categoriesRouter,
  externalLinkViews: externalLinkViewsRouter,
  externalLinks: externalLinksRouter,
  images: imagesRouter,
  manufacturerModels: manufacturerModelsRouter,
  manufacturerParts: manufacturerPartsRouter,
  manufacturers: manufacturersRouter,
  projectPageViews: projectPageViewsRouter,
  projectPartsExternalLinks: projectPartsExternalLinksRouter,
  projectPartsImageTags: projectPartsImageTagsRouter,
  projects: projectsRouter,
  projectsExternalLinks: projectsExternalLinksRouter,
  projectsImages: projectsImagesRouter,
  projectsParts: projectsPartsRouter,
  users: usersRouter,
  usersExternalLinks: usersExternalLinksRouter,
  usersImages: usersImagesRouter,
}

export const appRouter = router(appRouters)

// export type definition of API
export type AppRouter = typeof appRouter
