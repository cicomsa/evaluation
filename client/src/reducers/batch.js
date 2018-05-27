import {GET_BATCH, UPDATE_BATCH} from '../actions/index'

export default function (state = null, {type, payload}) {
  switch (type) {
    case GET_BATCH:
      return payload
    case UPDATE_BATCH:
      return {...state,
      ...payload}

    default:
      return state
  }
}
