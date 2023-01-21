import { useState } from 'react'
import { Button } from '@chakra-ui/react'

import useProjectForm from '@hooks/useProjectForm'

import Form from '@components/Form'

type AttributesProps = {
  projectFormPayload: ReturnType<typeof useProjectForm>,
}

const Attributes = (props: AttributesProps) => {
  const { projectFormPayload } = props
  const {
    attributes,
  } = projectFormPayload

  const [showAll, setShowAll] = useState(false)

  const limit = showAll ? attributes.length : 3

  return (
    <>
      {attributes.map((attribute, index) => {
        const {
          attributeValues, id, key, title, type,
        } = attribute

        const isVisible = index + 1 <= limit

        return (
          <Form.DynamicField
            display={isVisible ? 'block' : 'none'}
            inputType={type}
            inputValues={attributeValues}
            key={id}
            label={title}
            labelRight={(
              <Form.Field.LabelRight>Optional</Form.Field.LabelRight>
            )}
            marginTop={Form.Field.MARGIN_TOP}
            name={`attributes.${key}`}
            validationRules={{ required: false }}
          />
        )
      })}

      <Button
        onClick={() => setShowAll(!showAll)}
        marginTop={Form.Field.MARGIN_TOP}
        size="lg"
      >
        Show {showAll ? 'Default' : 'All'} Attributes
      </Button>
    </>
  )
}

export default Attributes
