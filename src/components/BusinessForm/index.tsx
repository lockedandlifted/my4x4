import {
  Alert, AlertDescription, AlertIcon, Button, Checkbox, Flex, Heading, Text, VStack,
} from '@chakra-ui/react'

import type { Business } from '@prisma/client'

import useBusinessForm from '@hooks/useBusinessForm'

import toggleArray from '@utils/toggleArray'

import Form from '@components/Form'
import Paragraph from '@components/Paragraph'
import SectionDivider from '@components/SectionDivider'

import ProfileImage from './components/ProfileImage'

type BusinessFormProps = {
  business?: Business,
}

const BusinessForm = (props: BusinessFormProps) => {
  const { business } = props

  const businessFormPayload = useBusinessForm({ business })
  const {
    callbacks: {
      createBusiness: createFn,
      updateBusiness: updateFn,
    },
    countries,
    createdByOwner,
    formPayload,
    formPayload: {
      setValue,
    },
    mutations: {
      createBusiness: {
        isLoading,
      },
    },
    serviceKeys,
    services,
  } = businessFormPayload

  return (
    <Flex marginTop={business?.id ? 0 : 8} width="100%">
      <Form
        callbacks={{
          submitForm: business?.id ? updateFn : createFn,
        }}
        formPayload={formPayload}
        formProps={{
          style: {
            width: '100%',
          },
        }}
      >
        {!!business?.id && <ProfileImage business={business} />}

        <Heading fontWeight="medium" size="lg">
          {business?.id ? 'Edit' : 'Add'} Business
        </Heading>

        <Paragraph marginTop={Form.Field.MARGIN_TOP}>
          You can add your own business, or businesses you&apos;ve used.
        </Paragraph>

        {!createdByOwner && (
          <Alert
            borderRadius="xl"
            marginTop={4}
            padding={8}
            status="warning"
            variant="subtle"
          >
            <AlertIcon />

            <AlertDescription>
              If you create a business on behalf of someone else you <strong>may lose the ability to edit</strong> it if
              the owner claims and verifies it.
            </AlertDescription>
          </Alert>
        )}

        <Form.Field
          label="Are you the Owner?"
          marginTop={Form.Field.MARGIN_TOP}
          name="createdByOwner"
          validationRules={{ required: false }}
        >
          <select onChange={e => setValue('createdByOwner', e.target.value === 'true')}>
            <option value="">Please Select...</option>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </Form.Field>

        <SectionDivider>BUSINESS</SectionDivider>

        {typeof createdByOwner === 'boolean' && (
          <>
            <Form.Field
              label="Business Name"
              name="title"
              validationRules={{ required: true }}
            >
              <input type="text" />
            </Form.Field>

            <Form.Field
              label="Website"
              marginTop={Form.Field.MARGIN_TOP}
              name="website"
              validationRules={{ required: false }}
            >
              <input type="text" />
            </Form.Field>
          </>
        )}

        {!business?.id && (
          <>
            <SectionDivider>LOCATION</SectionDivider>

            <Form.Field
              label="Unit"
              name="address.unitNumber"
              validationRules={{ required: false }}
            >
              <input type="text" />
            </Form.Field>

            <Form.Field
              label="Street Number"
              marginTop={Form.Field.MARGIN_TOP}
              name="address.streetNumber"
              validationRules={{ required: true }}
            >
              <input type="text" />
            </Form.Field>

            <Form.Field
              label="Street"
              marginTop={Form.Field.MARGIN_TOP}
              name="address.streetName"
              validationRules={{ required: true }}
            >
              <input type="text" />
            </Form.Field>

            <Form.Field
              label="Suburb"
              marginTop={Form.Field.MARGIN_TOP}
              name="address.suburbName"
              validationRules={{ required: true }}
            >
              <input type="text" />
            </Form.Field>

            <Form.Field
              label="State"
              marginTop={Form.Field.MARGIN_TOP}
              name="address.stateName"
              validationRules={{ required: true }}
            >
              <input type="text" />
            </Form.Field>

            <Form.Field
              label="Country"
              marginTop={Form.Field.MARGIN_TOP}
              name="address.countryId"
              validationRules={{ required: true }}
            >
              <select>
                <option value="">Please Select...</option>
                {countries.map(country => (
                  <option key={country.id} value={country.id}>
                    {country.title}
                  </option>
                ))}
              </select>
            </Form.Field>

            <Form.Field
              label="Email"
              marginTop={Form.Field.MARGIN_TOP}
              name="location.email"
              validationRules={{ required: false }}
            >
              <input type="text" />
            </Form.Field>

            <Form.Field
              label="Phone"
              marginTop={Form.Field.MARGIN_TOP}
              name="location.phone"
              validationRules={{ required: false }}
            >
              <input type="text" />
            </Form.Field>
          </>
        )}

        <SectionDivider>SERVICES</SectionDivider>

        <VStack alignItems="flex-start">
          {services.map((service) => {
            const { key, title } = service

            return (
              <Checkbox
                isChecked={serviceKeys.includes(key)}
                key={key}
                onChange={(e) => {
                  setValue('serviceKeys', toggleArray({
                    array: serviceKeys,
                    value: e.target.value,
                  }))
                }}
                name={key}
                value={key}
              >
                {title}
              </Checkbox>
            )
          })}
        </VStack>

        <Button
          colorScheme="green"
          isDisabled={isLoading}
          isLoading={isLoading}
          marginTop="4"
          size="lg"
          type="submit"
        >
          {business?.id ? 'Save Details' : 'Create Business'}
        </Button>
      </Form>
    </Flex>
  )
}

export default BusinessForm
