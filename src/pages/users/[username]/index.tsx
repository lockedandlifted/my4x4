import { useRouter } from 'next/router'
import { Flex, Heading, Text } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

import MobileLayout from '@layouts/MobileLayout'

import Links from '@components/User/Links'
import Paragraph from '@components/Paragraph'
import ProfileImage from '@components/User/ProfileImage'
import Projects from '@components/User/Projects'

const ProfilePage = () => {
  const { query: { username } } = useRouter()

  const userQuery = trpc.users.getUserByUsername.useQuery(
    { username },
    { enabled: !!username },
  )
  const { data: user } = userQuery

  return (
    <MobileLayout>
      <Flex flexDirection="column">
        <ProfileImage user={user} />

        <Flex alignItems="center" direction="column" marginTop={4}>
          <Heading size="lg">{user?.name}</Heading>
          <Text fontSize="md">@{user?.username}</Text>
        </Flex>

        {!!user?.bio && (
          <Flex flexDirection="column" marginTop={8}>
            <Flex justifyContent="space-between">
              <Heading size="md" marginBottom="4">Bio</Heading>
            </Flex>

            <Paragraph>
              {user?.bio}
            </Paragraph>
          </Flex>
        )}

        <Links user={user} />
        <Projects user={user} />
      </Flex>
    </MobileLayout>
  )
}

export default ProfilePage
