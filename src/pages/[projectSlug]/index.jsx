import { useRouter } from 'next/router'

const BuildPage = () => {
  const { query: { projectSlug } } = useRouter()

  return (
    <div>{projectSlug}</div>
  )
}

export default BuildPage
