import { type NextApiRequest, type NextApiResponse } from 'next'

import { prisma } from '../../server/db/client'

const sitemap = async (req: NextApiRequest, res: NextApiResponse) => {
  const projects = await prisma.project.findMany({
    where: {
      published: true,
    },
  })

  const posts = await prisma.post.findMany({
    where: {
      postType: {
        key: 'forum',
      },
    },
  })

  const projectsString = projects.reduce((acc, project) => {
    const baseProjectUrl = `https://www.my4x4.info/${project.slug}`
    const projectImagesUrl = `${baseProjectUrl}/images`

    const projectStrings = `${baseProjectUrl}\n${projectImagesUrl}\n`

    return acc + projectStrings
  }, '')

  const postsString = posts.reduce((acc, post) => {
    const postUrl = `https://www.my4x4.info/posts/${post.id}\n`

    return acc + postUrl
  }, '')

  res.send(projectsString + postsString)
}

export default sitemap
