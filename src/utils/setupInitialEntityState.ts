type SetupInitialEntityStateOptions = {
  additionalSetupFn?: (state: object, entity: object) => object,
}

function setupInitialEntityState(
  defaultState: object,
  entity: object,
  options: SetupInitialEntityStateOptions = {},
) {
  const { additionalSetupFn } = options

  const initialState = Object.keys(defaultState).reduce((acc, key) => {
    acc[key] = entity[key] || defaultState[key]
    return acc
  }, { ...defaultState })

  if (additionalSetupFn) {
    return additionalSetupFn(initialState, entity)
  }

  return initialState
}

export default setupInitialEntityState
