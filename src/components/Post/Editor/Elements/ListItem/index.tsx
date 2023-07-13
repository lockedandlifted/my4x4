import { ListItem as BaseListItem } from '@chakra-ui/react'

type ListItemProps = {
  attributes: object,
  children: React.ReactNode,
}

const ListItem = (props: ListItemProps) => {
  const { attributes, children } = props

  console.log('ListItem', props)
  return (
    <BaseListItem {...attributes}>
      {children}
    </BaseListItem>
  )
}

export default ListItem
