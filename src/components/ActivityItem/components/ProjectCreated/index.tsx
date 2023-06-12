import { Flex } from '@chakra-ui/react'

type ProjectCreatedProps = {
  children: React.ReactNode,
}

const ProjectCreated = (props: ProjectCreatedProps) => {
  const { children } = props

  console.log(props)

  return (
    <Flex>
      Project Created!
    </Flex>
  )
}

export default ProjectCreated
