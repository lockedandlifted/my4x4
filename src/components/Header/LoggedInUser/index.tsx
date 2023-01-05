import { Flex, Text } from '@chakra-ui/react'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { useSession } from 'next-auth/react'
import { FaUser } from 'react-icons/fa'

import { trpc } from '@utils/trpc'

import useImageUrl from '@hooks/useImageUrl'

const LoggedInUser = () => {
  const { data: sessionData } = useSession()

  const userQuery = trpc.users.getUserById.useQuery({
    id: sessionData?.user?.id,
  }, { enabled: !!sessionData?.user?.id })

  const { data: user } = userQuery

  const image = user?.usersImages?.[0]?.image
  const hasImage = !!image

  const { imageUrl } = useImageUrl({
    enabled: hasImage,
    path: image?.fileKey,
    transformation: [{
      focus: 'auto',
      height: '56',
      width: '56',
    }],
  })

  return (
    <NextLink href={!sessionData ? '/users/login' : '/users/account'}>
      <Flex
        alignItems="center"
        borderWidth={hasImage ? undefined : '1px'}
        borderRadius="100%"
        justifyContent="center"
        overflow="hidden"
        height="28px"
        width="28px"
      >
        {!imageUrl && (
          <Text color="gray.500" fontSize={12}>
            <FaUser />
          </Text>
        )}

        {!!imageUrl && (
          <NextImage
            alt="User Profile Image"
            height={28}
            width={28}
            src={imageUrl}
          />
        )}
      </Flex>
    </NextLink>
  )
}

export default LoggedInUser
