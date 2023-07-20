import { useSession } from 'next-auth/react'

import { trpc } from '@utils/trpc'

import type { Prisma, User } from '@prisma/client'

type ProjectWithUsers = Prisma.ProjectGetPayload<{
  include: {
    projectsUsers: {
      include: {
        user: true,
      },
    },
  },
}>

type UserWithIncludes = Prisma.UserGetPayload<{
  include: {
    usersImages: {
      include: {
        image: true,
      },
      orderBy: {
        sort: 'asc',
      },
      take: 1,
    },
    role: {
      select: {
        key: true,
      },
    },
  },
}>

type IsValidOwnerParams = {
  user: UserWithIncludes | null,
  project?: ProjectWithUsers,
  temporaryUserId: string,
}

const isValidOwner = (params: IsValidOwnerParams) => {
  const {
    project, temporaryUserId, user,
  } = params

  const userIsAdmin = ['admin'].includes(user?.role?.key)

  const validOwner = project?.projectsUsers?.some((projectsUser) => {
    const { userId } = projectsUser
    return userId === user?.id
  })

  if (validOwner || userIsAdmin) return true

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

  // User
  const userQuery = trpc.users.getUserById.useQuery({
    id: loggedInUserId,
  })

  const { data: user } = userQuery

  return {
    isValidOwner: isValidOwner({
      project, temporaryUserId, user,
    }),
  }
}

export default useValidateProjectOwner
