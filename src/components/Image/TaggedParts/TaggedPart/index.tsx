import {
  Flex, Heading, Text, useDisclosure,
} from '@chakra-ui/react'
import { FaAngleRight } from 'react-icons/fa'
import { FiTrash2 } from 'react-icons/fi'
import NextLink from 'next/link'

import type { Prisma } from '@prisma/client'

import DeleteConfirmationDialog from '@components/DeleteConfirmationDialog'

type ManufacturerPartWithManufacturer = Prisma.ManufacturerPartGetPayload<{
  include: {
    category: true,
    manufacturer: true,
  },
}>

type WrapLinkParams = {
  children: React.ReactNode,
  href?: string,
}

const wrapLink = (params: WrapLinkParams) => {
  const { children, href } = params

  if (href) {
    return (
      <NextLink href={href}>
        {children}
      </NextLink>
    )
  }

  return children
}

type TaggedPartProps = {
  callbacks?: {
    deleteProjectsPart?: VoidFunction,
  },
  editMode?: boolean,
  href?: string,
  iconContent?: React.ReactNode,
  manufacturerPart: ManufacturerPartWithManufacturer,
}

const TaggedPart = (props: TaggedPartProps) => {
  const {
    callbacks, editMode = false, href, iconContent, manufacturerPart,
  } = props
  const { deleteProjectsPart } = callbacks || {}

  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <>
      {wrapLink({
        children: (
          <Flex
            alignItems="center"
            borderWidth={1}
            borderRadius="xl"
            marginTop={2}
            padding={2}
          >
            <Flex
              alignItems="center"
              backgroundColor="black"
              borderRadius="100%"
              height={10}
              justifyContent="center"
              width={10}
            >
              <Text color="white" fontSize="md" fontWeight="bold">
                {iconContent || '1'}
              </Text>
            </Flex>

            <Flex justifyContent="center" flexDirection="column" marginLeft={4}>
              <Heading size="small">
                {manufacturerPart.manufacturer?.title}
              </Heading>

              <Text fontSize="sm">{manufacturerPart.title}</Text>
            </Flex>

            <Flex marginLeft="auto">
              {editMode && (
                <Text color="gray.300" fontSize="xl" _hover={{ color: 'gray' }}>
                  {deleteProjectsPart && <FiTrash2 onClick={onOpen} style={{ cursor: 'pointer' }} />}
                </Text>
              )}

              <Text color="gray.300" fontSize="xl">
                {!!href && <FaAngleRight />}
              </Text>

            </Flex>
          </Flex>
        ),
        href,
      })}

      <DeleteConfirmationDialog
        callbacks={{
          closeDialog: onClose,
          confirmAction: deleteProjectsPart,
        }}
        isOpen={isOpen}
        title="Delete Part?"
      />
    </>
  )
}

export default TaggedPart
