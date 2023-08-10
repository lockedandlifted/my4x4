import { Flex, Heading, Tag } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import { trpc } from '@utils/trpc'

import useBrowseProjectsByPart from '@hooks/useBrowseProjectsByPart'

import MobileLayout from '@layouts/MobileLayout'

import FilterGroup from '@components/FilterGroup'
import Results from '@components/BrowseProjects/Results'

const SearchByPartPage = () => {
  const { query: { categoryId, manufacturerId, manufacturerPartId } } = useRouter()

  const categoryQuery = trpc.categories.getCategoryById.useQuery(
    { id: categoryId },
    { enabled: !!categoryId },
  )
  const { data: category } = categoryQuery

  const manufacturerQuery = trpc.manufacturers.getManufacturerById.useQuery(
    { id: manufacturerId },
    { enabled: !!manufacturerId },
  )
  const { data: manufacturer } = manufacturerQuery

  const manufacturerPartQuery = trpc.manufacturerParts.getManufacturerPartById.useQuery(
    { id: manufacturerPartId },
    { enabled: !!manufacturerPartId },
  )
  const { data: manufacturerPart } = manufacturerPartQuery

  const browseProjectsPayload = useBrowseProjectsByPart({
    categoryId,
    manufacturerId,
    manufacturerPartId,
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
          {categories.map((category) => {
            const { id, title } = category

            return (
              <FilterGroup.Tag
                href={`/searchByPart?categoryId=${id}`}
                key={id}
                isSelected={categoryId === id}
              >
                {title}
              </FilterGroup.Tag>
            )
          })}
        </FilterGroup>

        {!!manufacturers.length && (
          <FilterGroup title="Manufacturer">
            {manufacturers.map((manufacturer) => {
              const { id, title } = manufacturer

              return (
                <FilterGroup.Tag
                  href={`/searchByPart?categoryId=${categoryId}&manufacturerId=${id}`}
                  key={id}
                  isSelected={manufacturerId === id}
                >
                  {title}
                </FilterGroup.Tag>
              )
            })}
          </FilterGroup>
        )}

        {!!manufacturerParts.length && (
          <FilterGroup title="Parts">
            {manufacturerParts.map((manufacturerPart) => {
              const { id, title } = manufacturerPart

              return (
                <FilterGroup.Tag
                  href={`/searchByPart?categoryId=${categoryId}&manufacturerId=${manufacturerId}&manufacturerPartId=${id}`}
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
