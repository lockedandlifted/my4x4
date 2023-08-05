const voidTypes = [
  'my4x4_attachment',
  'my4x4_manufacturer',
  'my4x4_manufacturer_model',
  'my4x4_manufacturer_part',
  'my4x4_project',
  'youtube',
]

const withEmbeds = (editor) => {
  const { isVoid } = editor
  editor.isVoid = element => (voidTypes.includes(element.type) ? true : isVoid(element))

  return editor
}

export default withEmbeds
