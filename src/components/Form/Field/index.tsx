import { Flex, Text } from '@chakra-ui/react'

import LabelRight from './LabelRight'

import styles from './styles.module.scss'

type FieldProps = {
  children: React.ReactNode,
  label: string,
  labelRight?: React.ReactNode,
  marginTop?: number,
}

const Field = (props: FieldProps) => {
  const { children, label, labelRight, ...restProps } = props

  console.log(restProps)

  return (
    <Flex className={styles.root} flexDirection="column" width="100%" {...restProps}>
      <Flex alignItems="center" width="100%">
        <Text color="#3B5249" fontSize={14} width="auto">{label}</Text>
        <Flex marginLeft="auto">
          {labelRight}
        </Flex>
      </Flex>

      <Flex flexDirection="column" marginTop="1" width="100%">
        {children}
      </Flex>
    </Flex>
  )
}

Field.LabelRight = LabelRight
Field.MARGIN_TOP = 4

export default Field
