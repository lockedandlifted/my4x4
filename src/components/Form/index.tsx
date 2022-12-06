import { Flex } from '@chakra-ui/react'
import { FormProvider } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import type { FieldValues, UseFormReturn } from 'react-hook-form'

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
  formPayload: UseFormReturn,
}

const Form = (props: FormProps) => {
  const {
    callbacks: {
      submitForm,
    },
    children,
    formPayload,
    formPayload: {
      handleSubmit,
    },
  } = props

  return (
    <FormProvider {...formPayload}>
      <form onSubmit={e => handleSubmit(submitForm, showInvalidFormWarning)(e).catch(e => console.log(e.message))}>
        <Flex flexDirection="column" width="100%">
          {children}
        </Flex>
      </form>
    </FormProvider>
  )
}

Form.Field = Field

export default Form
