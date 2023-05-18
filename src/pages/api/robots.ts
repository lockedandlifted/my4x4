import { type NextApiRequest, type NextApiResponse } from 'next'

const robots = async (req: NextApiRequest, res: NextApiResponse) => {
  res.send('User-agent: *\nDisallow:')
}

export default robots
