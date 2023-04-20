import {
  Flex, Link, SimpleGrid, Text,
} from '@chakra-ui/react'

import ProjectTile from '@components/ProjectTile'

import type { Prisma } from '@prisma/client'

type ResultsProps = {
  projects: Prisma.ProjectGetPayload<{
    include: {
      manufacturerModel: {
        include: {
          manufacturer: true,
        },
      },
      projectsImages: {
        include: {
          image: true,
        },
        orderBy: {
          sort: 'asc',
        },
        take: 1,
      },
      projectsUsers: {
        include: {
          user: {
            include: {
              usersImages: {
                include: {
                  image: true,
                },
                orderBy: {
                  sort: 'asc',
                },
                take: 1,
              },
            },
          },
        },
      },
    },
  }>[],
}

const Results = (props: ResultsProps) => {
  const { projects } = props

  return (
    <Flex direction="column" marginTop="4">
      <Text color="gray.600" fontSize="sm" fontWeight="bold">
        Results
      </Text>

      {!projects?.length && (
        <Flex border="1px solid" borderColor="gray.200" borderRadius="lg" marginTop="2" padding="4">
          <Text color="gray.600" fontSize="sm">
            No results found.
          </Text>

          <Link fontSize="sm" fontWeight="bold" href="/projects/new" marginLeft="1">
            Add a Build
          </Link>
        </Flex>
      )}

      {!!projects?.length && (
        <SimpleGrid
          columns={2}
          gridTemplateColumns="repeat(auto-fill, minmax(40%, 1fr))"
          spacing="4"
        >
          {projects?.map(project => (
            <ProjectTile compact key={project.id} project={project} />
          ))}
        </SimpleGrid>
      )}
    </Flex>
  )
}

export default Results
