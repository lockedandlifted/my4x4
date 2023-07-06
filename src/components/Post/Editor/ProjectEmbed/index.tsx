import { Flex } from '@chakra-ui/react'

type ProjectEmbedProps = {
  children: React.ReactNode,
}

const ProjectEmbed = (props: ProjectEmbedProps) => {
  const { attributes, children, element } = props

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        Project!
      </div>
      {children}
    </div>
  )
}

export default ProjectEmbed
