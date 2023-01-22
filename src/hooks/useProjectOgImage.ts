import type { Project } from '@prisma/client'

function useProjectOgImage(project: Project) {
  const baseUrl = 'http://localhost:3001'

  const projectImage = project?.projectsImages?.[0]?.image

  const projectOwner = project?.projectsUsers?.[0]?.user
  const userImage = projectOwner?.usersImages?.[0]?.image

  const url = `${baseUrl}/api/ogImage?projectImageKey=${projectImage?.fileKey}&userImageKey=${userImage?.fileKey}&title=${project?.title}&projectSlug=${project?.slug}&username=${projectOwner?.username}&userFullName=${projectOwner?.name}`

  return {
    ogImageUrl: url,
  }
}

export default useProjectOgImage
