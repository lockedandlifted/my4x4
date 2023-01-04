import { Button, Flex, Heading } from '@chakra-ui/react'

import type { User } from '@prisma/client'

import useUserForm from '@hooks/useUserForm'

import Form from '@components/Form'

import ProfileImage from './components/ProfileImage'

type UserFormProps = {
  user: User,
}

const UserForm = (props: UserFormProps) => {
  const { user } = props

  const userFormPayload = useUserForm({
    callbacks: {
      onUpdateSuccess: data => console.log(data),
    },
    user,
  })

  const {
    callbacks: {
      updateUser,
    },
    formPayload,
    mutations: {
      updateUserMutation: {
        isLoading,
      },
    },
  } = userFormPayload

  return (
    <Flex direction="column" width="100%">
      <Form
        callbacks={{
          submitForm: data => updateUser(data),
        }}
        formPayload={formPayload}
      >
        <Heading fontWeight="medium" size="lg">
          Account
        </Heading>

        <ProfileImage user={user} />

        <Flex justifyContent="space-between" marginTop={8}>
          <Heading size="md" marginBottom="4">Profile</Heading>
        </Flex>

        <Form.Field
          label="Username"
          name="username"
          validationRules={{ required: true }}
        >
          <input />
        </Form.Field>

        <Form.Field
          label="Name"
          marginTop={Form.Field.MARGIN_TOP}
          name="name"
          validationRules={{ required: true }}
        >
          <input />
        </Form.Field>

        <Form.Field
          label="Email"
          marginTop={Form.Field.MARGIN_TOP}
          name="email"
          validationRules={{ required: true }}
        >
          <input />
        </Form.Field>

        <Button
          colorScheme="green"
          isDisabled={isLoading}
          isLoading={isLoading}
          marginTop="4"
          size="lg"
          type="submit"
        >
          Save Details
        </Button>
      </Form>
    </Flex>

  )
}

export default UserForm
