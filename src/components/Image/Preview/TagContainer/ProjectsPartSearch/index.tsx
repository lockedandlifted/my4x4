import { Flex } from '@chakra-ui/react'

import type { ProjectsImage, ProjectsPart } from '@prisma/client'

import AutocompleteField from '@components/AutocompleteField'

type ProjectsPartSearchProps = {
  callbacks: {
    selectItem: (result: object) => void,
  },
  inputRef: React.RefObject<HTMLInputElement>,
  projectsImage: ProjectsImage,
}

const ProjectsPartSearch = (props: ProjectsPartSearchProps) => {
  const { callbacks: { selectItem }, inputRef, projectsImage } = props

  return (
    <Flex
      backgroundColor="rgba(0, 0, 0, 0.8)"
      borderRadius="lg"
      padding={2}
      position="absolute"
      justifyContent="space-between"
      bottom={2}
      left={2}
      right={2}
    >
      <AutocompleteField
        callbacks={{
          onClick: (e: React.FocusEvent<HTMLInputElement>) => e.stopPropagation(),
          mapResults: (results: ProjectsPart[]) => results.map((result) => {
            const { id, manufacturerPart } = result

            return {
              id,
              title: manufacturerPart?.title,
            }
          }),
          selectItem,
        }}
        inputProps={{
          placeholder: 'Find a part to tag...',
          style: {
            backgroundColor: 'transparent',
            color: 'white',
            fontSize: 16,
            width: '100%',
          },
          value: '',
        }}
        ref={inputRef}
        routerKey="projectsParts"
        queryKey="getProjectsParts"
        queryParams={{
          include: {
            manufacturerPart: {
              manufacturer: true,
            },
          },
          projectId: projectsImage?.projectId,
        }}
      />
    </Flex>
  )
}

export default ProjectsPartSearch
