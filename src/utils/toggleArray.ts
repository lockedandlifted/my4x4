type ToggleArrayParams = {
  array: string[],
  value: string,
}

function toggleArray(params: ToggleArrayParams) {
  const { array, value } = params

  const updatedArray = [...array]
  const valueIndex = updatedArray.findIndex(v => v === value)
  if (valueIndex !== -1) {
    return updatedArray.filter(v => v !== value)
  }

  updatedArray.push(value)

  return updatedArray
}

export default toggleArray
