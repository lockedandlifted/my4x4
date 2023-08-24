import { Flex, Heading, Tag } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import { trpc } from '@utils/trpc'

import useBrowseProjects from '@hooks/useBrowseProjects'

import MobileLayout from '@layouts/MobileLayout'

import FilterGroup from '@components/FilterGroup'
import Results from '@components/BrowseProjects/Results'

const SearchPage = () => {
  const { query: { manufacturerKey, manufacturerModelKey, manufacturerModelSeriesKey } } = useRouter()

  const manufacturerQuery = trpc.manufacturers.getManufacturerByKey.useQuery(
    { key: manufacturerKey },
    { enabled: !!manufacturerKey },
  )
  const { data: manufacturer } = manufacturerQuery

  const manufacturerModelQuery = trpc.manufacturerModels.getManufacturerModelByKey.useQuery(
    { key: manufacturerModelKey },
    { enabled: !!manufacturerModelKey },
  )
  const { data: manufacturerModel } = manufacturerModelQuery

  const manufacturerModelSeriesQuery = trpc.manufacturerModelSeries.getManufacturerModelSeriesByKey.useQuery(
    { key: manufacturerModelSeriesKey },
    { enabled: !!manufacturerModelSeriesKey },
  )
  const { data: modelSeries } = manufacturerModelSeriesQuery

  const browseProjectsPayload = useBrowseProjects({
    manufacturerId: manufacturer?.id,
    manufacturerModelId: manufacturerModel?.id,
    manufacturerModelSeriesId: modelSeries?.id,
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

        <Flex marginTop={2}>
          <Tag
            as="a"
            backgroundColor="black"
            color="white"
            cursor="pointer"
            href="/search"
            marginRight="1"
            marginBottom="1"
            paddingY="2"
            paddingX="3"
          >
            By Vehicle Model
          </Tag>

          <Tag
            as="a"
            backgroundColor="white"
            borderWidth="1px"
            color="black"
            cursor="pointer"
            href="/searchByPart"
            marginRight="1"
            marginBottom="1"
            paddingY="2"
            paddingX="3"
          >
            By Part
          </Tag>
        </Flex>

        <FilterGroup title="Manufacturer">
          {manufacturers.map((manufacturerItem) => {
            const { key, title } = manufacturerItem

            return (
              <FilterGroup.Tag
                href={`/search?manufacturerKey=${key}`}
                key={key}
                isSelected={manufacturerKey === key}
              >
                {title}
              </FilterGroup.Tag>
            )
          })}
        </FilterGroup>

        {!!manufacturerModels.length && (
          <FilterGroup title="Model">
            {manufacturerModels.map((manufacturerModelItem) => {
              const { key, title } = manufacturerModelItem

              return (
                <FilterGroup.Tag
                  href={`/search?manufacturerKey=${manufacturerKey}&manufacturerModelKey=${key}`}
                  key={key}
                  isSelected={manufacturerModelKey === key}
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
              const { key, displayTitle, title } = modelSeriesItem

              return (
                <FilterGroup.Tag
                  href={`/search?manufacturerKey=${manufacturerKey}&manufacturerModelKey=${manufacturerModelKey}&manufacturerModelSeriesKey=${key}`}
                  key={key}
                  isSelected={manufacturerModelSeriesKey === key}
                >
                  {displayTitle || title}
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
