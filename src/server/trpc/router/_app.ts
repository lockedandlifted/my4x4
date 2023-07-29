import { router } from '../trpc'

import activityItemsRouter from './activityItems'
import attachmentsRouter from './attachments'
import attributesRouter from './attributes'
import authRouter from './auth'
import awsRouter from './aws'
import businessLocationsRouter from './businessLocations'
import businessesImagesRouter from './businessesImages'
import businessesRouter from './businesses'
import categoriesRouter from './categories'
import commentLikesRouter from './commentLikes'
import commentsRouter from './comments'
import countriesRouter from './countries'
import externalLinkViewsRouter from './externalLinkViews'
import externalLinksRouter from './externalLinks'
import imagesRouter from './images'
import manufacturerModelSeriesRouter from './manufacturerModelSeries'
import manufacturerModelsRouter from './manufacturerModels'
import manufacturerPartsRouter from './manufacturerParts'
import manufacturersRouter from './manufacturers'
import postLikesRouter from './postLikes'
import postsAttachmentsRouter from './postsAttachments'
import postsCommentsRouter from './postsComments'
import postsRouter from './posts'
import projectLikesRouter from './projectLikes'
import projectPageViewsRouter from './projectPageViews'
import projectPartsExternalLinksRouter from './projectPartsExternalLinks'
import projectPartsImageTagsRouter from './projectPartsImageTags'
import projectsExternalLinksRouter from './projectsExternalLinks'
import projectsImagesRouter from './projectsImages'
import projectsPartsRouter from './projectsParts'
import projectsRouter from './projects'
import servicesRouter from './services'
import usersExternalLinksRouter from './usersExternalLinks'
import usersImagesRouter from './usersImages'
import usersRouter from './users'

export const appRouters = {
  activityItems: activityItemsRouter,
  attachments: attachmentsRouter,
  attributes: attributesRouter,
  auth: authRouter,
  aws: awsRouter,
  businessLocations: businessLocationsRouter,
  businesses: businessesRouter,
  businessesImages: businessesImagesRouter,
  categories: categoriesRouter,
  commentLikes: commentLikesRouter,
  comments: commentsRouter,
  countries: countriesRouter,
  externalLinkViews: externalLinkViewsRouter,
  externalLinks: externalLinksRouter,
  images: imagesRouter,
  manufacturerModelSeries: manufacturerModelSeriesRouter,
  manufacturerModels: manufacturerModelsRouter,
  manufacturerParts: manufacturerPartsRouter,
  manufacturers: manufacturersRouter,
  postLikes: postLikesRouter,
  posts: postsRouter,
  postsAttachments: postsAttachmentsRouter,
  postsComments: postsCommentsRouter,
  projectLikes: projectLikesRouter,
  projectPageViews: projectPageViewsRouter,
  projectPartsExternalLinks: projectPartsExternalLinksRouter,
  projectPartsImageTags: projectPartsImageTagsRouter,
  projects: projectsRouter,
  projectsExternalLinks: projectsExternalLinksRouter,
  projectsImages: projectsImagesRouter,
  projectsParts: projectsPartsRouter,
  services: servicesRouter,
  users: usersRouter,
  usersExternalLinks: usersExternalLinksRouter,
  usersImages: usersImagesRouter,
}

export const appRouter = router(appRouters)

// export type definition of API
export type AppRouter = typeof appRouter
