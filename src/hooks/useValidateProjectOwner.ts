import { useSession } from 'next-auth/react'

import type { Prisma } from '@prisma/client'

type ProjectWithUsers = Prisma.ProjectGetPayload<{
  include: {
    projectsUsers: {
      include: {
        user: true,
      },
    },
  },
}>

type IsValidOwnerParams = {
  loggedInUserId?: string,
  project?: ProjectWithUsers,
  temporaryUserId: string,
}

const isValidOwner = (params: IsValidOwnerParams) => {
  const { loggedInUserId, project, temporaryUserId } = params

  const validOwner = project?.projectsUsers?.some((projectsUser) => {
    const { userId } = projectsUser
    return userId === loggedInUserId
  })

  if (validOwner) return true

  return !!project?.temporaryUserId && project?.temporaryUserId === temporaryUserId
}

type UseValidateProjectOwnerParams = {
  project?: ProjectWithUsers,
  temporaryUserId: string,
}

function useValidateProjectOwner(params: UseValidateProjectOwnerParams) {
  const { project, temporaryUserId } = params

  const { data: sessionData } = useSession()
  const loggedInUserId = sessionData?.user?.id

  return {
    isValidOwner: isValidOwner({ loggedInUserId, project, temporaryUserId }),
  }
}

export default useValidateProjectOwner
