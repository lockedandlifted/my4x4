import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { projectsRouter } from "./projects";

export const appRouter = router({
  auth: authRouter,
  example: exampleRouter,
  projects: projectsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
