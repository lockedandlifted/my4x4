import { Flex, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import useBrowseProjects from '@hooks/useBrowseProjects'

import MobileLayout from '@layouts/MobileLayout'

import FilterGroup from '@components/BrowseProjects/FilterGroup'
import Results from '@components/BrowseProjects/Results'

const SearchPage = () => {
  const { query: { manufacturerId, manufacturerModelId } } = useRouter()

  const browseProjectsPayload = useBrowseProjects({
    manufacturerId,
    manufacturerModelId,
  })

  const {
    manufacturers,
    manufacturerModels,
    projects,
  } = browseProjectsPayload

  return (
    <MobileLayout>
      <Flex direction="column" marginTop={8} width="100%">
        <Heading fontWeight="medium" size="lg">
          Browse Projects
        </Heading>

        <FilterGroup title="Manufacturer">
          {manufacturers.map((manufacturer) => {
            const { id, title } = manufacturer

            return (
              <FilterGroup.Tag
                href={`/search?manufacturerId=${id}`}
                key={id}
                isSelected={manufacturerId === id}
              >
                {title}
              </FilterGroup.Tag>
            )
          })}
        </FilterGroup>

        {!!manufacturerModels.length && (
          <FilterGroup title="Model">
            {manufacturerModels.map((manufacturerModel) => {
              const { id, title } = manufacturerModel

              return (
                <FilterGroup.Tag
                  href={`/search?manufacturerId=${manufacturerId}&manufacturerModelId=${id}`}
                  key={id}
                  isSelected={manufacturerModelId === id}
                >
                  {title}
                </FilterGroup.Tag>
              )
            })}
          </FilterGroup>
        )}

        <Results projects={projects} />
      </Flex>
    </MobileLayout>
  )
}

export default SearchPage
