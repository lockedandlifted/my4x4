import React from 'react'
import ImageKit from 'imagekit-javascript'

type ContextType = {
  imageKit?: ImageKit,
}

const ImageKitContext = React.createContext<ContextType>({})

type ImageKitContextProviderProps = {
  children: React.ReactNode,
}

export const imageKit = new ImageKit({
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT_URL || '',
})

const contextValue = {
  imageKit,
}

export const ImageKitContextProvider = (props: ImageKitContextProviderProps) => {
  const { children } = props

  return (
    <ImageKitContext.Provider value={contextValue}>
      {children}
    </ImageKitContext.Provider>
  )
}

export default ImageKitContext
