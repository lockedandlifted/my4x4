import { useState } from 'react'

type RelatedEntityType = '' | 'manufacturerId' | 'manufacturerModelId' | 'manufacturerPartId' | 'projectId'

type DefaultState = {
  manufacturerId: string | undefined,
  manufacturerModelId: string | undefined,
  relatedEntityId: string | undefined,
  relatedEntityType: RelatedEntityType,
}

const defaultState: DefaultState = {
  manufacturerId: undefined,
  manufacturerModelId: undefined,
  relatedEntityId: undefined,
  relatedEntityType: '',
}

function useAddPostRelatedEntities() {
  const [state, setState] = useState(defaultState)
  const { manufacturerId, relatedEntityId, relatedEntityType } = state

  return {
    callbacks: {
      setState: (newState: Partial<DefaultState>) => setState(prevState => ({
        ...prevState,
        ...newState,
      })),
    },
    manufacturerId,
    relatedEntityId,
    relatedEntityType,
  }
}

export default useAddPostRelatedEntities
