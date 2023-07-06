const withEmbeds = (editor) => {
  const { isVoid } = editor
  editor.isVoid = (element) => {
    console.log('type', element.type)
    return element.type === 'youtube' ? true : isVoid(element)
  }

  return editor
}

export default withEmbeds
