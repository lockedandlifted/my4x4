import { Flex, Text } from '@chakra-ui/react'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { FaUser } from 'react-icons/fa'

import useImageUrl from '@hooks/useImageUrl'
import useSession from '@hooks/useSession'

const LoggedInUser = () => {
  const { isAuthenticated, user } = useSession({ includeUser: true })

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
    <NextLink href={!isAuthenticated ? '/api/kindeAuth/login' : '/users/account'}>
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
