export const imageFileExtensions = [
  'bmp',
  'gif',
  'heic',
  'jpeg',
  'jpg',
  'png',
  'webp',
]

export const supportedMimeTypes = [
  'application/pdf',
  'image/heic-sequence',
  'image/heic',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const isImage = (fileExtension: string) => imageFileExtensions.includes(fileExtension)

export default isImage
