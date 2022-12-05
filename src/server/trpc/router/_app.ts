import { router } from "../trpc"
import { authRouter } from "./auth"
import { manufacturersRouter } from "./manufacturers"
import { projectsRouter } from "./projects"
import { usersRouter } from "./users"

export const appRouter = router({
  auth: authRouter,
  manufacturers: manufacturersRouter,
  projects: projectsRouter,
  users: usersRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
