import type { ActivityItem } from '@prisma/client'

type UseActivityItemOptions = {
  activityItem: ActivityItem,
}

function useActivityItem(options: UseActivityItemOptions) {
  const { activityItem } = options

  console.log({ activityItem })

  return {

  }
}

export default useActivityItem
