import { Flex, Heading, Tag } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import { trpc } from '@utils/trpc'

import useBrowseProjectsByPart from '@hooks/useBrowseProjectsByPart'

import MobileLayout from '@layouts/MobileLayout'

import FilterGroup from '@components/FilterGroup'
import Results from '@components/BrowseProjects/Results'

const SearchByPartPage = () => {
  const { query: { categoryKey, manufacturerKey, manufacturerPartId } } = useRouter()

  const categoryQuery = trpc.categories.getCategoryByKey.useQuery(
    { key: categoryKey },
    { enabled: !!categoryKey },
  )
  const { data: category } = categoryQuery

  const manufacturerQuery = trpc.manufacturers.getManufacturerByKey.useQuery(
    { key: manufacturerKey },
    { enabled: !!manufacturerKey },
  )
  const { data: manufacturer } = manufacturerQuery

  const manufacturerPartQuery = trpc.manufacturerParts.getManufacturerPartById.useQuery(
    { id: manufacturerPartId },
    { enabled: !!manufacturerPartId },
  )
  const { data: manufacturerPart } = manufacturerPartQuery

  const browseProjectsPayload = useBrowseProjectsByPart({
    categoryId: category?.id,
    manufacturerId: manufacturer?.id,
    manufacturerPartId: manufacturerPart?.id,
  })

  const {
    categories,
    manufacturers,
    manufacturerParts,
    projects,
  } = browseProjectsPayload

  return (
    <MobileLayout>
      <NextSeo
        title={`MY4X4 | Browse${category ? ` ${category.title}` : ''}${manufacturer ? ` ${manufacturer.title}` : ''}${manufacturerPart ? ` ${manufacturerPart.title}` : ''} Projects`}
        description={`Browse for vehicles${category ? ` with ${category.title}` : ''}${manufacturer ? ` from ${manufacturer.title}` : ''}${manufacturerPart ? ` - ${manufacturerPart.title}` : ''} on MY4X4.`}
      />

      <Flex direction="column" marginTop={8} width="100%">
        <Heading as="h1" fontWeight="medium" size="lg">
          Browse Projects
        </Heading>

        <Flex marginTop={2}>
          <Tag
            as="a"
            backgroundColor="white"
            borderWidth="1px"
            color="black"
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
            backgroundColor="black"
            color="white"
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

        <FilterGroup title="Category">
          {categories.map((categoryItem) => {
            const { key, title } = categoryItem

            return (
              <FilterGroup.Tag
                href={`/searchByPart?categoryKey=${key}`}
                key={key}
                isSelected={categoryKey === key}
              >
                {title}
              </FilterGroup.Tag>
            )
          })}
        </FilterGroup>

        {!!manufacturers.length && (
          <FilterGroup title="Manufacturer">
            {manufacturers.map((manufacturerItem) => {
              const { key, title } = manufacturerItem

              return (
                <FilterGroup.Tag
                  href={`/searchByPart?categoryKey=${categoryKey}&manufacturerKey=${key}`}
                  key={key}
                  isSelected={manufacturerKey === key}
                >
                  {title}
                </FilterGroup.Tag>
              )
            })}
          </FilterGroup>
        )}

        {!!manufacturerParts.length && (
          <FilterGroup title="Parts">
            {manufacturerParts.map((manufacturerPartItem) => {
              const { id, title } = manufacturerPartItem

              return (
                <FilterGroup.Tag
                  href={`/searchByPart?categoryKey=${categoryKey}&manufacturerKey=${manufacturerKey}&manufacturerPartId=${id}`}
                  key={id}
                  isSelected={manufacturerPartId === id}
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

export default SearchByPartPage
