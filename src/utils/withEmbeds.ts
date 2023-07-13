const voidTypes = [
  'my4x4_project',
  'youtube',
]

const withEmbeds = (editor) => {
  const { isVoid } = editor
  editor.isVoid = element => (voidTypes.includes(element.type) ? true : isVoid(element))

  return editor
}

export default withEmbeds
