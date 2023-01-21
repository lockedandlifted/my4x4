import Field, { FieldProps } from '../Field'

type InputValue = {
  id: string,
  key: string,
  title: string,
}

type DynamicFieldProps = {
  inputProps?: object,
  inputType: 'input' | 'multi_select' | 'select',
  inputValues: InputValue[],
}

const DynamicField = (props: DynamicFieldProps & FieldProps) => {
  const {
    inputType,
    inputValues,
    inputProps,
    ...fieldProps
  } = props

  if (inputType === 'select' && inputValues) {
    return (
      <Field {...fieldProps}>
        <select {...inputProps}>
          <option value="">Please Select...</option>
          {inputValues.map(fieldValue => (
            <option key={fieldValue.id} value={fieldValue.key}>
              {fieldValue.title}
            </option>
          ))}
        </select>
      </Field>
    )
  }

  return (
    <Field {...fieldProps}>
      <input {...inputProps} />
    </Field>
  )
}

export default DynamicField
