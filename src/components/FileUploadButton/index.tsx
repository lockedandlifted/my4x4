import { useEffect, useRef } from 'react'
import { Button, Flex } from '@chakra-ui/react'

import type Uppy from '@uppy/core'

import styles from './styles.module.css'

type FileUploadButtonProps = {
  boxProps?: object,
  buttonProps?: object,
  buttonText: string | React.ReactNode,
  callbacks?: {
    handleError,
  },
  inputProps?: object,
  uppy: Uppy,
}

const FileUploadButton = (props: FileUploadButtonProps) => {
  const {
    boxProps, buttonProps, buttonText, callbacks, inputProps, uppy,
  } = props

  const inputRef = useRef()

  useEffect(() => {
    const inputElement = inputRef.current

    const handleChange = (event) => {
      const files = Array.from(event.target.files)

      files.forEach((file) => {
        try {
          uppy.addFile({
            source: 'file input',
            name: file.name,
            type: file.type,
            data: file,
          })
        } catch (error) {
          if (callbacks?.handleError) {
            callbacks.handleError(error)
          }

          if (error.isRestriction) {
            // handle restrictions
            console.log('Restriction error:', error)
          } else {
            // handle other errors
            console.error(error)
          }
        }
      })
    }

    inputElement.addEventListener('change', handleChange)

    return () => {
      inputElement.removeEventListener('change', handleChange)
    }
  }, [callbacks, uppy])

  // Cleanup
  uppy.on('file-removed', () => {
    if (inputRef.current) inputRef.current.value = null
  })

  uppy.on('complete', () => {
    if (inputRef.current) inputRef.current.value = null
  })

  return (
    <Flex position="relative" {...boxProps}>
      <input
        accept=".jpg,.jpeg,.png"
        className={styles.input}
        name="files[]"
        multiple
        ref={inputRef}
        type="file"
        {...inputProps}
      />

      <Button
        colorScheme="blue"
        className={styles.button}
        onClick={() => inputRef.current?.click()}
        type="button"
        {...buttonProps}
      >
        {buttonText}
      </Button>
    </Flex>
  )
}

export default FileUploadButton
