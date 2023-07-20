import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

import LabelRight from './LabelRight'

import styles from './styles.module.scss'

export type BasicFieldProps = {
  children: React.ReactNode,
  label?: string,
  labelRight?: React.ReactNode,
  name: string,
  marginTop?: number,
}

const BasicField = (props: BasicFieldProps) => {
  const {
    children,
    label,
    labelRight,
    name,
    ...restProps
  } = props

  return (
    <Flex className={styles.root} flexDirection="column" width="100%" {...restProps}>
      {!!label && (
        <Flex alignItems="center" width="100%">
          <Text color="#3B5249" fontSize={14} width="auto">
            {label}
          </Text>

          <Flex marginLeft="auto">
            {labelRight}
          </Flex>
        </Flex>
      )}

      <Flex marginTop="1" width="100%">
        {children}
      </Flex>
    </Flex>
  )
}

BasicField.LabelRight = LabelRight
BasicField.MARGIN_TOP = 4

export default BasicField
