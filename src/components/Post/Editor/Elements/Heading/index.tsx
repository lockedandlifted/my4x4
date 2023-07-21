import { Heading as BaseHeading } from '@chakra-ui/react'

type HeadingProps = {
  as: 'h1' | 'h2',
  attributes: object,
  element: object,
  size: 'xl' | 'lg',
  children: React.ReactNode,
}

const Heading = (props: HeadingProps) => {
  const {
    as, attributes, children, element, size,
  } = props

  return (
    <BaseHeading as={as} size={size} textAlign={element.align} {...attributes}>
      {children}
    </BaseHeading>
  )
}

export default Heading
