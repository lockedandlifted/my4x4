import type { Project } from '@prisma/client'

import { trpc } from '@utils/trpc'

function useProjectForm(project?: Project){
  // Load Manufacturers
  const manufacturersQuery = trpc.manufacturers.getManufacturers.useQuery()
  const { data: manufacturers } = manufacturersQuery

  return {
    manufacturers,
    project,
  }
}

export default useProjectForm
