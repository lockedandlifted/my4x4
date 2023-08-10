export const imageFileExtensions = [
  'bmp',
  'gif',
  'jpeg',
  'jpg',
  'png',
  'webp',
]

export const isImage = (fileExtension: string) => imageFileExtensions.includes(fileExtension)

export default isImage
