import {
  Alert,
  AlertDescription,
  AlertIcon,
} from '@chakra-ui/react'

import type { Project } from '@prisma/client'

type AddedByCommunityNoticeProps = {
  project: Project,
}

const AddedByCommunityNotice = (props: AddedByCommunityNoticeProps) => {
  const { project } = props

  if (project?.createdByOwner) {
    return null
  }

  return (
    <Alert
      borderRadius="xl"
      marginBottom={4}
      padding={8}
      status="info"
      variant="subtle"
    >
      <AlertIcon />

      <AlertDescription>
        This build was added by someone in our community.
        If this build is yours please contact us to claim it.
      </AlertDescription>
    </Alert>
  )
}

export default AddedByCommunityNotice
