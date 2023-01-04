function setupInitialEntityState(defaultState: object, entity: object) {
  const initialState = Object.keys(defaultState).reduce((acc, key) => {
    acc[key] = entity[key] || defaultState[key]
    return acc
  }, { ...defaultState })

  return initialState
}

export default setupInitialEntityState
