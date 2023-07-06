import { Button } from '@chakra-ui/react'
import { FaRegPaperPlane } from 'react-icons/fa'
import { toast } from 'react-hot-toast'

import type { Project } from '@prisma/client'

const handleShare = (project: Project) => {
  if (!project) return

  const shareUrl = `https://www.my4x4.info/${project.slug || ''}`

  if (navigator.share) {
    navigator.share({
      title: project.title,
      text: 'Check out this build on my4x4',
      url: shareUrl,
    })
      .catch(error => console.log(error))
  } else {
    navigator.clipboard.writeText(shareUrl).then(() => toast('Copied to Clipboard'))
  }
}

type ShareButtonProps = {
  project: Project,
}

const ShareButton = (props: ShareButtonProps) => {
  const { project } = props

  return (
    <Button
      colorScheme="gray"
      leftIcon={<FaRegPaperPlane fontSize={24} />}
      onClick={() => handleShare(project)}
      size="lg"
      width="100%"
    >
      Share
    </Button>
  )
}

export default ShareButton
