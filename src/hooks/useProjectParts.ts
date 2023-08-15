import type { Category, Project, ProjectsPart } from '@prisma/client'

import { trpc } from '@utils/trpc'

type GroupPartsByCategoryParams = {
  projectsParts: ProjectsPart[],
}

const groupPartsByCategory = (params: GroupPartsByCategoryParams) => {
  const { projectsParts } = params

  const groups = projectsParts.reduce((acc, projectsPart: ProjectsPart) => {
    const category: Category = projectsPart?.manufacturerPart?.category
    const categoryKey: string = category?.key || 'other'

    if (!acc[categoryKey]) {
      acc[categoryKey] = {
        category,
        key: categoryKey,
        projectsParts: [],
      }
    }

    acc[categoryKey].projectsParts.push(projectsPart)

    return acc
  }, {})

  return Object.values(groups)
}

type UseProjectPartsOptions = {
  queryOptions?: {
    ids?: string[],
    include?: {
      project?: boolean,
    },
  },
}

function useProjectParts(
  project: Project,
  options: UseProjectPartsOptions = {},
) {
  const projectsPartsQuery = trpc.projectsParts.getProjectsParts.useQuery(
    {
      ids: options?.queryOptions?.ids,
      include: {
        manufacturerPart: {
          include: {
            category: true,
            manufacturer: true,
          },
        },
        status: true,
        ...options?.queryOptions?.include,
      },
      projectId: project?.id,
    },
    { enabled: !!project?.id },
  )
  const { data: projectsParts = [] } = projectsPartsQuery

  const removedParts = projectsParts.filter(projectsPart => projectsPart.status?.key === 'removed')

  const installedParts = projectsParts.filter(projectsPart => projectsPart.status?.key === 'installed' || !projectsPart.status?.key)

  return {
    groupedParts: groupPartsByCategory({ projectsParts }),
    groupedInstalledParts: groupPartsByCategory({ projectsParts: installedParts }),
    groupedRemovedParts: groupPartsByCategory({ projectsParts: removedParts }),
    projectsParts,
  }
}

export default useProjectParts
