import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import cuid from 'cuid'

import type { ProjectsPart } from '@prisma/client'

import { trpc } from '@utils/trpc'

const setupProjectPartInitialState = () => {
  return defaultState
}

const defaultState = {
  manufacturerId: '',
  manufacturerPartId: '',
  partNumber: '',
  title: '',
}

type UseProjectPartFormOptions = {
  projectsPart?: ProjectsPart,
}

function useProjectsPartForm(options: UseProjectPartFormOptions){
  const { projectsPart } = options

  const formPayload = useForm({
    defaultValues: projectsPart?.id ? setupProjectPartInitialState(projectsPart) : defaultState,
    mode: "onChange",
  })

  const { watch } = formPayload
  const manufacturerId = watch('manufacturerId')
  const title = watch('title')

  // Load Manufacturers
  const manufacturersQuery = trpc.manufacturers.getManufacturers.useQuery({ manufacturerType: 'part' })
  const { data: manufacturers = [] } = manufacturersQuery

  return {
    formPayload,
    manufacturerId,
    manufacturers,
    projectsPart,
    title,
  }
}

export default useProjectsPartForm
