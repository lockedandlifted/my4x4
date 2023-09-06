import useSession from '@hooks/useSession'

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

  const { user } = useSession({ includeUser: true })

  return {
    isValidOwner: isValidOwner({
      project, temporaryUserId, user,
    }),
  }
}

export default useValidateProjectOwner
