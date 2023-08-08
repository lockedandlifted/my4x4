import { Flex, Tag } from '@chakra-ui/react'

import type { Project } from '@prisma/client'

type TagsProps = {
  marginTop?: string,
  project: Project,
}

const Tags = (props: TagsProps) => {
  const { project, marginTop = '4' } = props

  return (
    <Flex marginTop={marginTop}>
      <Tag
        as="a"
        backgroundColor="white"
        borderWidth={1}
        borderColor="gray.200"
        cursor="pointer"
        href={`/search?manufacturerId=${project?.manufacturerModel?.manufacturer?.id}`}
        marginRight="1"
        marginBottom="1"
        paddingY="2"
        paddingX="3"
      >
        {project?.manufacturerModel?.manufacturer?.title}
      </Tag>

      <Tag
        as="a"
        backgroundColor="white"
        borderWidth={1}
        borderColor="gray.200"
        cursor="pointer"
        href={`/search?manufacturerId=${project?.manufacturerModel?.manufacturer?.id}&manufacturerModelId=${project?.manufacturerModel?.id}`}
        marginRight="1"
        marginBottom="1"
        paddingY="2"
        paddingX="3"
      >
        {project?.manufacturerModel?.title}
      </Tag>

      <Tag
        as="a"
        backgroundColor="white"
        borderWidth={1}
        borderColor="gray.200"
        cursor="pointer"
        href={`/search?manufacturerId=${project?.manufacturerModel?.manufacturer?.id}&manufacturerModelId=${project?.manufacturerModel?.id}&manufacturerModelSeriesId=${project?.manufacturerModelSeries?.id}`}
        marginRight="1"
        marginBottom="1"
        paddingY="2"
        paddingX="3"
      >
        {project?.manufacturerModelSeries?.title}
      </Tag>
    </Flex>
  )
}

export default Tags
