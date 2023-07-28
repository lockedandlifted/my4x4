import { Tag as BaseTag } from '@chakra-ui/react'

import type { Category } from '@prisma/client'

type TagProps = {
  category?: Category,
  href?: string,
  onClick?: VoidFunction,
  selected?: boolean,
}

const Tag = (props: TagProps) => {
  const {
    category, href, onClick, selected = false,
  } = props

  return (
    <BaseTag
      as="a"
      backgroundColor={selected ? 'ButtonText' : 'white'}
      borderWidth={1}
      borderColor={selected ? 'ButtonText' : 'gray.200'}
      color={selected ? 'white' : 'ButtonText'}
      cursor="pointer"
      flexShrink={0}
      href={href}
      onClick={onClick}
      marginRight="1"
      marginBottom="1"
      paddingY="2"
      paddingX="3"
      width="auto"
    >
      {category?.title}
    </BaseTag>
  )
}

export default Tag
