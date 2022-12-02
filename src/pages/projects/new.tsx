import { Flex } from '@chakra-ui/react'

import MobileLayout from '@layouts/MobileLayout'

import ProjectForm from '@components/ProjectForm'

const NewProjectPage = () => {
  return (
    <MobileLayout>
      <Flex width="100%">New Project</Flex>

      <ProjectForm />
    </MobileLayout>
  )
}

export default NewProjectPage
