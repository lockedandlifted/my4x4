const asyncSome = async (arr, predicate) => {
  for (const e of arr) {
    if (await predicate(e)) return true
  }
  return false
}

export default asyncSome
