import { Flex, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import { trpc } from '@utils/trpc'

import useBrowseProjects from '@hooks/useBrowseProjects'

import MobileLayout from '@layouts/MobileLayout'

import FilterGroup from '@components/FilterGroup'
import Results from '@components/BrowseProjects/Results'

const SearchPage = () => {
  const { query: { manufacturerId, manufacturerModelId, manufacturerModelSeriesId } } = useRouter()

  const manufacturerQuery = trpc.manufacturers.getManufacturerById.useQuery(
    { id: manufacturerId },
    { enabled: !!manufacturerId },
  )
  const { data: manufacturer } = manufacturerQuery

  const manufacturerModelQuery = trpc.manufacturerModels.getManufacturerModelById.useQuery(
    { id: manufacturerModelId },
    { enabled: !!manufacturerModelId },
  )
  const { data: manufacturerModel } = manufacturerModelQuery

  const manufacturerModelSeriesQuery = trpc.manufacturerModelSeries.getManufacturerModelSeriesById.useQuery(
    { id: manufacturerModelSeriesId },
    { enabled: !!manufacturerModelSeriesId },
  )
  const { data: modelSeries } = manufacturerModelSeriesQuery

  const browseProjectsPayload = useBrowseProjects({
    manufacturerId,
    manufacturerModelId,
    manufacturerModelSeriesId,
  })

  const {
    manufacturers,
    manufacturerModels,
    manufacturerModelSeries,
    projects,
  } = browseProjectsPayload

  return (
    <MobileLayout>
      <NextSeo
        title={`MY4X4 | Browse${manufacturer ? ` ${manufacturer.title}` : ''}${manufacturerModel ? ` ${manufacturerModel.title}` : ''}${modelSeries ? ` ${modelSeries.title}` : ''} Projects`}
        description={`Browse for modified build info and specs for vehicles${manufacturer ? ` matching ${manufacturer.title}` : ''}${manufacturerModel ? ` ${manufacturerModel.title}` : ''}${modelSeries ? ` ${modelSeries.title}` : ''} on MY4X4.`}
      />

      <Flex direction="column" marginTop={8} width="100%">
        <Heading as="h1" fontWeight="medium" size="lg">
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

        {!!manufacturerModelSeries.length && (
          <FilterGroup title="Series">
            {manufacturerModelSeries.map((modelSeriesItem) => {
              const { id, title } = modelSeriesItem

              return (
                <FilterGroup.Tag
                  href={`/search?manufacturerId=${manufacturerId}&manufacturerModelId=${manufacturerModelId}&manufacturerModelSeriesId=${id}`}
                  key={id}
                  isSelected={manufacturerModelSeriesId === id}
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
