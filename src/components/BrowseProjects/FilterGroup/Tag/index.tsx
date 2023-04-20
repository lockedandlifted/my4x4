import { Tag as BaseTag } from '@chakra-ui/react'

type TagProps = {
  children: React.ReactNode,
  href: string,
  isSelected?: boolean,
}

const Tag = (props: TagProps) => {
  const { children, href, isSelected } = props

  return (
    <BaseTag
      as="a"
      backgroundColor={isSelected ? 'black' : 'gray.100'}
      color={isSelected ? 'white' : 'black'}
      cursor="pointer"
      href={href}
      marginRight="1"
      marginBottom="1"
      paddingY="2"
      paddingX="3"
    >
      {children}
    </BaseTag>
  )
}

export default Tag
