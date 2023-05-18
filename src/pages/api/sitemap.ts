import { type NextApiRequest, type NextApiResponse } from 'next'

import { prisma } from '../../server/db/client'

const sitemap = async (req: NextApiRequest, res: NextApiResponse) => {
  const projects = await prisma.project.findMany({
    where: {
      published: true,
    },
  })

  const string = projects.reduce((acc, project) => {
    const baseProjectUrl = `https://www.my4x4.info/${project.slug}`
    const projectImagesUrl = `${baseProjectUrl}/images`

    const projectStrings = `${baseProjectUrl}\n${projectImagesUrl}\n`

    return acc + projectStrings
  }, '')

  res.send(string)
}

export default sitemap
