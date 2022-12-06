import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { useController, useFormContext } from 'react-hook-form'

import LabelRight from './LabelRight'

import styles from './styles.module.scss'

type FieldProps = {
  children: React.ReactNode,
  defaultValue?: string | number,
  label: string,
  labelRight?: React.ReactNode,
  name: string,
  marginTop?: number,
  validationRules?: {
    required: boolean,
  },
}

const Field = (props: FieldProps) => {
  const {
    children,
    defaultValue,
    label,
    labelRight,
    name,
    validationRules,
    ...restProps
  } = props

  const required = validationRules?.required ?? false

  const {
    control,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]
  const hasError = !!error

  const { field } = useController({
    control,
    defaultValue: defaultValue || '',
    name,
    rules: {
      ...validationRules,
      required: required ? `${label} is Required` : false,
    },
  })

  return (
    <Flex className={styles.root} flexDirection="column" width="100%" {...restProps}>
      <Flex alignItems="center" width="100%">
        <Text color="#3B5249" fontSize={14} width="auto">
          {required && `* `}{label}
        </Text>

        <Flex marginLeft="auto">
          {labelRight}
        </Flex>
      </Flex>

      <Flex flexDirection="column" marginTop="1" width="100%">
        {React.cloneElement(children as React.ReactElement<any>, {
          autoComplete: "off",
          color: (!field.value) ? 'gray.400' : 'gray.900',
          id: name,
          variant: "outline",
          size: "md",
          style: {
            borderColor: hasError ? 'orange' : undefined,
          },
          ...field,
        })}
      </Flex>
    </Flex>
  )
}

Field.LabelRight = LabelRight
Field.MARGIN_TOP = 4

export default Field
