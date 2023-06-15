import { Flex } from '@chakra-ui/react'

import ActivityBody from './ActivityBody'
import ActivityOwner from './ActivityOwner'
import ActivityText from './ActivityText'

type ActivityContainerProps = {
  children: React.ReactNode,
}

const ActivityContainer = (props: ActivityContainerProps) => {
  const { children } = props

  return (
    <Flex
      borderBottomWidth="1px"
      borderBottomStyle="dashed"
      direction="column"
      paddingBottom="8"
      marginBottom="8"
      width="100%"
    >
      {children}
    </Flex>
  )
}

ActivityContainer.Body = ActivityBody
ActivityContainer.Owner = ActivityOwner
ActivityContainer.Text = ActivityText

export default ActivityContainer
