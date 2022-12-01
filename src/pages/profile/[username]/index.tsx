import { useRouter } from 'next/router'

const ProfilePage = () => {
  const { query: { username } } = useRouter()

  return (
    <div>Hello {username}</div>
  )
}

export default ProfilePage
