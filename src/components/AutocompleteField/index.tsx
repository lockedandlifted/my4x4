import React, { useState } from 'react'
import { Flex, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { useDebounce } from 'use-debounce'

import { trpc } from '@utils/trpc'

import type { appRouters} from '@server/trpc/router/_app'

const defaultState = {
  string: '',
}

type AutocompleteFieldProps = {
  callbacks: {
    selectItem: (result: object) => void,
  }
  routerKey: keyof typeof appRouters,
  queryKey: string,
  queryParams?: object,
  inputValue?: string,
}

const AutocompleteField = React.forwardRef<HTMLInputElement, AutocompleteFieldProps>((props, ref) => {
  const {
    callbacks: { selectItem },
    inputValue,
    routerKey,
    queryKey,
    queryParams,
  } = props

  const [state, setState] = useState(defaultState)
  const { string } = state

  const [debouncedString] = useDebounce(string, 500)

  const query = trpc[routerKey][queryKey].useQuery(
    { string: debouncedString, ...queryParams },
    { enabled: !!debouncedString.length },
  )

  const { data: results = [] } = query

  return (
    <Flex position="relative">
      <Flex width="100%">
        <input
          onChange={e => setState(s => ({ ...s, string: e.target.value }))}
          ref={ref}
          type="text"
          value={string || inputValue}
        />
      </Flex>

      {!!results.length && (
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
          {results.map((result: { id: string, title: string }) => {
            const { id, title } = result

            return (
              <LinkBox
                as="li"
                key={id}
                listStyleType="none"
                padding={2}
              >
                <LinkOverlay
                  onClick={() => {
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
