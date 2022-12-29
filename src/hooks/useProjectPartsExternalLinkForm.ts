import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { ProjectPartsExternalLink } from '@prisma/client'

import { trpc } from '@utils/trpc'

import { createProjectPartsExternalLinkValidationSchema } from '@validationSchemas/projectPartsExternalLink'

const setupProjectPartsExternalLinkInitialState = (projectPartExternalLink: ProjectPartsExternalLink) => {
  console.log(projectPartExternalLink)
  return {}
}

const defaultState = {
  title: '',
  url: '',
}

type UseProjectPartsExternalLinkFormOptions = {
  projectPartExternalLink?: ProjectPartsExternalLink,
}

function useProjectPartsExternalLinkForm(options: UseProjectPartsExternalLinkFormOptions) {
  const { projectPartExternalLink } = options

  const formPayload = useForm({
    defaultValues: projectPartExternalLink
      ? setupProjectPartsExternalLinkInitialState(projectPartExternalLink)
      : defaultState,
    mode: 'onChange',
    resolver: zodResolver(createProjectPartsExternalLinkValidationSchema, undefined),
  })

  return {
    callbacks: {},
    formPayload,
  }
}

export default useProjectPartsExternalLinkForm
