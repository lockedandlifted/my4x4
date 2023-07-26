import { Link as BaseLink } from '@chakra-ui/react'

type LinkProps = {
  attributes: object,
  children: React.ReactNode,
  element: object,
}
const Link = (props: LinkProps) => {
  const {
    attributes, children, element,
  } = props

  return (
    <BaseLink
      fontWeight="bold"
      href={element.href}
      textAlign={element.align}
      {...attributes}
    >
      {children}
    </BaseLink>
  )
}

export default Link
