type SetupInitialEntityStateOptions = {
  addtionalSetupFn?: (state: object, entity: object) => object,
}

function setupInitialEntityState(
  defaultState: object,
  entity: object,
  options: SetupInitialEntityStateOptions = {},
) {
  const { addtionalSetupFn } = options

  const initialState = Object.keys(defaultState).reduce((acc, key) => {
    acc[key] = entity[key] || defaultState[key]
    return acc
  }, { ...defaultState })

  if (addtionalSetupFn) {
    return addtionalSetupFn(initialState, entity)
  }

  return initialState
}

export default setupInitialEntityState
