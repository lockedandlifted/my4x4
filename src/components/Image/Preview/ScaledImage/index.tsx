import NextImage from 'next/image'

import useImageUrl from '@hooks/useImageUrl'

type ScaledImageProps = {
  fileKey: string,
  width: number,
  height: number,
}

const ScaledImage = (props: ScaledImageProps) => {
  const { fileKey, height, width } = props

  const { imageUrl } = useImageUrl({
    enabled: true,
    path: fileKey,
    transformation: [{
      focus: 'auto',
      height,
      width,
    }],
  })

  return (
    <NextImage
      alt="Text"
      height={height}
      width={width}
      src={imageUrl || ''}
      style={{ zIndex: 0 }}
    />
  )
}

export default ScaledImage
