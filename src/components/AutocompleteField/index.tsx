import React, { useState } from 'react'
import { Flex, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { useDebounce } from 'use-debounce'

import { trpc } from '@utils/trpc'

import type { appRouters } from '@server/trpc/router/_app'

const defaultState = {
  string: '',
}

type AutocompleteFieldProps = {
  callbacks: {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onClick: (e: React.FocusEvent<HTMLInputElement>) => void,
    mapResults?: (results: object[]) => object[],
    selectItem: (result: object) => void,
  },
  inputProps?: {
    placeholder?: string,
    style?: object,
    value?: string,
  },
  queryKey: string,
  queryParams?: object,
  routerKey: keyof typeof appRouters,
}

const AutocompleteField = React.forwardRef<HTMLInputElement, AutocompleteFieldProps>((props, ref) => {
  const {
    callbacks: {
      onChange, onClick, mapResults, selectItem,
    },
    inputProps,
    queryKey,
    queryParams,
    routerKey,
  } = props

  const [state, setState] = useState(defaultState)
  const { string } = state

  const [debouncedString] = useDebounce(string, 500)

  const query = trpc[routerKey][queryKey].useQuery(
    { string: debouncedString, ...queryParams },
    { enabled: !!debouncedString.length },
  )

  const { data: results = [] } = query

  const mappedResults = mapResults ? mapResults(results) : results

  return (
    <Flex position="relative" width="100%">
      <Flex width="100%">
        <input
          onChange={(e) => {
            setState(s => ({ ...s, string: e.target.value }))
            if (onChange) onChange(e)
          }}
          onClick={onClick}
          ref={ref}
          type="text"
          {...inputProps}
          value={string}
        />
      </Flex>

      {!!mappedResults.length && (
        <Flex
          backgroundColor="white"
          borderRadius={5}
          borderWidth={1}
          boxShadow="1px"
          flexDirection="column"
          marginTop={1}
          overflow="hidden"
          position="absolute"
          top="100%"
          width="100%"
        >
          {mappedResults.map((result: { id: string, title: string }) => {
            const { id, title } = result

            return (
              <LinkBox
                as="li"
                key={id}
                listStyleType="none"
                padding={2}
              >
                <LinkOverlay
                  onClick={(e) => {
                    e.stopPropagation()
                    setState(s => ({ ...s, string: '' }))
                    selectItem(result)
                  }}
                >
                  {title}
                </LinkOverlay>
              </LinkBox>
            )
          })}
        </Flex>
      )}
    </Flex>
  )
})

AutocompleteField.displayName = 'AutocompleteField'

export default AutocompleteField
