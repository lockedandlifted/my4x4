import { Flex, Link, Text } from '@chakra-ui/react'

import UserImage from '@components/UserImage'

import type { Prisma } from '@prisma/client'

type UserWithImage = Prisma.UserGetPayload<{
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
  },
}>

type ActivityOwnerProps = {
  createdDate?: Date,
  user?: UserWithImage,
}

const ActivityOwner = (props: ActivityOwnerProps) => {
  const { createdDate, user } = props

  if (user) {
    return (
      <Flex>
        <UserImage user={user} />

        <Flex direction="column" fontSize="sm" marginLeft="2">
          <Link href={`/users/${user.username}`} fontWeight="bold">
            {user?.name}
          </Link>

          {!!createdDate && (
            <Text color="gray.500" fontSize="xs">
              {createdDate.toLocaleString('en-AU', {
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          )}
        </Flex>
      </Flex>
    )
  }

  return null
}

export default ActivityOwner
