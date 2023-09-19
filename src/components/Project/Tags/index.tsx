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
        href={`/search?manufacturerKey=${project?.manufacturerModel?.manufacturer?.key}`}
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
        href={`/search?manufacturerKey=${project?.manufacturerModel?.manufacturer?.key}&manufacturerModelKey=${project?.manufacturerModel?.key}`}
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
        href={`/search?manufacturerKey=${project?.manufacturerModel?.manufacturer?.key}&manufacturerModelKey=${project?.manufacturerModel?.key}&manufacturerModelSeriesKey=${project?.manufacturerModelSeries?.key}`}
        marginRight="1"
        marginBottom="1"
        paddingY="2"
        paddingX="3"
      >
        {project?.manufacturerModelSeries?.displayTitle || project?.manufacturerModelSeries?.title}
      </Tag>
    </Flex>
  )
}

export default Tags
