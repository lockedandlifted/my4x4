import ImageKit from 'imagekit-javascript'

function useImageUrl(options: Transformation) {
  const { enabled = false, path, ...restOptions } = options

  const imagekit = new ImageKit({
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT_URL || '',
  })

  const imageUrl = enabled ? imagekit.url({
    path,
    ...restOptions,
  }) : null

  return {
    imageUrl,
  }
}

export default useImageUrl
