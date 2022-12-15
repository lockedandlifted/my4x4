type ProcessCallbackPayloadType = {
  action: (payload: object) => void,
  afterAction: (payload: object) => void,
  actionPayload: object,
}

const processCallback = async (payload: ProcessCallbackPayloadType) => {
  const { action, actionPayload, afterAction } = payload

  if (action){
    const result = await action(actionPayload)

    if (afterAction) afterAction(result)
  }
}

export default processCallback
