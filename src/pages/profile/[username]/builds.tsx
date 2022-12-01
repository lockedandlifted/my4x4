import { useRouter } from 'next/router'

const ProfileBuildsPage = () => {
  const { query: { username } } = useRouter()

  return (
    <div>{username}&apos;s Builds</div>
  )
}

export default ProfileBuildsPage
