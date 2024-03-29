import { Flex } from '@chakra-ui/react'
import { FormProvider } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import type { FieldValues, UseFormReturn } from 'react-hook-form'

import Actions from './Actions'
import BasicField from './BasicField'
import DynamicField from './DynamicField'
import Field from './Field'

const showInvalidFormWarning = (data: FieldValues) => {
  const mergedMessage = Object.values(data).reduce((acc, field) => {
    const { message } = field

    return `${acc}${message}\n`
  }, '')

  toast.error(mergedMessage)
}

type FormProps = {
  callbacks: {
    submitForm: (data: object) => void,
  },
  children: React.ReactNode,
  id?: string,
  formPayload: UseFormReturn,
  formProps?: object,
}

const Form = (props: FormProps) => {
  const {
    callbacks: {
      submitForm,
    },
    children,
    id,
    formPayload,
    formPayload: {
      handleSubmit,
    },
    formProps,
  } = props

  return (
    <FormProvider {...formPayload}>
      <form
        id={id}
        onSubmit={(e) => {
          handleSubmit(submitForm, showInvalidFormWarning)(e).catch(e => console.log(e.message))
        }}
        {...formProps}
      >
        <Flex flexDirection="column" width="100%">
          {children}
        </Flex>
      </form>
    </FormProvider>
  )
}

Form.Actions = Actions
Form.BasicField = BasicField
Form.DynamicField = DynamicField
Form.Field = Field

export default Form
