import useSession from '@hooks/useSession'

import type { Prisma, Post } from '@prisma/client'

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
  post?: Post,
}

const isValidOwner = (params: IsValidOwnerParams) => {
  const {
    post, user,
  } = params

  const userIsAdmin = ['admin'].includes(user?.role?.key)

  const validOwner = post?.userId === user?.id

  if (validOwner || userIsAdmin) return true

  return false
}

type UseValidatePostOwnerParams = {
  post?: Post,
}

function useValidatePostOwner(params: UseValidatePostOwnerParams) {
  const { post } = params

  const { user } = useSession({ includeUser: true })

  return {
    isValidOwner: isValidOwner({
      post, user,
    }),
  }
}

export default useValidatePostOwner
